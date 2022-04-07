// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol"; 

import "https://github.com/Block-Star-Logic/open-roles/blob/e7813857f186df0043c84f0cca42478584abe09c/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecure.sol";

import "../interfaces/IJobPosting.sol";
import "../interfaces/IJobPostingEditor.sol";
import "../interfaces/IJobCrypt.sol";
import "../interfaces/IJobCryptPaymentManager.sol"; 

contract JcJobPosting is IJobPosting, IJobPostingEditor, OpenRolesSecure { 

    using LOpenUtilities for string; 

    string name                     = "JOBCRYPT_JOB_POSTING"; 
    uint256 version                 = 4; 

    string registerCA               = "RESERVED_OPEN_REGISTER_CORE";
    string roleManagerCA            = "RESERVED_OPEN_ROLES_CORE";
    string jobCryptCA               = "RESERVED_JOBCRYPT_CORE";
    string jobCryptPaymentManagerCA = "RESERVED_JOBCRYPT_PAYMENT_MANAGER";

    string coreRole             = "JOBCRYPT_CORE_ROLE";
    string jobCryptAdminRole    = "JOBCRYPT_ADMIN_ROLE";
    string localViewerRole      = "LOCAL_POSTING_VIEWER_ROLE";
    string localEditorRole      = "LOCAL_POSTING_EDITOR_ROLE"; 
    string localApplicantRole   = "LOCAL_POSTING_APPLICANT_ROLE"; 
    string localBarredApplicantRole     = "LOCAL_BARRED_APPLICANT_ROLE";

    string jobCryptExtensionProduct = "JOBCRYPT_EXTENSION_PRODUCT"; 
    
    string filledStatus     = "FILLED_STATUS";
    string cancelledStatus  = "CANCELLED_STATUS";
    string archivedStatus   = "ARCHIVED_STATUS";

    address owner; 
    address productAddress; 
    IOpenProduct product;
    IOpenRegister registry; 
    IJobCrypt jobCrypt; 
    IJobCryptPaymentManager jobCryptPaymentManager; 

    string [] categories; 
    string [] skills; 
    mapping(string=>string) featuresByName; 

    uint256 expiryDate; 
    uint256 postingDate; 
    string status; 
    uint256 applicantCount; 
    string applyLink; 

    bool deactivated = false; 

    mapping(address=>bool) isApplicant; 
    mapping(address=>Applicant) applicantByAddress; 

    constructor(address _registryAddress, address _owner, address _product) {
        registry = IOpenRegister(_registryAddress);
        owner = _owner; 
        productAddress = _product;
        product = IOpenProduct(productAddress);
        jobCrypt = IJobCrypt(registry.getAddress(jobCryptCA));
        roleManager = IOpenRoles(registry.getAddress(roleManagerCA));
        jobCryptPaymentManager = IJobCryptPaymentManager(registry.getAddress(jobCryptPaymentManagerCA));
        
        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(address(jobCrypt));
        addConfigurationItem(address(jobCryptPaymentManager));
        addConfigurationItem(name, self, version);
    }

    function getName()  view external returns (string memory _name) {
        return name; 
    }

    function getVersion() view external returns (uint256 _version){
        return version; 
    }

    function getOwner() override view external returns (address _owner){
        return owner; 
    }

    function getCategories() override view external returns (string [] memory _categories ){
        return categories; 
    }

    function getSkillsRequired() override view external returns (string [] memory _skills ){
        return skills; 
    }

    function getFeature(string memory _featureName) override view external returns (string memory _featureValue){
        return featuresByName[_featureName];
    }

    function getPostingDate() override view external returns (uint256 _postingDate){
        return postingDate;
    }

    function getExpiryDate() override view external returns (uint256 _expiryDate){
        return expiryDate; 
    }

    function getProduct() override view external returns (address _product){
        return productAddress; 
    }

    function getPostingStatus() override view external returns (string memory _postingStatus){
        return status; 
    }

    function getApplicantCount() override view external returns (uint256 _applicantCount){
        return applicantCount;
    }  

    function getApplyLink() override view external returns (string memory _applyLink) { 
         require(isApplicant[msg.sender], "JCPOST : getApplyLink : 00 - Applicants or Editors only");
       // require(isApplicant[msg.sender] || isSecure(localEditorRole, "getApplyLink"), "JC JOBSEEKER DASHBOARD : getApplyLink : 00 - Applicants or Editors only");
        return applyLink; 
    }

    function applyForJob() override external returns (string memory _applicationURL){
        require(!deactivated, " post deactivated ");
        require(isSecureBarring(localBarredApplicantRole, "applyForJob"), "JCPOST : getAppliedJobs : 00 - Local Viewer Role only"); 
        require(!isApplicant[msg.sender], " already applied ");
        require(!(msg.sender == owner), " applicants only ");
        
        uint256 applicantId = applicantCount++;
        Applicant memory applicant = Applicant ({
                                                applicant : msg.sender,
                                                id : applicantId,
                                                applicationDate : block.timestamp, 
                                                link : applyLink
                                                });
        applicantByAddress[msg.sender] = applicant; 
        jobCrypt.logJobApplication(msg.sender, self);
        isApplicant[msg.sender] = true;
        return applyLink; 
    }

    function getApplicantData(address _applicantAddress) override view external returns (Applicant memory _applicant){
        if(!isSecure(localViewerRole, "getApplicantData")){
            require(msg.sender == _applicantAddress," applicant <-> requestor mis-match ");
            require(isApplicant[_applicantAddress],"unknown applicant");
        }    
        return applicantByAddress[_applicantAddress];
    }
        
    function getFee() override view external returns (uint256 _fee, string memory _erc20Currency, address _erc20Address){
        require(isSecure(localViewerRole, "getFee"), "JCPOST : getFee : 00 - Local Viewer Role only");         
        return (product.getPrice(), product.getCurrency(), product.getErc20()); 
    }
    

    function post() override external returns (bool _posted){
        require(!deactivated, " post deactivated ");
        require(isSecure(localEditorRole, "post"), "JCPOST : post : 00 - Local Editor Role only"); 
        if(status.isEqual("DRAFT")){
            postingDate = block.timestamp; 
            expiryDate = postingDate + product.getFeatureUINTValue("DURATION");
            require(jobCryptPaymentManager.isPaid(self) , " posting not paid ");
            IJobCrypt jc = IJobCrypt(registry.getAddress(jobCryptCA));
            jc.postJob(self);
        return true; 
        }
        return false; 
    }

    function setFeatures(string [] memory _featureNames, string [] memory _featureValues ) override external returns (bool _set){
        require(isSecure(localEditorRole, "setFeatures"), "JCPOST : setFeatures : 00 - Local Viewer Role only");         
        return setFeaturesInternal(_featureNames, _featureValues); 
    }

    function setCategories(string [] memory _categories) override external returns (bool _set ){
        require(isSecure(localEditorRole, "setCategories"), "JCPOST : setCategories : 00 - Local Viewer Role only"); 
        categories = _categories; 
        return true; 
    }

    function setSkillsRequired(string [] memory _skills) override external returns (bool _set ){
        require(isSecure(localEditorRole, "setSkillsRequired"), "JCPOST : setSkillsRequired : 00 - Local Viewer Role only"); 
        skills = _skills; 
        return true; 
    }

    function setApplyLink(string memory _applyLink) override external returns (bool _set){
        require(isSecure(localEditorRole, "setApplyLink"), "JCPOST : setApplyLink : 00 - Local Editor Role only"); 
        applyLink = _applyLink;
        return true; 
    }

    function populatePosting(string [] memory _featureNames, string [] memory _featureValues, string [] memory _categories, string [] memory _skills, string memory _applyLink ) override  external returns (bool _populated){
        require(isSecure(localEditorRole, "populatePosting"), "JCPOST : populatePosting : 00 - Local Editor Role only"); 
        setFeaturesInternal(_featureNames, _featureValues);
        categories = _categories; 
        skills = _skills; 
        applyLink = _applyLink; 
        return true; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(!deactivated, " post deactivated ");
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");    
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


    function setExpiryDate(uint256 _expiryDate) override external returns (bool _set){
        require(!deactivated, " post deactivated ");
        require(isSecure(coreRole, "setExpiryDate"), "JCPOST : setExpiryDate : 00 - Core Role only"); 
        expiryDate = _expiryDate; 
        return true;         
    }
    


    function fillJob() external returns (bool _filled){
        require(isSecure(localEditorRole, "fillJob"), "JCPOST : fillJob : 00 - Local Editor Role only"); 
        jobCrypt.notifyDelistJob(self);
        setStatusInternal(filledStatus);
        return true; 
    }

    function cancelJob() external returns (bool _filled){
        require(isSecure(localEditorRole, "cancelJob"), "JCPOST : cancelJob : 00 - Local Editor Role only"); 
        jobCrypt.notifyDelistJob(self);        
        setStatusInternal(cancelledStatus);        
        return true; 
    }

    function extendJob(address _extensionProductAddress)  external returns (bool _extended) {
        require(isSecure(localEditorRole, "extendJob"), "JCPOST : extendJob : 00 - Local Editor Role only"); 
        IOpenProduct product_ = IOpenProduct(_extensionProductAddress);
        require(product_.getFeatureSTRValue("PRODUCT_TYPE").isEqual(jobCryptExtensionProduct), " incorrect product type, jobcrypt extension products only ");
        // veriy product paid 
        require(jobCryptPaymentManager.isProductPaidForPosting(self, _extensionProductAddress), " extension not paid ");        
        // updated expiry date from now; 
        expiryDate = block.timestamp + product_.getFeatureUINTValue("EXTENSION_DURATION");
        // notify jobcrypt to rePost();

        return true; 
    }

    function archive() external returns (bool _archived){
        require(isSecure(localEditorRole, "archive"), "JCPOST : archive : 00 - Local Editor Role only"); 

        deactivated = true; 
        setStatusInternal(archivedStatus);
        return true; 
    }

    function setPostingStatus(string memory _status) override external returns (bool _set){
        require(!deactivated, " post deactivated ");
        require(isSecure(coreRole, "setPostingStatus"), "JCPOST : setPostingStatus : 00 - Core Role only"); 
        setStatusInternal(_status);
        return true; 
    }

    function deactivate() external returns (bool _deactivated){
        require(isSecure(jobCryptAdminRole, "deactivate"), "JCPOST : deactivate : 00 - Core Role only"); 
        deactivated = true; 
        status = "FORCE DEACTIVATED";
        return deactivated; 
    }

    // ============================= INTERNAL ====================

    function setFeaturesInternal(string [] memory _featureNames, string [] memory _featureValues) internal returns (bool){
       for(uint256 x = 0; x < _featureNames.length; x++){
            featuresByName[_featureNames[x]] = _featureValues[x];
        }
        return true; 
    }

    function setStatusInternal(string memory _status) internal returns (bool) {
        status = _status; 
        return true; 
    }

}