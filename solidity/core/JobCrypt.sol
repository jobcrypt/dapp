// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title JobCrypt Core
 * @dev 
 */

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/2583caf3357fe411e4a60feced77d0e81f6c45f0/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecure.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol";

import "https://github.com/Block-Star-Logic/open-search/blob/63d1dfcff65231d3849c4f827bf00e7e5f9f3586/blockchain_ethereum/solidity/V1/interfaces/IOpenSearch.sol"; 

import "https://github.com/Block-Star-Logic/open-ranking/blob/7c619870350c6c77db6603e88da7749bf9ea455f/blockchain_ethereum/solidity/V1/interfaces/IOpenRanking.sol"; 

import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "../openblock/IOpenBank.sol";

import "../interfaces/IJobCrypt.sol";
import "../interfaces/IJobPosting.sol";
import "../interfaces/IJobPostingEditor.sol";
import "../interfaces/IEmployerDashboard.sol";
import "../interfaces/IJobSeekerDashboard.sol";
import "../interfaces/IJobCryptDashboardFactory.sol";

contract JobCrypt is OpenRolesSecure, IJobCrypt, IOpenRolesManaged { 

    using LOpenUtilities for string;

    uint256 private version = 14; 

    string private name                 = "RESERVED_JOBCRYPT_CORE";    

    address NATIVE = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    string searchManagerCA              = "RESERVED_OPEN_SEARCH_CORE";
    string rankingManagerCA             = "RESERVED_OPEN_RANKING_CORE";
    string roleManagerCA                = "RESERVED_OPEN_ROLES";
    string registryCA                   = "RESERVED_OPEN_REGISTER";
    string jobSeekerDashboardFactoryCA  = "RESERVED_JOBCRYPT_DASHBOARD_FACTORY";

    string popularJobsRankingKey        = "POPULAR_JOBS_RANKING_KEY";
    string latestJobDisplayLimitKey     = "LATEST_JOB_DISPLAY_LIMIT_KEY"; 
    string popularJobDisplayLimitKey    = "POPULAR_JOB_DISPLAY_LIMIT_KEY";
    string featuredJobDisplayLimitKey   = "FEATURED_JOB_DISPLAY_LIMIT_KEY";
    string jobAgeLimitKey               = "JOB_AGE_LIMIT_KEY";

    string coreRole                    = "JOBCRYPT_CORE_ROLE"; 

    string [] roleNames = [coreRole]; 

    string localPostingEditorRole       = "LOCAL_POSTING_EDITOR_ROLE";
    string localPostingPostRole         = "LOCAL_POSTING_POST_ROLE";
    
    string jobSeekerDashboardType       = "JOBSEEKER_DASHBOARD_TYPE";
    string jobPostingType               = "JOB_POSTING_TYPE";

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    IOpenSearch                 searchManager;
    IOpenRanking                rankingManager; 
    IOpenRegister               registry; 
    IJobCryptDashboardFactory   dashboardFactory; 

    IJobPosting [] jobs; 

    address [] latestJobs;      

    address [] featuredJobs; 

    string [] hotSearchTerms;   

    mapping(uint256=>address) popularJobByIndex;
    mapping(uint256=>bool) hasPopularJobEntryByIndex;

    // limits "POPULAR JOB LIMIT", "FEATURED JOB LIMIT", "LATEST JOB LIMIT", "POPULAR JOB DISPLAY LIMIT"
    mapping(string=>uint256) limitsByName; 

    struct JobApplicationStatistic {
        address _postingAddress; 
        uint256 _applications; 
    }

    mapping(uint256=>JobApplicationStatistic) jobApplicationStatisticByRank; 
    mapping(address=>JobApplicationStatistic) jobApplicationStatisticByPostingAddress; 

    mapping(address=>JobApplicationStatistic[]) jobApplicationStatisticByEmployerAddress; 

    uint256 earliestLatestJobIndex; 

    mapping(address=>IEmployerDashboard) employerDashboardByEmployerAddress; 
    mapping(address=>IJobSeekerDashboard) jobSeekerDashboardByJobSeekerAddress; 

    mapping(address=>bool) hasEmployerDashboardByEmployerAddress;
    mapping(address=>bool) hasJobSeekreDashboardByJobSeekerAddress;
    
    constructor(address _registryAddress) {          
        registry                = IOpenRegister(_registryAddress);
        searchManager           = IOpenSearch(registry.getAddress(searchManagerCA));
        rankingManager          = IOpenRanking(registry.getAddress(rankingManagerCA));
        dashboardFactory        = IJobCryptDashboardFactory(registry.getAddress(jobSeekerDashboardFactoryCA));

        setRoleManager(registry.getAddress(roleManagerCA));

        addConfigurationItem(registryCA, _registryAddress, 0);   
        addConfigurationItem(roleManagerCA, address(roleManager), 0);         
        addConfigurationItem(searchManagerCA, address(searchManager), 0);
        addConfigurationItem(rankingManagerCA, address(rankingManager), 0);
        addConfigurationItem(rankingManagerCA, address(dashboardFactory), 0);
        addConfigurationItem(name, self, version);

        initJobCryptFunctionsForRoles();
        initDisplayDefaults();
    }

    function getVersion() override view external returns (uint256 _version) { 
        return version;  
    }

    function getName() override view external returns (string memory _contractName){  
        return name;
    }

    function getDefaultRoles() override view external returns (string [] memory _roles){    
        return  roleNames; 
    }

    function hasDefaultFunctions(string memory _role) override view external returns(bool _hasFunctions){
        return hasDefaultFunctionsByRole[_role];
    }

    function getDefaultFunctions(string memory _role) override view external returns (string [] memory _functions){
        return defaultFunctionsByRole[_role];
    }

    function getLatestJobs() override view external returns (address [] memory _latestJobAddresses){
       
        uint256 jobsLimit_ = limitsByName[popularJobDisplayLimitKey]; 
        if(latestJobs.length > jobsLimit_){
            
            uint256 jobAgeLimit_ = limitsByName[jobAgeLimitKey]; 

            uint256 dateLimit_ = block.timestamp - jobAgeLimit_; 
            _latestJobAddresses = new address[](jobsLimit_);

            uint256 start = latestJobs.length-1;
            uint256 end = latestJobs.length - jobsLimit_; 

            uint256 y = 0; 
            for(uint256 x = start; x >= end ; x--){
                address p = latestJobs[x];
                IJobPosting posting = IJobPosting(p);
                if(posting.getPostingDate() > dateLimit_ ){
                 _latestJobAddresses[y] = p; 
                 y++;
                }                                    
            }
            return _latestJobAddresses; 
        }
        return latestJobs; 
    }

    function getFeaturedJobs() override view external returns (address [] memory _featuredJobAddresses ){
        return featuredJobs; 
    }

    function getPopularJobs() override view external returns (address [] memory _popularJobAddresses){        
        return rankingManager.getRanking( popularJobsRankingKey, limitsByName[popularJobDisplayLimitKey]);  
    }

    function getHotSearchTerms() override view external returns (string [] memory _hotSearchTerms){     
        return hotSearchTerms;
    }    

    function configureFeature(string memory _feature, address _posting) override external returns (bool _configured) {
        require(isSecure(coreRole, "configureFeature"), "jobcrypt only");
        IJobPosting posting_ = IJobPosting(_posting);
        if(_feature.isEqual("EXPIRY_DATE")) {
            IOpenProduct product_ = IOpenProduct(posting_.getProduct());
            uint256 extensionDuration_ = product_.getFeatureUINTValue(_feature);
            uint256 endDate_ = block.timestamp + extensionDuration_; 
            IJobPostingEditor editor_ = IJobPostingEditor(_posting);
            editor_.setExpiryDate(endDate_);
        }

        return true; 
    }

    mapping(address=>bool) paidPostingByPosting;

    function notifyPayment(address _posting) override external returns (bool _recieved) {
        require(isSecure(coreRole, "notifyPayment"), "jobcrypt only");
        paidPostingByPosting[_posting] = true;
        return true; 
    }

    function postJob( address _jobPostingAddress ) override external returns (bool _posted){
        require(msg.sender == _jobPostingAddress, "msg.sender <-> posting address mis-match ");
        //require(registry.isDerivativeAddress(_postingAddress) && registry.getDerivativeAddressType(_postingAddress).isEqual(jobPostingType)," jobcrypt postings only");
        //require(paidPostingByPosting[_postingAddress]," posting not paid. ");
        // check posting paid if so set the posting to expire according to the product duration 
        IJobPosting posting_ = IJobPosting(_jobPostingAddress); 
        if(posting_.getPostingStatus().isEqual("POSTED")) {
            return false; 
        }
        jobs.push(posting_);
        latestJobs.push(_jobPostingAddress);
        
        IOpenProduct product = IOpenProduct(posting_.getProduct());

        if(product.hasFeature("PRODUCT_FEATURED")){
            featuredJobs.push(_jobPostingAddress);
        }
        string memory companyName_ = posting_.getFeature("COMPANY_NAME");
        emit JobPosted(_jobPostingAddress, companyName_, block.timestamp );
        return true; 
    }

    function logJobApplication(address _jobApplicantAddress, address _postingAddress) override external returns (bool _logged){
        //require(msg.sender == _postingAddress, "msg.sender <-> posting address mis-match ");
       // require(registry.isDerivativeAddress(_postingAddress) && registry.getDerivativeAddressType(_postingAddress).isEqual(jobPostingType)," jobcrypt postings only");
    //    update dashboard stats 
        IJobSeekerDashboard jsDashboard;
        if(dashboardFactory.hasDashboard(_jobApplicantAddress, jobSeekerDashboardType)){
            jsDashboard = IJobSeekerDashboard(dashboardFactory.findDashboard(_jobApplicantAddress, jobSeekerDashboardType));
        }
        else { 
            jsDashboard = IJobSeekerDashboard(dashboardFactory.createJobSeekerDashboard(_jobApplicantAddress));  
        }
        jsDashboard.addJobApplication(_postingAddress);  

        updatePopularJobs(_postingAddress);     

        return true; 
    }

    function updateHotSearchTerms(string [] memory _searchTerms) external returns(bool _updated) {
        require(isSecure(coreRole, "updateHotSearchTerms"), " JOBCRYPT CORE : updateHotSearchTerms : 00 : jobcrypt only ");
         hotSearchTerms = _searchTerms; 
         return true; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(coreRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registryCA)); // make sure this is NOT a zero address       
        searchManager           = IOpenSearch(registry.getAddress(searchManagerCA));
        rankingManager          = IOpenRanking(registry.getAddress(rankingManagerCA));       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        dashboardFactory        = IJobCryptDashboardFactory(registry.getAddress(jobSeekerDashboardFactoryCA));

        return true; 
    }

    function setLimit(string memory _limitKey,  uint256 _limit) external returns (bool _set) {
        limitsByName[_limitKey] = _limit; 
        return true; 
    }


    //============================== INTERNAL =============================

    function postInternal (address _jobPostingAddress) internal { 
        IJobPosting posting = IJobPosting(_jobPostingAddress); 
        if(posting.getPostingStatus().isEqual("POSTED")) {
            return; 
        }
        jobs.push(posting);
        latestJobs.push(_jobPostingAddress);
        
        IOpenProduct product = IOpenProduct(posting.getProduct());

        if(product.hasFeature("PRODUCT_FEATURED")){
            featuredJobs.push(_jobPostingAddress);
        }
    }

    function updatePopularJobs(address _jobPostingAddress) internal returns(bool) {
        IJobPosting posting = IJobPosting(_jobPostingAddress);
        uint256 applicationCount_ = posting.getApplicantCount();

        uint256 popularJobLimit_ = limitsByName[popularJobDisplayLimitKey];
        uint256 end = popularJobLimit_ - 1;
        for(uint x = 0; x < popularJobLimit_; x++ ){

            if(hasPopularJobEntryByIndex[x]){
                 uint256 count_ = IJobPosting(popularJobByIndex[x]).getApplicantCount();
                 if(applicationCount_ > count_){
                    // replace 
                    popularJobByIndex[x] = _jobPostingAddress;
                 }
                 if(applicationCount_ == count_) {
                     if( x != end ) {
                         // check next 
                        uint256 next_ = x+1; 
                        popularJobByIndex[next_] = _jobPostingAddress;

                     }  
                 }
        
            }
            else { 
               popularJobByIndex[x] = _jobPostingAddress;
               hasPopularJobEntryByIndex[x] = true; 
               break; 
            }
                    
        }
        return true; 
    }

    function initDisplayDefaults() internal { 

        limitsByName[popularJobsRankingKey]         = 5; 
        limitsByName[latestJobDisplayLimitKey]      = 20; 
        limitsByName[popularJobDisplayLimitKey]     = 10;
        limitsByName[featuredJobDisplayLimitKey]    = 20; 
        limitsByName[jobAgeLimitKey]                = 1209600; //two weeks		
    }  

    function initJobCryptFunctionsForRoles() internal returns (bool _initiated) {
        hasDefaultFunctionsByRole[coreRole] = true; 
        defaultFunctionsByRole[coreRole].push("notifyChangeOfAddress");
        defaultFunctionsByRole[coreRole].push("updateHotSearchTerms");

        return true; 
    }
}