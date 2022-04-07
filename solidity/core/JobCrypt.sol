// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title JobCrypt Core
 * @dev 
 */

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/e7813857f186df0043c84f0cca42478584abe09c/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecure.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "https://github.com/Block-Star-Logic/open-search/blob/9aeb257f6fa18d4d1b0252b69c22305ee9f5215b/blockchain_ethereum/solidity/V1/interfaces/IOpenSearch.sol"; 

import "https://github.com/Block-Star-Logic/open-ranking/blob/0e468d4680147bbb71c01bdeae1e799d96ff62db/blockchain_ethereum/solidity/V1/interfaces/IOpenRanking.sol"; 

import "../interfaces/IJobCrypt.sol";
import "../interfaces/IJobPosting.sol";
import "../interfaces/IJobPostingEditor.sol";
import "../interfaces/IEmployerDashboard.sol";
import "../interfaces/IJobSeekerDashboard.sol";
import "../interfaces/IJobCryptDashboardFactory.sol";

contract JobCrypt is OpenRolesSecure, IJobCrypt, IOpenRolesManaged { 

    using LOpenUtilities for string;
    using LOpenUtilities for address; 
    using LOpenUtilities for address[];

    uint256 private version = 20; 

    string private name                 = "RESERVED_JOBCRYPT_CORE";    

    address NATIVE = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    string searchManagerCA              = "RESERVED_OPEN_SEARCH_CORE";
    string rankingManagerCA             = "RESERVED_OPEN_RANKING_CORE";
    string roleManagerCA                = "RESERVED_OPEN_ROLES_CORE";
    string registryCA                   = "RESERVED_OPEN_REGISTER_CORE";
    string jobSeekerDashboardFactoryCA  = "RESERVED_JOBCRYPT_DASHBOARD_FACTORY";

    string popularJobsRankingList        = "POPULAR_JOBS_RANKING_LIST";

    string latestJobDisplayLimitKey     = "LATEST_JOB_DISPLAY_LIMIT_KEY"; 
    string popularJobDisplayLimitKey    = "POPULAR_JOB_DISPLAY_LIMIT_KEY";
    string featuredJobDisplayLimitKey   = "FEATURED_JOB_DISPLAY_LIMIT_KEY";
    string jobAgeLimitKey               = "JOB_AGE_LIMIT_KEY";
    string searchResultLimitKey         = "SEARCH_RESULT_LIMIT_KEY";
    string pageLimitKey                 = "JOB_PAGE_LIMIT_KEY";
    string stakeLimitKey                = "STAKE_LIMIT_KEY";

    string postingCategoriesSearchField = "POSTING_CATEGORIES_SEARCH_FIELD";
    string postingSkillsSearchField     = "POSTING_SKILLS_SEARCH_FIELD";
    string postingTitleSearchField      = "POSTING_TITLE_SEARCH_FIELD";
    string postingCompanySearchField    = "POSTING_COMPANY_SEARCH_FIELD";

    string coreRole                     = "JOBCRYPT_CORE_ROLE"; 
    string jobCryptAdminRole            = "JOBCRYPT_ADMIN_ROLE";
    string barredUserRole               = "JOBCRYPT_BARRED_USER_ROLE";
    //string jobPostingRole              = "JOBCRYPT_JOB_POSTING_ROLE";

    string [] roleNames = [coreRole, jobCryptAdminRole, barredUserRole]; 

    string localPostingEditorRole       = "LOCAL_POSTING_EDITOR_ROLE";
    string localPostingPostRole         = "LOCAL_POSTING_POST_ROLE";
    
    string jobSeekerDashboardType       = "JOBSEEKER_DASHBOARD_TYPE";
    string jobPostingType               = "JOBCRYPT_JOB_POSTING_TYPE";

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    IOpenSearch                 searchManager;
    IOpenRanking                rankingManager; 
    IOpenRegister               registry; 
    IJobCryptDashboardFactory   dashboardFactory; 

    IJobPosting [] jobs; 

    address [] latestJobs;      
    address [] activeJobs;     
    address [] featuredJobs; 

    string [] hotSearchTerms;   


    // limits "POPULAR JOB LIMIT", "FEATURED JOB LIMIT", "LATEST JOB LIMIT", "POPULAR JOB DISPLAY LIMIT"
    mapping(string=>uint256) limitsByName; 

    uint256 earliestLatestJobIndex; 

    mapping(address=>IEmployerDashboard) employerDashboardByEmployerAddress; 
    mapping(address=>IJobSeekerDashboard) jobSeekerDashboardByJobSeekerAddress; 

    mapping(address=>bool) hasEmployerDashboardByEmployerAddress;
    mapping(address=>bool) hasJobSeekreDashboardByJobSeekerAddress;

    mapping(address=>bool) paidPostingByPosting;

    mapping(address=>mapping(address=>bool)) paidProductForPostingByPosting; 

    mapping(address=>bool) isMigratedByAddress;

    mapping(address=>bool) isStakedByAddress; 

    
    constructor(address _registryAddress) {          
      
        registry                = IOpenRegister(_registryAddress);
        searchManager           = IOpenSearch(registry.getAddress(searchManagerCA));
        rankingManager          = IOpenRanking(registry.getAddress(rankingManagerCA));
      
        dashboardFactory        = IJobCryptDashboardFactory(registry.getAddress(jobSeekerDashboardFactoryCA));

        setRoleManager(registry.getAddress(roleManagerCA));
        
        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(address(searchManager));
        addConfigurationItem(address(rankingManager));
        addConfigurationItem(address(dashboardFactory));
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
    
    function findJobs(string memory _term) view external returns (address [] memory _postingAddresses){
        return searchManager.generalSearch(_term);
    }

    function findJobs(string memory _term, string memory _field) override view external returns (address [] memory _postAddresses) {
        return searchManager.searchField(_term, _field, limitsByName[searchResultLimitKey] );
    }

    function getActiveJobPage(uint256 _page) override view external returns (address [] memory _activeJobAddresses, uint256 _pageCount) {
        _pageCount = calculatePageCount();
        _activeJobAddresses = getPage(_page);
        return (_activeJobAddresses, _pageCount ); 
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
        return rankingManager.getRanking( popularJobsRankingList, limitsByName[popularJobDisplayLimitKey]);  
    }

    function getHotSearchTerms() override view external returns (string [] memory _hotSearchTerms){     
        return hotSearchTerms;
    }    
    function isStaked() override view external returns (bool _staked){
        return isStakedByAddress[msg.sender];
    }

    function isPaidPosting(address _posting) override view external returns(bool _paid) { 
        return paidPostingByPosting[_posting];
    }

    function notifyPayment(address _posting) override external returns (bool _recieved) {
        require(isSecure(coreRole, "notifyPayment"), "jobcrypt only");
        paidPostingByPosting[_posting] = true;
        return true; 
    }

    function notifyProductPayment(address _posting, address _productAddress ) override external returns (bool _recieved){
        require(isSecure(coreRole, "notifyPayment"), "jobcrypt only");
        paidProductForPostingByPosting[_posting][_productAddress] = true;  
        return true; 
    }

    function notifyUserStaked(address _user, bool _isStaked) override external returns (bool _recieved ){
        require(isSecure(coreRole, "notifyUserStaked"), "jobcrypt only");
        isStakedByAddress[_user] = _isStaked;
        return true; 
    }

    function notifyDelistJob(address _jobPosting) override external returns (bool _delisted) {
        require(isSecure(coreRole, "notifyUserStaked"), "jobcrypt only");
        return deList(_jobPosting);        
    }

    function postJob( address _jobPostingAddress ) override external returns (bool _posted){
        require(msg.sender == _jobPostingAddress, "msg.sender <-> posting address mis-match ");
        require(registry.isDerivativeAddress(_jobPostingAddress) && registry.getDerivativeAddressType(_jobPostingAddress).isEqual(jobPostingType)," jobcrypt postings only");
        require(paidPostingByPosting[_jobPostingAddress]," posting not paid. ");
        // check posting paid if so set the posting to expire according to the product duration 
        IJobPosting posting_ = IJobPosting(_jobPostingAddress); 
        require(!posting_.getPostingStatus().isEqual("POSTED"), " already posted ");

        jobs.push(posting_);
        latestJobs.push(_jobPostingAddress);
        activeJobs.push(_jobPostingAddress);
        updateSearchTerms(_jobPostingAddress);
        
        IOpenProduct product = IOpenProduct(posting_.getProduct());

        if(product.hasFeature("PRODUCT_FEATURED")){
            featuredJobs.push(_jobPostingAddress);
        }
        uint256 postingStartTime = block.timestamp; 
        uint256 postingEndTime = postingStartTime + product.getFeatureUINTValue("DURATION");
        IJobPostingEditor editablePosting_ = IJobPostingEditor(_jobPostingAddress);
        editablePosting_.setExpiryDate(postingEndTime);
        string memory companyName_ = posting_.getFeature("COMPANY_NAME");

        emit JobPosted(_jobPostingAddress, companyName_, postingStartTime );
      
        editablePosting_.setPostingStatus("POSTED");
        return true; 
    }

    function logJobApplication(address _jobApplicantAddress, address _postingAddress) override external returns (bool _logged){
        require(msg.sender == _postingAddress, "msg.sender <-> posting address mis-match. ");            
        require(registry.isDerivativeAddress(_postingAddress) && registry.getDerivativeAddressType(_postingAddress).isEqual(jobPostingType)," jobcrypt postings only");
        require(isStakedByAddress[_jobApplicantAddress], " applicant stake required. ");  
    
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

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registryCA)); // make sure this is NOT a zero address       
        searchManager           = IOpenSearch(registry.getAddress(searchManagerCA));
        rankingManager          = IOpenRanking(registry.getAddress(rankingManagerCA));       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        dashboardFactory        = IJobCryptDashboardFactory(registry.getAddress(jobSeekerDashboardFactoryCA));

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(address(searchManager));
        addConfigurationItem(address(rankingManager));
        addConfigurationItem(address(dashboardFactory));
        return true; 
    }

    function setLimit(string memory _limitKey,  uint256 _limit) external returns (bool _set) {
        require(isSecure(jobCryptAdminRole, "setLimit")," admin only ");  
        limitsByName[_limitKey] = _limit; 
        return true; 
    }

    function pruneJobs() external returns (uint256 _latestPruneCount, uint256 _featuredPruneCount, uint256 _activePruneCount) {
        require(isSecure(jobCryptAdminRole, "pruneJobs")," admin only ");  
        (latestJobs, _latestPruneCount) = pruneList(latestJobs);      
        (activeJobs, _activePruneCount) = pruneList(activeJobs);
        (featuredJobs, _featuredPruneCount) = pruneList(featuredJobs); 
        return (_latestPruneCount, _featuredPruneCount, _activePruneCount);
    }


    function postMigratedJobs(address [] memory _migratedJobPostings) external returns (uint256 _migratedJobCount, address [] memory _notMigrated){
        require(isSecure(jobCryptAdminRole, "postMigratedJobs")," admin only "); 
        _notMigrated = new address[](_migratedJobPostings.length);
        uint256 y = 0; 
        for(uint256 x = 0; x < _migratedJobPostings.length; x++){
            address toMigrate_ = _migratedJobPostings[x];
            if(!isMigratedByAddress[toMigrate_]){
                if(migrate(toMigrate_)){
                    _migratedJobCount++;
                    isMigratedByAddress[toMigrate_] = true;
                }
                else{
                    _notMigrated[y] = toMigrate_;
                    y++;
                }
            }
            else {
                 _notMigrated[y] = toMigrate_;
                y++;
            }
        }
        _notMigrated = _notMigrated.trim(y);
        return (_migratedJobCount, _notMigrated); 
    }

    function forceDelist(address [] memory _delistPostings)  external returns (uint256 _delistedCount){
         require(isSecure(jobCryptAdminRole, "forceDelist")," admin only "); 
         for(uint256 x = 0; x < _delistPostings.length; x++) {
            address postingAddress_ = _delistPostings[x];
            deList(postingAddress_);
            _delistedCount++;
         }
    }



    //============================== INTERNAL =============================

    function migrate(address _posting) internal returns (bool _migrated) {
        if(registry.isDerivativeAddress(_posting) && registry.getDerivativeAddressType(_posting).isEqual(jobPostingType)){
            IJobPosting posting_ = IJobPosting(_posting);
            if(posting_.getExpiryDate() <= block.timestamp){
                return false; 
            }
            paidPostingByPosting[_posting] = true;
            latestJobs.push(_posting);
            updateSearchTerms(_posting);
            activeJobs.push(_posting);         
            IOpenProduct product = IOpenProduct(posting_.getProduct());
            if(product.hasFeature("PRODUCT_FEATURED")){
                featuredJobs.push(_posting);
            }
            isMigratedByAddress[_posting] = true; 
            return true; 
        }
        else { 
            return false; 
        }
    }

    function deList(address _postingAddress) internal returns (bool _deListed) {
            IJobPostingEditor posting_ = IJobPostingEditor(_postingAddress);
            latestJobs = _postingAddress.remove(latestJobs);
            activeJobs = _postingAddress.remove(activeJobs); 
            featuredJobs = _postingAddress.remove(featuredJobs);
            posting_.deactivate(); 
            searchManager.removeSearchableAddress(_postingAddress);
            rankingManager.removeRankedAddress(_postingAddress);
            return true; 
    }

    function pruneList(address [] memory _jobPostingList) internal returns(address [] memory _prunedList, uint256 _count){
        _prunedList = new address[](_jobPostingList.length);
        uint256 y = 0;
        uint256 z = 0; 
        uint256 timeNow = block.timestamp;
        for(uint256 x =0; x < _jobPostingList.length; x++){
            address postingAddress_ = _jobPostingList[x];
            IJobPosting posting_ = IJobPosting(postingAddress_);
            if(timeNow > posting_.getExpiryDate() || !posting_.getPostingStatus().isEqual("ACTIVE")){
                searchManager.removeSearchableAddress(postingAddress_);
                rankingManager.removeRankedAddress(postingAddress_);
                z++; 
            }
            else {
                _prunedList[y] = postingAddress_;
                y++; 
            }
        }
        _prunedList = _prunedList.trim(_jobPostingList.length - z);
        return (_prunedList, z); 
    }

    function updateSearchTerms(address _jobPostingAddress) internal returns (bool) {
        IJobPosting posting_ = IJobPosting(_jobPostingAddress);
        searchManager.addSearchableAddress(_jobPostingAddress, postingCategoriesSearchField , posting_.getCategories());
        searchManager.addSearchableAddress(_jobPostingAddress, postingSkillsSearchField , posting_.getSkillsRequired());
        string [] memory title_ = new string[](1);
        title_[0] =  posting_.getFeature("TITLE");
        searchManager.addSearchableAddress(_jobPostingAddress, postingTitleSearchField, title_);
        string [] memory company_ = new string[](1);
        company_[0] = posting_.getFeature("COMPANY");
        searchManager.addSearchableAddress(_jobPostingAddress, postingCompanySearchField, company_);
        return true; 
    }

    function updatePopularJobs(address _jobPostingAddress) internal returns(bool) {
        rankingManager.addAddressToRank(_jobPostingAddress, popularJobsRankingList);
        address topJob_ = rankingManager.getRanking( popularJobsRankingList, 1)[0]; 
        hotSearchTerms = IJobPosting(topJob_).getCategories(); 
        return true; 
    }

    function calculatePageCount() view internal returns (uint256 _pageCount){
        uint256 activeCount_ = activeJobs.length; 
        uint256 limit_  = limitsByName[pageLimitKey];
        return activeCount_ / limit_; 
    }

    function getPage(uint256 _page) view internal returns (address [] memory _activeJobAddresses){
        uint256 pageCount_ = calculatePageCount();
        if(_page > pageCount_){
            return new address[](0);
        }
        uint256 pageLimit_ = limitsByName[pageLimitKey];
        uint256 startIndex = _page * pageLimit_;
        _activeJobAddresses = new address[](pageLimit_);
        uint256 y = 0; 
        for(uint256 x = startIndex; x < activeJobs.length; x++) {
            _activeJobAddresses[y] = activeJobs[x];
            y++;
            if(y >= pageLimit_){
                break; 
            }
        }
        return _activeJobAddresses; 
    }



    function initDisplayDefaults() internal { 

        limitsByName[latestJobDisplayLimitKey]      = 20; 
        limitsByName[popularJobDisplayLimitKey]     = 10;
        limitsByName[featuredJobDisplayLimitKey]    = 20; 
        limitsByName[jobAgeLimitKey]                = 1209600; //two weeks
        limitsByName[searchResultLimitKey]          = 100; 
        limitsByName[pageLimitKey]                  = 100;		
    }  

    function initJobCryptFunctionsForRoles() internal returns (bool _initiated) {
        hasDefaultFunctionsByRole[coreRole] = true; 
        hasDefaultFunctionsByRole[jobCryptAdminRole] = true; 
        hasDefaultFunctionsByRole[barredUserRole] = true; 
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyChangeOfAddress");
        defaultFunctionsByRole[jobCryptAdminRole].push("postMigratedJobs");
        defaultFunctionsByRole[jobCryptAdminRole].push("forceDelist");
        defaultFunctionsByRole[jobCryptAdminRole].push("pruneJobs");
        defaultFunctionsByRole[jobCryptAdminRole].push("setLimit");
        defaultFunctionsByRole[jobCryptAdminRole].push("forceDelist");
        defaultFunctionsByRole[jobCryptAdminRole].push("forceUnstake");
        defaultFunctionsByRole[jobCryptAdminRole].push("forceUnstakeOwner");

        defaultFunctionsByRole[barredUserRole].push("stake");
        
        //defaultFunctionsByRole[jobPostingRole].push("");
        //defaultFunctionsByRole[jobPostingRole].push("");

        defaultFunctionsByRole[coreRole].push("updateHotSearchTerms");

        return true; 
    }
}