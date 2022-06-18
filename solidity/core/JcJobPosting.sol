// SPDX-License-Identifier: APACHE 2.0

pragma solidity ^0.8.14;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";

import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol"; 

import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureDerivative.sol"; 

import "../interfaces/IJobPosting.sol";
import "../interfaces/IJobPostingEditor.sol";
import "../interfaces/IJobCrypt.sol";
import "../interfaces/IJobCryptPaymentManager.sol"; 

contract JcJobPosting is IJobPosting, IJobPostingEditor, IOpenVersion, OpenRolesSecureDerivative { 

    using LOpenUtilities for string; 

    string name                     = "JOBCRYPT_JOB_POSTING"; 
    uint256 version                 = 9; 

    string registerCA               = "RESERVED_OPEN_REGISTER_CORE";
    string roleManagerCA            = "RESERVED_OPEN_ROLES_CORE";
    string jobCryptCA               = "RESERVED_JOBCRYPT_CORE";
    string jobCryptPaymentManagerCA = "RESERVED_JOBCRYPT_PAYMENT_MANAGER";

    string jobCryptAdminRole        = "JOBCRYPT_ADMIN_ROLE";
    
    string localViewerRole          = "LOCAL_POSTING_VIEWER_ROLE";
    string localEditorRole          = "LOCAL_POSTING_EDITOR_ROLE"; 
    string localApplicantRole       = "LOCAL_POSTING_APPLICANT_ROLE"; 
    string localBarredApplicantRole = "LOCAL_BARRED_APPLICANT_ROLE";

    string jobCryptExtensionProduct = "JOBCRYPT_EXTENSION_PRODUCT"; 

    string categoryFeature          = "CATEGORY_FEATURE";
    string searchTermsFeature       = "SEARCH_TERMS_FEATURE";
    string skillsFeature            = "SKILLS_FEATURE";
    
    string applyLinkFeature         = "APPLY_LINK";

    string ownerFeature             = "OWNER_FEATURE";
    string productFeature           = "PRODUCT_FEATURE";

    string expiryDateFeature        = "EXPIRY_DATE_FEATURE";
    string postingDateFeature       = "POSTING_DATE_FEATURE";
    string applicantCountFeature    = "APPLICANT_COUNT_FEATURE";
    
    PostStatus status; 

    bool deactivated = false; 

    IOpenProduct product;
    IOpenRegister registry; 
    IJobCrypt jobCrypt; 
    IJobCryptPaymentManager jobCryptPaymentManager; 

    mapping(string=>string) featureByName; 
    mapping(string=>string[]) featureArrayByFeatureName; 

    mapping(string=>uint256) featureUintByFeatureName;
    mapping(string=>address) featureAddressByFeatureName; 
    
    mapping(address=>bool) isApplicant; 
    mapping(address=>Applicant) applicantByAddress; 

    constructor(address _registryAddress, address _owner, address _product) {
        registry = IOpenRegister(_registryAddress);
        featureAddressByFeatureName[ownerFeature]  = _owner; // owner immutable
        featureAddressByFeatureName[productFeature] = _product; // product immutable 

        product                 = IOpenProduct(_product);
        jobCrypt                = IJobCrypt(registry.getAddress(jobCryptCA));
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        jobCryptPaymentManager  = IJobCryptPaymentManager(registry.getAddress(jobCryptPaymentManagerCA));
        
        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(address(jobCrypt));
        addConfigurationItem(address(jobCryptPaymentManager));
        addConfigurationItem(name, self, version);
        status = PostStatus.DRAFT; 
    }

    function getName()  view external returns (string memory _name) {
        return name; 
    }

    function getVersion() view external returns (uint256 _version){
        return version; 
    }

    // categories, skills required, search terms
    function getFeatureSTRARRAY(string memory _featureName) view external returns (string [] memory _values) {
        return featureArrayByFeatureName[_featureName];
    }

    // job summary, company summary, job description ipfs hash 
    function getFeatureSTR(string memory _featureName) view external returns (string memory _featureValue){
        if(_featureName.isEqual("APPLY_LINK")) {
            require(isApplicant[msg.sender] || isSecure(localEditorRole, "getFeatureSTR"), " not authorised ");
        }
        return featureByName[_featureName];
    }

    // posting date, expiry date, applicant count
    function getFeatureUINT(string memory _featureName) view external returns (uint256 _value){
        return featureUintByFeatureName[_featureName];
    }

    // product, owner
    function getFeatureADDRESS(string memory _featureName) view external returns (address _value) {
        return featureAddressByFeatureName[_featureName];
    }
    
    function getApplicantData(address _applicantAddress) override view external returns (Applicant memory _applicant){
        if(!isSecure(localViewerRole, "getApplicantData")){
            require(msg.sender == _applicantAddress && isApplicant[_applicantAddress]," error ");            
        }    
        return applicantByAddress[_applicantAddress];
    }

    function getStatus() override view external returns (PostStatus _status){         
        return status; 
    }

    function applyForJob() override external returns (string memory _applicationURL){
        
        require(!deactivated && isSecureBarring(localBarredApplicantRole, "applyForJob"), " barred "); 
        require(!isApplicant[msg.sender] && !(msg.sender == featureAddressByFeatureName[ownerFeature]), " error ");        
        require((status == PostStatus.POSTED || status == PostStatus.EXTENDED), " expired ");
        
        uint256 applicantId = featureUintByFeatureName[applicantCountFeature]++;
        _applicationURL = featureByName[applyLinkFeature]; 
        Applicant memory applicant = Applicant ({
                                                applicant : msg.sender,
                                                id : applicantId,
                                                applicationDate : block.timestamp, 
                                                link : _applicationURL
                                                });
        applicantByAddress[msg.sender] = applicant; 
        jobCrypt.logJobApplication(msg.sender, self);
        isApplicant[msg.sender] = true;

        if(featureUintByFeatureName[expiryDateFeature] < block.timestamp) { // expire the job after the last applicant 
            status = PostStatus.EXPIRED;
            jobCrypt.notifyDelistJob(self);
        }
        return _applicationURL; 
    }

    function populatePosting(string [] memory _featureNames, string [] memory _featureValues, string [] memory _categories, string [] memory _skills, string [] memory _searchTerms, string memory _applyLink ) override  external returns (bool _populated){
        
        editorOnly("populatePosting");        
        setFeaturesInternal(_featureNames, _featureValues);
        featureArrayByFeatureName[categoryFeature]  = _categories;
        featureArrayByFeatureName[skillsFeature]  = _skills;
        featureArrayByFeatureName[searchTermsFeature]  = _searchTerms; 
        featureByName[applyLinkFeature] = _applyLink;
        return true; 
    }


    function post() override external returns (bool _posted){
        
        editorOnly("post"); 
        if(status == PostStatus.DRAFT){
            featureUintByFeatureName[postingDateFeature] = block.timestamp; 
            featureUintByFeatureName[expiryDateFeature] = featureUintByFeatureName[postingDateFeature] + product.getFeatureUINTValue("DURATION");
            require(jobCryptPaymentManager.isProductPaidForPosting(self, address(product)) , " not paid ");
            if(jobCrypt.postJob(self)){
                return setStatusInternal(PostStatus.POSTED);
            } 
        }
        return false; 
    }
    
    function executePostingAction(IJobPosting.PostStatus _targetStatus) external returns (bool _success) {
        
        editorOnly( "executePostingAction");        
        if(IJobPosting.PostStatus.ARCHIVED != _targetStatus && IJobPosting.PostStatus.EXTENDED  != _targetStatus){            
            
            featureUintByFeatureName[expiryDateFeature] = block.timestamp;
            jobCrypt.notifyDelistJob(self);   

            if(_targetStatus == IJobPosting.PostStatus.EXPIRED || _targetStatus == IJobPosting.PostStatus.CANCELLED || _targetStatus == IJobPosting.PostStatus.FILLED){
                setStatusInternal(_targetStatus);
            }
            
            if(_targetStatus == IJobPosting.PostStatus.BARRED || _targetStatus == IJobPosting.PostStatus.DEACTIVATED) {
                return setStatusAndDeactivate(_targetStatus);
            }
        }
        if(IJobPosting.PostStatus.EXTENDED  == _targetStatus && (status == PostStatus.FILLED || status == PostStatus.CANCELLED || status == PostStatus.EXPIRED || status == PostStatus.EXTENDED)) {
            return extend(); 
        }

        if(IJobPosting.PostStatus.ARCHIVED == _targetStatus && (status != PostStatus.POSTED || status != PostStatus.EXTENDED || status != PostStatus.ARCHIVED)) {
            return setStatusAndDeactivate(_targetStatus);
        }

        return false; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        
        require(!deactivated && isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA)); 
        jobCrypt                = IJobCrypt(registry.getAddress(jobCryptCA));       
        jobCryptPaymentManager  = IJobCryptPaymentManager(registry.getAddress(jobCryptPaymentManagerCA));

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(address(jobCrypt));
        addConfigurationItem(address(jobCryptPaymentManager));
        return true; 
    }

    function setExpiryDate(uint256 _expiryDateOverride) external returns (bool _set) {        
        require(!deactivated && isSecure(jobCryptAdminRole, "setExpiryDate"), " admin only ");
        featureUintByFeatureName[expiryDateFeature]= _expiryDateOverride;
        return true; 
    }
    // ============================= INTERNAL ====================

     function extend() internal returns (bool _extended) {
      
        if(product.hasFeature("EXTENSION")){
            
            if(status == PostStatus.EXTENDED && featureUintByFeatureName[expiryDateFeature] > block.timestamp){ // job still in a valid extension
                return false; 
            }

            address extensionProductAddress_    = product.getFeatureUADDRESSValue("EXTENSION"); 
            IOpenProduct extensionProduct_      = IOpenProduct(extensionProductAddress_);
            require(extensionProduct_.getFeatureSTRValue("PRODUCT_TYPE").isEqual(jobCryptExtensionProduct), " wrong product ");
            
            // verify extension product paid 
            require(jobCryptPaymentManager.isProductPaidForPosting(self, extensionProductAddress_), " not paid ");        
            
            // updated expiry date from now; 
            featureUintByFeatureName[expiryDateFeature] = block.timestamp + extensionProduct_.getFeatureUINTValue("EXTENSION_DURATION");
            
            // notify jobcrypt to rePost();
            if(jobCrypt.repostJob(self)){
                return setStatusInternal(PostStatus.EXTENDED);
            }
        }
        return false; 
    }


    function setFeaturesInternal(string [] memory _featureNames, string [] memory _featureValues) internal returns (bool){
       for(uint256 x = 0; x < _featureNames.length; x++){
            featureByName[_featureNames[x]] = _featureValues[x];
        }
        return true; 
    }

    function setStatusAndDeactivate(PostStatus _status) internal returns(bool) {
        deactivated = true; 
        return setStatusInternal(_status);
    }

    function setStatusInternal(PostStatus _status) internal returns (bool) {
        status = _status; 
        return true; 
    }

    function editorOnly(string memory _function) view internal { 
        require(!deactivated && isSecure(localEditorRole, _function), " editor only "); 
    }

}