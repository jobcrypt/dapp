// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title JobCrypt Core
 * @dev 
 */

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
import "../openblock/OpenRolesSecure.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "../openblock/IOpenSearch.sol"; 

import "../openblock/IOpenRanking.sol"; 

import "../openblock/IOpenBank.sol";

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

    uint256 private version = 16; 

    string private name                 = "RESERVED_JOBCRYPT_CORE";    

    address NATIVE = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    string searchManagerCA              = "RESERVED_OPEN_SEARCH_CORE";
    string rankingManagerCA             = "RESERVED_OPEN_RANKING_CORE";
    string roleManagerCA                = "RESERVED_OPEN_ROLES";
    string registryCA                   = "RESERVED_OPEN_REGISTER";
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

    string coreRole                    = "JOBCRYPT_CORE_ROLE"; 
    string coreAdminRole               = "JOBCRYPT_CORE_ADMIN_ROLE"; 
    string barredUserRole              = "JOBCRYPT_BARRED_USER_ROLE";
    //string jobPostingRole              = "JOBCRYPT_JOB_POSTING_ROLE";

    string [] roleNames = [coreRole, coreAdminRole, barredUserRole]; 

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
    address [] activeJobs;     
    address [] featuredJobs; 

    string [] hotSearchTerms;   

    address [] stakedUsers; 
    mapping(address=>uint256) stakesByAddress; 

    // limits "POPULAR JOB LIMIT", "FEATURED JOB LIMIT", "LATEST JOB LIMIT", "POPULAR JOB DISPLAY LIMIT"
    mapping(string=>uint256) limitsByName; 

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

        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(address(searchManager));
        addConfigurationItem(address(rankingManager));
        addConfigurationItem(address(dashboardFactory));
        addConfigurationItem(self);

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

    function getMinimumStakeAmount() override view external returns (uint256 _amount) {
        return limitsByName[stakeLimitKey];
    }

    function getStakedAmount() override view external returns(uint256 _stakedAmount) {
        return stakesByAddress[msg.sender]; 
    }

    function stake(uint256 _amount) override payable external returns (bool _staked){
        require(isSecureBarring(barredUserRole, "stake"), " user barred ");
        return stakeInternal(msg.sender, _amount); 
    }

    function unstake() override external returns (uint256 _unstakedAmount) {
        return unstakeInternal(msg.sender);
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

    mapping(address=>bool) paidPostingByPosting;

    function notifyPayment(address _posting) override external returns (bool _recieved) {
        require(isSecure(coreRole, "notifyPayment"), "jobcrypt only");
        paidPostingByPosting[_posting] = true;
        return true; 
    }

    function postJob( address _jobPostingAddress ) override external returns (bool _posted){
        require(msg.sender == _jobPostingAddress, "msg.sender <-> posting address mis-match ");
        require(registry.isDerivativeAddress(_jobPostingAddress) && registry.getDerivativeAddressType(_jobPostingAddress).isEqual(jobPostingType)," jobcrypt postings only");
        require(paidPostingByPosting[_jobPostingAddress]," posting not paid. ");
        // check posting paid if so set the posting to expire according to the product duration 
        IJobPosting posting_ = IJobPosting(_jobPostingAddress); 
        if(posting_.getPostingStatus().isEqual("POSTED")) {
            return false; 
        }
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
        require(stakesByAddress[_jobApplicantAddress] > 0, " applicant stake required. ");  
    
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

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(address(searchManager));
        addConfigurationItem(address(rankingManager));
        addConfigurationItem(address(dashboardFactory));
        return true; 
    }

    function setLimit(string memory _limitKey,  uint256 _limit) external returns (bool _set) {
        require(isSecure(coreRole, "setLimit")," admin only ");  
        limitsByName[_limitKey] = _limit; 
        return true; 
    }

    function pruneJobs() external returns (uint256 _latestPruneCount, uint256 _featuredPruneCount, uint256 _activePruneCount) {
        require(isSecure(coreRole, "pruneJobs")," admin only ");  
        (latestJobs, _latestPruneCount) = pruneList(latestJobs);      
        (activeJobs, _activePruneCount) = pruneList(activeJobs);
        (featuredJobs, _featuredPruneCount) = pruneList(featuredJobs); 
        return (_latestPruneCount, _featuredPruneCount, _activePruneCount);
    }

    mapping(address=>bool) isMigratedByAddress;

    function postMigratedJobs(address [] memory _migratedJobPostings) external returns (uint256 _migratedJobCount, address [] memory _notMigrated){
        require(isSecure(coreRole, "postMigratedJobs")," admin only "); 
        _notMigrated = new address[](_migratedJobPostings.length);
        uint256 y = 0; 
        for(uint256 x = 0; x < _migratedJobPostings.length; x++){
            address toMigrate_ = _migratedJobPostings[x];
            if(!isMigratedByAddress[toMigrate_]){
                if(migrate(toMigrate_)){
                    _migratedJobCount++;
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
         require(isSecure(coreAdminRole, "forceDelist")," admin only "); 
         for(uint256 x = 0; x < _delistPostings.length; x++) {
            address postingAddress_ = _delistPostings[x];
            IJobPostingEditor posting_ = IJobPostingEditor(postingAddress_);
            latestJobs = postingAddress_.remove(latestJobs);
            activeJobs = postingAddress_.remove(activeJobs); 
            featuredJobs = postingAddress_.remove(featuredJobs);
            posting_.deactivate(); 
            searchManager.removeSearchableAddress(postingAddress_);
            rankingManager.removeRankedAddress(postingAddress_);
            _delistedCount++;
         }
    }

    function forceUnstake() external returns (uint256 _unstakedUserCount, uint256 _stakedUserCount) {   
        require(isSecure(coreAdminRole, "forceUnstake")," admin only ");      
        _stakedUserCount = stakedUsers.length; 
        for(uint256 x = 0; x < stakedUsers.length; x++) {
            address stakedUser = stakedUsers[x];
            unstakeInternal(stakedUser);
            _unstakedUserCount++;
        }
        return (_unstakedUserCount, _stakedUserCount); 
    }

    function forceUnstakeOwner(address _owner) external returns (uint256 _unstakedAmount) {   
        require(isSecure(coreAdminRole, "forceUnstakeOwner")," admin only ");      
        return unstakeInternal(_owner);
    }

    //============================== INTERNAL =============================

    function migrate(address _posting) internal returns (bool _migrated) {
        if(registry.isDerivativeAddress(_posting) && registry.getDerivativeAddressType(_posting).isEqual(jobPostingType)){
            paidPostingByPosting[_posting] = true;
            latestJobs.push(_posting);
            updateSearchTerms(_posting);
            activeJobs.push(_posting);
            IJobPosting posting_ = IJobPosting(_posting); 
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

    function stakeInternal(address _owner, uint256 _amount) internal returns (bool) {        
        require(stakesByAddress[_owner] == 0, " already staked ");
        require(msg.value >= _amount, " sent value <-> declared value mis-match "); 
        require(_amount >= limitsByName[stakeLimitKey], " in sufficient stake ");
        stakesByAddress[_owner] = msg.value; 
        stakedUsers.push(_owner);
        return true; 
    }

    function unstakeInternal(address _owner) internal returns (uint256 _unstakedAmount) {
        require(stakesByAddress[_owner] > 0, " no stake to remove ");
        _unstakedAmount = stakesByAddress[_owner];
        stakesByAddress[_owner] -= _unstakedAmount; 
        address payable leaver = payable(_owner);
        leaver.transfer(_unstakedAmount);
        stakedUsers = _owner.remove(stakedUsers);
        return _unstakedAmount; 
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
        hasDefaultFunctionsByRole[coreAdminRole] = true; 
        hasDefaultFunctionsByRole[barredUserRole] = true; 
        defaultFunctionsByRole[coreAdminRole].push("notifyChangeOfAddress");
        defaultFunctionsByRole[coreAdminRole].push("postMigratedJobs");
        defaultFunctionsByRole[coreAdminRole].push("forceDelist");
        defaultFunctionsByRole[coreAdminRole].push("pruneJobs");
        defaultFunctionsByRole[coreAdminRole].push("setLimit");
        defaultFunctionsByRole[coreAdminRole].push("forceDelist");
        defaultFunctionsByRole[coreAdminRole].push("forceUnstake");
        defaultFunctionsByRole[coreAdminRole].push("forceUnstakeOwner");

        defaultFunctionsByRole[barredUserRole].push("stake");
        
        //defaultFunctionsByRole[jobPostingRole].push("");
        //defaultFunctionsByRole[jobPostingRole].push("");

        defaultFunctionsByRole[coreRole].push("updateHotSearchTerms");

        return true; 
    }
}