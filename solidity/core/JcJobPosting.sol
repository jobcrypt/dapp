// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.8.0 <0.9.0;

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/00f0632adcc11d981f374ff24bfc6a47ec3456af/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecure.sol";

import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol"; 

import "../interfaces/IJobPosting.sol";
import "../interfaces/IJobPostingEditor.sol";
import "../interfaces/IJobCrypt.sol";
import "../interfaces/IJobCryptPaymentManager.sol"; 

contract JcJobPosting is IJobPosting, IJobPostingEditor, OpenRolesSecure { 

    string name                     = "JOBCRYPT_JOB_POSTING"; 
    uint256 version                 = 2; 

    string registerCA               = "RESERVED_OPEN_REGISTER";
    string roleManagerCA            = "RESERVED_OPEN_ROLES";
    string jobCryptCA               = "RESERVED_JOBCRYPT_CORE";
    string jobCryptPaymentManagerCA = "RESERVED_JOBCRYPT_PAYMENT_MANAGER";

    string coreRole             = "JOBCRYPT_CORE_ROLE";
    string localViewerRole      = "LOCAL_POSTING_VIEWER_ROLE";
    string localEditorRole      = "LOCAL_POSTING_EDITOR_ROLE"; 
    string localApplicantRole   = "LOCAL_POSTING_APPLICANT_ROLE"; 

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

    struct Applicant { 
        address applicant;
        uint256 id; 
        uint256 applicationDate; 
        string link; 
    }

    mapping(address=>Applicant) applicantByAddress; 

    constructor(address _registryAddress, address _owner, address _product) {
        registry = IOpenRegister(_registryAddress);
        owner = _owner; 
        productAddress = _product;
        product = IOpenProduct(productAddress);
        jobCrypt = IJobCrypt(registry.getAddress(jobCryptCA));
        roleManager = IOpenRoles(registry.getAddress(roleManagerCA));
        jobCryptPaymentManager = IJobCryptPaymentManager(registry.getAddress(jobCryptPaymentManagerCA));
        
        addConfigurationItem(registerCA, _registryAddress, 0);   
        addConfigurationItem(roleManagerCA, address(roleManager), 0);         
        addConfigurationItem(jobCryptCA, address(jobCrypt), 0);
        addConfigurationItem(jobCryptPaymentManagerCA, address(jobCryptPaymentManager), 0);
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

    function getApplyLink() override view external returns (string memory _applyLink) { 
        return applyLink; 
    }

    function applyForJob() override external returns (string memory _applicationURL){
        require(isSecureBarring(localViewerRole, "applyForJob"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only"); 
        jobCrypt.logJobApplication(msg.sender, self);
        uint256 applicantId = applicantCount++;
        Applicant memory applicant = Applicant ({
                                                     applicant : msg.sender,
                                                     id : applicantId,
                                                     applicationDate : block.timestamp, 
                                                     link : applyLink
                                                });
        applicantByAddress[msg.sender] = applicant; 
        return applyLink; 
    }

    function getApplicantData(address _applicant) override view external returns (uint256 _applicationDate, uint256 _applicantNumber, string memory _applyLink){
        require(isSecure(localApplicantRole, "getApplicantData"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only"); 
        Applicant memory applicant_ = applicantByAddress[_applicant];
        return (applicant_.applicationDate, applicant_.id, applicant_.link);
    }
        
    function getApplicantCount() override view external returns (uint256 _applicantCount){
        return applicantCount;
    }    

    function getFee() override view external returns (uint256 _fee, string memory _erc20Currency, address _erc20Address){
        require(isSecure(localViewerRole, "getFee"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only");         
        return (product.getPrice(), product.getCurrency(), product.getErc20()); 
    }
    

    function post() override external returns (bool _posted){
        require(isSecure(localEditorRole, "post"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Editor Role only"); 
        postingDate = block.timestamp; 
        expiryDate = postingDate + product.getFeatureUINTValue("DURATION");
        require(jobCryptPaymentManager.isPaid(self) > 0, " posting not paid ");
        IJobCrypt jc = IJobCrypt(registry.getAddress(jobCryptCA));
        jc.postJob(self);
        return true; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(coreRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA)); 
        jobCrypt                = IJobCrypt(registry.getAddress(jobCryptCA));       
        jobCryptPaymentManager  = IJobCryptPaymentManager(registry.getAddress(jobCryptPaymentManagerCA));
        return true; 
    }

    function setFeatures(string [] memory _featureNames, string [] memory _featureValues ) override external returns (bool _set){
        require(isSecure(localEditorRole, "getAppliedJobs"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only");         
        return setFeaturesInternal(_featureNames, _featureValues); 
    }

    function setCategories(string [] memory _categories) override external returns (bool _set ){
        require(isSecure(localEditorRole, "getAppliedJobs"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only"); 
        categories = _categories; 
        return true; 
    }

    function setSkillsRequired(string [] memory _skills) override external returns (bool _set ){
        require(isSecure(localEditorRole, "getAppliedJobs"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only"); 
        skills = _skills; 
        return true; 
    }
  
    function setExpiryDate(uint256 _expiryDate) override external returns (bool _set){
        require(isSecure(localEditorRole, "getAppliedJobs"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only"); 
        expiryDate = _expiryDate; 
        return true;         
    }

    function setPostingStatus(string memory _status) override external returns (bool _set){
        require(isSecure(coreRole, "getAppliedJobs"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only"); 
        status = _status; 
        return true; 
    }

    function setApplyLink(string memory _applyLink) override external returns (bool _set){
        require(isSecure(localEditorRole, "getAppliedJobs"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only"); 
        applyLink = _applyLink;
        return true; 
    }

    function populatePosting(string [] memory _featureNames, string [] memory _featureValues, string [] memory _categories, string [] memory _skills, string memory _applyLink ) override  external returns (bool _populated){
        require(isSecure(localEditorRole, "getAppliedJobs"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only"); 
        setFeaturesInternal(_featureNames, _featureValues);
        categories = _categories; 
        skills = _skills; 
        applyLink = _applyLink; 
        return true; 
    }

    // ============================= INTERNAL ====================

    function setFeaturesInternal(string [] memory _featureNames, string [] memory _featureValues) internal returns (bool){
       for(uint256 x = 0; x < _featureNames.length; x++){
            featuresByName[_featureNames[x]] = _featureValues[x];
        }
        return true; 
    }

}