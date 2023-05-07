// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/7b680903d8bb0443b9626a137e30a4d6bb1f6e43/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureDerivative.sol";
 
import "../interfaces/IJobSeekerDashboard.sol";
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title JobPostingInstantiator
 * @dev 
 */
contract JobSeekerDashboard is OpenRolesSecureDerivative, IOpenVersion, IJobSeekerDashboard {

    using LOpenUtilities for address; 
    using LOpenUtilities for string; 

    uint256 version             = 11; 
    string name                 = "JOB_SEEKER_DASHBOARD";

    string registerCA           = "RESERVED_OPEN_REGISTER_CORE";
    string roleManagerCA        = "RESERVED_OPEN_ROLES_CORE"; 

    address [] appliedPostings; 
    address [] viewableAppliedPostings; 

    IOpenRegister registry; 

    address jobSeeker; 
 
    string localViewerRole      = "LOCAL_DASHBOARD_VIEWER_ROLE";
    string localEditorRole      = "LOCAL_DASHBOARD_EDITOR_ROLE";
    
    string jobCryptDashboardModeratorRole   = "JOBCRYPT_DASHBOARD_MODERATOR_ROLE";    // mapped to type
    string jobCryptFactoryRole              = "JOBCRYPT_FACTORY_ROLE";  // mapped to type
    string jobcryptAdminRole                = "JOBCRYPT_ADMIN_ROLE";  // mapped to type
    
    string dashboardType        = "JOBSEEKER_DASHBOARD_TYPE";
    string jobPostingType       = "JOBCRYPT_JOB_POSTING_TYPE";

    constructor(address _jobSeeker, address _registryAddress) {
        jobSeeker = _jobSeeker;         
        registry = IOpenRegister(_registryAddress);
        setRoleManager(registry.getAddress(roleManagerCA));

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

    function getAppliedJobs() override view external returns (address [] memory _appliedJobAddresses){
        require(isSecure(localViewerRole, "getAppliedJobs") ||
                isSecure(localEditorRole, "getAppliedJobs"), "JC JOBSEEKER DASHBOARD : getAppliedJobs : 00 - Local Viewer Role only"); // job seeker only 
        return viewableAppliedPostings; 
    }

    function removeAppliedJob(address _appliedJob) external returns (bool _removed){
        require(isSecure(localEditorRole, "removeAppliedJob"), "JC JOBSEEKER DASHBOARD : removeAppliedJob : 00 - Local Editor Role only"); // job seeker only 
        viewableAppliedPostings = _appliedJob.remove(viewableAppliedPostings);
        return true; 
    }

    function addJobApplication(address _jobPosting) override external returns (bool _added){
        require(isSecure(jobCryptDashboardModeratorRole, "addJobApplication") ||
                isSecure(jobCryptFactoryRole, "addJobApplication"), "JC JOBSEEKER DASHBOARD : addJobApplication : 00 - moderator or core only ");     
        postingOnly(_jobPosting);   
        appliedPostings.push(_jobPosting);
        viewableAppliedPostings.push(_jobPosting);
        return true; 
    }
   
    function getApplicationHistory() view external returns (address [] memory _postingHistory) {
        require(isSecure(jobCryptDashboardModeratorRole, "getApplicationHistory"), "JC EMPLOYER DASHBOARD : getApplicationHistory : 00 - moderator only "); // employer only  
        return appliedPostings;    
    }

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(jobcryptAdminRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address       
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));
        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));  
        return true; 
    }

    // ======================== INTERNAL ==================================


    function postingOnly(address _posting) view internal returns (bool) {
        require(registry.isDerivativeAddress(_posting) && registry.getDerivativeAddressType(_posting).isEqual(jobPostingType)," postings only");
        return true; 
    }
    
}