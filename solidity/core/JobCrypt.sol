// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.14;

/**
 * @title JobCrypt Core
 * @dev 
 */

import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol"; 
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "https://github.com/Block-Star-Logic/open-search/blob/49ada720eee8ef5feccdaa29481bcbbe04576e2c/blockchain_ethereum/solidity/V1/interfaces/IOpenSearch.sol"; 

import "https://github.com/Block-Star-Logic/open-ranking/blob/0e468d4680147bbb71c01bdeae1e799d96ff62db/blockchain_ethereum/solidity/V1/interfaces/IOpenRanking.sol"; 

import "https://github.com/Block-Star-Logic/open-libraries/blob/703b21257790c56a61cd0f3d9de3187a9012e2b3/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";

import "../interfaces/IJobCrypt.sol";
import "../interfaces/IJobPosting.sol";
import "../interfaces/IJobPostingEditor.sol";
import "../interfaces/IEmployerDashboard.sol";
import "../interfaces/IJobSeekerDashboard.sol";
import "../interfaces/IJobCryptDashboardFactory.sol";
import "../interfaces/IJobCryptPaymentManager.sol";

contract JobCrypt is OpenRolesSecureCore, IOpenVersion, IJobCrypt, IOpenRolesManaged { 

    using LOpenUtilities for string;
    using LOpenUtilities for string[];
    using LOpenUtilities for address; 
    using LOpenUtilities for address[];

    uint256 private version = 22; 

    string private name                 = "RESERVED_JOBCRYPT_CORE";    

    address NATIVE = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    string searchManagerCA              = "RESERVED_OPEN_SEARCH_CORE";
    string rankingManagerCA             = "RESERVED_OPEN_RANKING_CORE";
    string roleManagerCA                = "RESERVED_OPEN_ROLES_CORE";
    string registryCA                   = "RESERVED_OPEN_REGISTER_CORE";
    string jobSeekerDashboardFactoryCA  = "RESERVED_JOBCRYPT_DASHBOARD_FACTORY";
    string jobCryptPaymentManagerCA     = "RESERVED_JOBCRYPT_PAYMENT_MANAGER";

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

    string postingFeatureExpiryDateKey      = "EXPIRY_DATE_FEATURE";
    string postingFeatureApplicantCountKey  = "APPLICANT_COUNT_FEATURE";
    string postingFeatureProductKey         = "PRODUCT_FEATURE";
    string postingFeatureCompanyNameKey     = "COMPANY_NAME";
    string postingFeatureTitleKey           = "TITLE";

    string jobCryptAdminRole            = "JOBCRYPT_ADMIN_ROLE";
    string jobCryptBusinessAdminRole    = "JOBCRYPT_BUSINESS_ADMIN_ROLE";

    string [] roleNames = [jobCryptAdminRole, jobCryptBusinessAdminRole]; 

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
    IJobCryptPaymentManager     paymentManager; 

    address [] latestJobs;      
    address [] activeJobs;     
    address [] featuredJobs; 
    address [] allJobs; 

    string [] hotSearchTerms;   


    // limits "POPULAR JOB LIMIT", "FEATURED JOB LIMIT", "LATEST JOB LIMIT", "POPULAR JOB DISPLAY LIMIT"
    mapping(string=>uint256) limitsByName; 

    uint256 earliestLatestJobIndex; 

    mapping(address=>IEmployerDashboard) employerDashboardByEmployerAddress; 
    mapping(address=>IJobSeekerDashboard) jobSeekerDashboardByJobSeekerAddress; 

    mapping(address=>bool) hasEmployerDashboardByEmployerAddress;
    mapping(address=>bool) hasJobSeekreDashboardByJobSeekerAddress;

    mapping(address=>bool) isMigratedByAddress;

    
    constructor(address _registryAddress) OpenRolesSecureCore("JOBCRYPT") {          
      
        registry                = IOpenRegister(_registryAddress);
        searchManager           = IOpenSearch(registry.getAddress(searchManagerCA));
        rankingManager          = IOpenRanking(registry.getAddress(rankingManagerCA));
      
        dashboardFactory        = IJobCryptDashboardFactory(registry.getAddress(jobSeekerDashboardFactoryCA));
        paymentManager          = IJobCryptPaymentManager(registry.getAddress(jobCryptPaymentManagerCA));

        setRoleManager(registry.getAddress(roleManagerCA));
        
        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(address(searchManager));
        addConfigurationItem(address(rankingManager));
        addConfigurationItem(address(dashboardFactory));
        addConfigurationItem(address(paymentManager));

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
    
    function getActiveJobs() view external returns (address [] memory _activeJobs) {
        return getJobsInternal(activeJobs, activeJobs.length );
    }

    function getAllJobs() view external returns (address[] memory _allJobs){
        require(isSecure(jobCryptAdminRole, "getAllJobs") || isSecure(jobCryptBusinessAdminRole, "getAllJobs"), " biz admin or admin only");
        return allJobs; 
    }

    function getLatestJobs() override view external returns (address [] memory _latestJobAddresses){
       
        uint256 start_; 
        uint256 end_;
        uint256 jobsLimit_ = limitsByName[latestJobDisplayLimitKey]; 
        if(latestJobs.length > jobsLimit_){

            uint256 terminalJobIndex = latestJobs.length-1; 
            start_ = terminalJobIndex;
            end_ = terminalJobIndex - (jobsLimit_-1); 
        }
        else { 
            start_ = latestJobs.length -1; 
            end_ = 0;
        }
        return getJobsInternal(start_, end_); 
    }

    function getFeaturedJobs() override view external returns (address [] memory _featuredJobs ){
        return getJobsInternal(featuredJobs, limitsByName[featuredJobDisplayLimitKey]);
    }

    function getPopularJobs() override view external returns (address [] memory _popularJobAddresses){        
        return getJobsInternal(rankingManager.getRanking( popularJobsRankingList, limitsByName[popularJobDisplayLimitKey]), limitsByName[popularJobDisplayLimitKey]);  
    }

    function getHotSearchTerms() override view external returns (string [] memory _hotSearchTerms){     
        return hotSearchTerms;
    }    
    function isStaked() override view external returns (bool _staked){
        return paymentManager.isStaked(msg.sender);
    }

    function isPaidPosting(address _posting) override view external returns(bool _paid) {
        address productAddress_ = IJobPosting(_posting).getFeatureADDRESS(postingFeatureProductKey); 
        return paymentManager.isProductPaidForPosting(_posting, productAddress_);
    }

    function notifyDelistJob(address _jobPosting) override external returns (bool _delisted) {
        require( (addressMatch(_jobPosting) && postingOnly()) || isSecure(jobCryptBusinessAdminRole, "notifyDelistJob") || isSecure(jobCryptAdminRole, "notifyDelistJob"), " postings / biz admin / admin only");
        return deList(_jobPosting);        
    }

    function postJob( address _jobPostingAddress ) override external returns (bool _posted){
        addressMatch(_jobPostingAddress); 
        postingOnly();         
    
        IJobPosting posting_ = IJobPosting(_jobPostingAddress); 
        
        // check posting paid 
        require(paymentManager.isProductPaidForPosting(_jobPostingAddress, posting_.getFeatureADDRESS(postingFeatureProductKey))," posting not paid. ");
        
        // only draft postings can be posted
        require(posting_.getStatus() == IJobPosting.PostStatus.DRAFT, " invalid post status ");

        // add to the complete record of all posts for this instance
        allJobs.push(_jobPostingAddress);
        
        // list the job for immediate display
        list(_jobPostingAddress);

        string memory companyName_ = posting_.getFeatureSTR(postingFeatureCompanyNameKey);
        // emit chain notification event 
        emit JobEvent(_jobPostingAddress, companyName_, "POST" , block.timestamp );
      
        return true; 
    }

    function repostJob(address _jobPostingAddress) override external returns (bool _reposted){
        addressMatch(_jobPostingAddress); 
        postingOnly();  
        
        IJobPosting posting_ = IJobPosting(_jobPostingAddress); 
        
        require(paymentManager.isProductPaidForPosting(_jobPostingAddress, IOpenProduct(posting_.getFeatureADDRESS(postingFeatureProductKey)).getFeatureUADDRESSValue("EXTENSION"))," repost not paid. ");
        // list the job for repost
        list(_jobPostingAddress);

        string memory companyName_ = posting_.getFeatureSTR(postingFeatureCompanyNameKey);

        emit JobEvent(_jobPostingAddress, companyName_, "REPOST" , block.timestamp );

        return true; 
    }

    function logJobApplication(address _jobApplicantAddress, address _postingAddress) override external returns (bool _logged){
        addressMatch(_postingAddress);          
        postingOnly();
        // check the job applicant is staked 
        require(paymentManager.isStaked(_jobApplicantAddress), " applicant stake required. ");  
    
        //  update dashboard stats 
        IJobSeekerDashboard jsDashboard;
        if(dashboardFactory.hasDashboard(_jobApplicantAddress, jobSeekerDashboardType)){
            jsDashboard = IJobSeekerDashboard(dashboardFactory.findDashboard(_jobApplicantAddress, jobSeekerDashboardType));
        }
        else { 
            jsDashboard = IJobSeekerDashboard(dashboardFactory.createJobSeekerDashboard(_jobApplicantAddress));  
        }

        jsDashboard.addJobApplication(_postingAddress);  
        
        updatePopularJobs(_postingAddress);
            
         // emit chain notification event 
        emit JobApplied(_postingAddress, block.timestamp, IJobPosting(_postingAddress).getFeatureUINT(postingFeatureApplicantCountKey) );

        return true; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registryCA)); // make sure this is NOT a zero address       
        searchManager           = IOpenSearch(registry.getAddress(searchManagerCA));
        rankingManager          = IOpenRanking(registry.getAddress(rankingManagerCA));       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        dashboardFactory        = IJobCryptDashboardFactory(registry.getAddress(jobSeekerDashboardFactoryCA));
        paymentManager          = IJobCryptPaymentManager(registry.getAddress(jobCryptPaymentManagerCA));

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));         
        addConfigurationItem(address(searchManager));
        addConfigurationItem(address(rankingManager));
        addConfigurationItem(address(dashboardFactory));
        addConfigurationItem(address(paymentManager));
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
        _notMigrated = trim(_notMigrated, y);
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

    function isExpired(address _posting) view internal returns (bool) {
        IJobPosting posting_ = IJobPosting(_posting); 
        return (block.timestamp > posting_.getFeatureUINT(postingFeatureExpiryDateKey));
    }

    function getJobsInternal(uint256 _start, uint256 _end)view  internal returns (address [] memory _jobs) {
        _jobs = new address[](_start-_end);
       uint256 y = 0; 
            for(uint256 x = _start; x >= _end ; x--){
                address p_ = latestJobs[x];
                IJobPosting posting_ = IJobPosting(p_);
                if(isExpired(p_) && (posting_.getStatus() == IJobPosting.PostStatus.POSTED || posting_.getStatus() == IJobPosting.PostStatus.EXTENDED )) {
                    _jobs[y] = p_; 
                    y++;
                }                                    
            }
        return _jobs; 
    }

    function getJobsInternal(address [] memory _list, uint256 _limit) view internal returns (address [] memory _jobs) {
        _jobs = new address[](_list.length);        
        uint256 y = 0; 
        for(uint256 x = 0; x < _list.length; x++) {
            if(!isExpired(_list[x])) {
                _jobs[y] = _list[x];
                y++;
                if(y >= _limit) {
                    break; 
                }
            } 
        }
        return _jobs;
    }

    function addressMatch(address _postingAddress) view internal returns (bool) {
        require(msg.sender == _postingAddress, "msg.sender <-> posting address mis-match. ");  
        return true; 
    }

    function postingOnly() view internal returns (bool) {
        require(registry.isDerivativeAddress(msg.sender) && registry.getDerivativeAddressType(msg.sender).isEqual(jobPostingType)," jobcrypt postings only");
        return true; 
    }

    function list(address _posting) internal returns (bool) {
        
        latestJobs.push(_posting);
        updateSearchTerms(_posting);
        activeJobs.push(_posting);    
        
        IJobPosting posting_ = IJobPosting(_posting);      
        IOpenProduct product = IOpenProduct(posting_.getFeatureADDRESS(postingFeatureProductKey));
        if(product.hasFeature("PRODUCT_FEATURED")){
            featuredJobs.push(_posting);
        }
        return true; 
    }

    function migrate(address _posting) internal returns (bool _migrated) {
        if(registry.isDerivativeAddress(_posting) && registry.getDerivativeAddressType(_posting).isEqual(jobPostingType)){
            allJobs.push(_posting);
            IJobPosting posting_ = IJobPosting(_posting);

            if(posting_.getStatus() != IJobPosting.PostStatus.POSTED || posting_.getStatus() != IJobPosting.PostStatus.EXTENDED){
                return false; 
            }

            if(posting_.getFeatureUINT(postingFeatureProductKey) <= block.timestamp){
                return false; 
            }

            list(_posting);
            isMigratedByAddress[_posting] = true; 
            return true; 
        }
        else { 
            return false; 
        }
    }

    function deList(address _postingAddress) internal returns (bool _deListed) {
        latestJobs = _postingAddress.remove(latestJobs);
        activeJobs = _postingAddress.remove(activeJobs); 
        featuredJobs = _postingAddress.remove(featuredJobs);
        searchManager.removeSearchableAddress(_postingAddress);
        rankingManager.removeRankedAddress(_postingAddress);
        return true; 
    }

    function pruneList(address [] memory _jobPostingList) internal returns(address [] memory _prunedList, uint256 _pruneCount){
        _prunedList = new address[](_jobPostingList.length);
        uint256 y = 0;
        uint256 z = 0; 
        uint256 timeNow = block.timestamp;
        for(uint256 x =0; x < _jobPostingList.length; x++){
            address postingAddress_ = _jobPostingList[x];
            IJobPosting posting_ = IJobPosting(postingAddress_);
            if(timeNow > (posting_.getFeatureUINT(postingFeatureProductKey))){
                IJobPostingEditor(postingAddress_).executePostingAction(IJobPosting.PostStatus.EXPIRED);  
                z++;
            } 
            else {
                _prunedList[y] = postingAddress_;
                y++; 
            }
        }
        _prunedList = trim(_prunedList, (_jobPostingList.length - z));
        return (_prunedList, z); 
    }

    function updateSearchTerms(address _jobPostingAddress) internal returns (bool) {
        IJobPosting posting_ = IJobPosting(_jobPostingAddress);
        searchManager.addSearchableAddress(_jobPostingAddress, postingCategoriesSearchField , posting_.getFeatureSTRARRAY("CATEGORY_FEATURE"));
        searchManager.addSearchableAddress(_jobPostingAddress, postingSkillsSearchField , posting_.getFeatureSTRARRAY("SKILLS_FEATURE"));
        string [] memory title_ = new string[](1);
        title_[0] =  posting_.getFeatureSTR(postingFeatureTitleKey);
        searchManager.addSearchableAddress(_jobPostingAddress, postingTitleSearchField, title_);
        string [] memory company_ = new string[](1);
        company_[0] = posting_.getFeatureSTR(postingFeatureCompanyNameKey);
        searchManager.addSearchableAddress(_jobPostingAddress, postingCompanySearchField, company_);
        string [] memory terms_ = posting_.getFeatureSTRARRAY("SEARCH_TERMS_FEATURE");        
        searchManager.addGeneralSearchTermsForAddress(_jobPostingAddress, terms_);
        return true; 
    }

    function updatePopularJobs(address _jobPostingAddress) internal returns(bool) {
        rankingManager.addAddressToRank(_jobPostingAddress, popularJobsRankingList);
        address topJob_ = rankingManager.getRanking( popularJobsRankingList, 1)[0]; 
        hotSearchTerms = IJobPosting(topJob_).getFeatureSTRARRAY("CATEGORY_FEATURE"); 
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

    function trim(address [] memory a, uint256 limit) pure internal returns (address [] memory){
        address [] memory b = new address[](limit);        
        for(uint256 x = 0; x < limit; x++) {
            b[x] = a[x];            
        }
        return b; 
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
      
        hasDefaultFunctionsByRole[jobCryptBusinessAdminRole] = true; 
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("getAllJobs");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("notifyDelistJob");

        hasDefaultFunctionsByRole[jobCryptAdminRole] = true;         
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyChangeOfAddress");
        defaultFunctionsByRole[jobCryptAdminRole].push("postMigratedJobs");
        defaultFunctionsByRole[jobCryptAdminRole].push("forceDelist");
        defaultFunctionsByRole[jobCryptAdminRole].push("pruneJobs");
        defaultFunctionsByRole[jobCryptAdminRole].push("setLimit");
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyDelistJob");

        return true; 
    }
}


