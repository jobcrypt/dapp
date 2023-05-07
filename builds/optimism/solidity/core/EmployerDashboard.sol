// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureDerivative.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/7b680903d8bb0443b9626a137e30a4d6bb1f6e43/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "../interfaces/IJobPosting.sol";
import "../interfaces/IEmployerDashboard.sol";
 /**
 * @author Tony Ushe - JobCrypt ©2023
 * @title EmployerDashboard
 * @dev  
 * 
 */
contract EmployerDashboard is OpenRolesSecureDerivative, IOpenVersion, IEmployerDashboard {

    using LOpenUtilities for address;
    using LOpenUtilities for string;

    address [] jobPostings; 

    address [] viewableJobPostings;

    address [] draftJobPostings; 

    mapping(address=>bool) removedPostingsByAddress; 

    uint256 version = 12; 
    string name = "EMPLOYER_DASHBOARD";

    address employer; 
    
    IOpenRegister registry; 
    
    string registerCA           = "RESERVED_OPEN_REGISTER_CORE";
    string roleManagerCA        = "RESERVED_OPEN_ROLES_CORE"; 

    string localDashboardViewerRole      = "LOCAL_DASHBOARD_VIEWER_ROLE";
    string localDashboardEditorRole      = "LOCAL_DASHBOARD_EDITOR_ROLE";

    string jobCryptDashboardModeratorRole    = "JOBCRYPT_DASHBOARD_MODERATOR_ROLE"; // mapped to type
    string jobCryptCoreRole                  = "JOBCRYPT_CORE_ROLE"; // mapped to type
    string jobCryptAdminRole                 = "JOBCRYPT_ADMIN_ROLE"; // mapped to type
    string jobCryptFactoryRole               = "JOBCRYPT_FACTORY_ROLE"; // mapped to type

    string dashboardType                     = "EMPLOYER_DASHBOARD_TYPE";
    string jobPostingType                    = "JOBCRYPT_JOB_POSTING_TYPE";

    constructor (address _employer, address _registryAddress)  {
        employer = _employer; 
        registry = IOpenRegister(_registryAddress);
        roleManager = IOpenRoles(registry.getAddress(roleManagerCA)); 

        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(name, self, version);
    }
    
    function getName() view external returns (string memory _name) {
        return name; 
    }

    function getVersion() view external returns (uint256 _version) {
        return version; 
    }

    function getPostings() override view external returns (address [] memory _jobPostings) {
        require(isSecure(localDashboardViewerRole, "getPostings") ||
        isSecure(localDashboardEditorRole, "getPostings"), "JC EMPLOYER DASHBOARD : getPostings : 00 - local viewer / editor only"); // employer only                 
        return viewableJobPostings; 
    }

    function getPostedJobs() override view external returns (address [] memory _jobPostings){
        return findWithStatus(IJobPosting.PostStatus.POSTED); 
    }

    function getDraftPostings() override view external returns (address [] memory _jobPostings){
        require(isSecure(localDashboardEditorRole, "getDraftPostings"), "JC EMPLOYER DASHBOARD : getDraftPostings : 00 - local editor only"); // employer only    
        return findWithStatus(IJobPosting.PostStatus.DRAFT); 
    }

    function findPostings(uint256 _startDate, uint256 _endDate) override view external returns (address [] memory _postings){
        require(isSecure(localDashboardViewerRole, "findPostings") || 
                isSecure(localDashboardEditorRole, "findPostings"), "JC EMPLOYER DASHBOARD : findPostedJobs : 00 - local viewer / editor only"); // employer only         
               
        address [] memory temp_ = new address[](jobPostings.length);
        uint256 y = 0; 
        for(uint256 x = 0; x < jobPostings.length; x++){
            IJobPosting posting = IJobPosting(jobPostings[x]);
            uint256 postingDate = posting.getFeatureUINT("POSTING_DATE_FEATURE");
            if(postingDate >= _startDate && postingDate <= _endDate){
                temp_[y] = jobPostings[x];
                y++;
            }
        }
        return trim(temp_, y);
    }

    function removePosting(address _address) external returns (bool _removed) {
        require(isSecure(localDashboardEditorRole, "removePosting"), "JC EMPLOYER DASHBOARD : getPostings : 00 - local editor only"); // employer only     
        viewableJobPostings = _address.remove(viewableJobPostings);
        return true; 
    }

    function getPostingHistory() view external returns (address [] memory _postingHistory) {
        require(isSecure(jobCryptDashboardModeratorRole, "getPostingHistory"), "JC EMPLOYER DASHBOARD : getPostings : 00 - moderator only"); // moderator only  
        return jobPostings;    
    }

    function addJobPosting(address _jobPostingAddress ) override external returns (bool _added) {   
        require(isSecure(jobCryptDashboardModeratorRole, "addJobPosting") || 
                isSecure(jobCryptCoreRole, "addJobPosting") ||
                isSecure(jobCryptFactoryRole, "addJobPosting"), "JOBCRYPT_EMPLOYER_DASHBOARD : addJobPosting : 00 - moderator / core / factory only"); // moderator         
        postingOnly(_jobPostingAddress);
        jobPostings.push(_jobPostingAddress);  
        viewableJobPostings.push(_jobPostingAddress);
        return true; 
    }          

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address               
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));  
        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));         
        return true; 
    }
    // ======================== INTERNAL ==================================

    function postingOnly(address _posting) view internal returns (bool) {
        require(registry.isDerivativeAddress(_posting) && registry.getDerivativeAddressType(_posting).isEqual(jobPostingType)," jobcrypt postings only");
        return true; 
    }


    function findWithStatus(IJobPosting.PostStatus _status) view internal returns (address [] memory _results) {
        uint256 y = 0; 
        _results = new address[](viewableJobPostings.length);
        for(uint256 x = 0; x < _results.length; x++){
            address a_ = viewableJobPostings[x];
            IJobPosting posting_ = IJobPosting(a_);
            if(posting_.getStatus() == _status) {
                _results[y] = a_;
                y++;
            }
        }
        return trim(_results, y); 
    }

    function trim(address [] memory a, uint256 limit) pure internal returns (address [] memory){
        address [] memory b = new address[](limit);        
        for(uint256 x = 0; x < limit; x++) {
            b[x] = a[x];            
        }
        return b; 
    }

}