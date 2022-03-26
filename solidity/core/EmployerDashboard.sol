// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0 <0.9.0;

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRoles.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/00f0632adcc11d981f374ff24bfc6a47ec3456af/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecure.sol";

import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "../interfaces/IJobPosting.sol";
import "../interfaces/IEmployerDashboard.sol";

contract EmployerDashboard is OpenRolesSecure, IEmployerDashboard {

    using LOpenUtilities for address;
    using LOpenUtilities for string;

    address [] jobPostings; 

    address [] viewableJobPostings; 

    address [] postedJobs; 

    address [] draftJobPostings; 

    mapping(address=>bool) removedPostingsByAddress; 

    uint256 version = 4; 
    string name = "EMPLOYER_DASHBOARD";

    address employer; 
    
    IOpenRegister registry; 
    
    string registerCA           = "RESERVED_OPEN_REGISTER";
    string roleManagerCA        = "RESERVED_OPEN_ROLES"; 

    string localViewerRole      = "LOCAL_DASHBOARD_VIEWER_ROLE";
    string localEditorRole      = "LOCAL_DASHBOARD_EDITOR_ROLE";
    string localModeratorRole   = "LOCAL_MODERATOR_ROLE";
    string coreRole             = "JOBCRYPT_CORE_ROLE"; 

    string dashboardType        = "EMPLOYER_DASHBOARD_TYPE";

    constructor (address _employer, address _registryAddress)  {
        employer = _employer; 
        self = address(this);
        registry = IOpenRegister(_registryAddress);
        roleManager = IOpenRoles(registry.getAddress(roleManagerCA)); 

        addConfigurationItem(registerCA, _registryAddress, 0);   
        addConfigurationItem(roleManagerCA, address(roleManager), 0);   
        addConfigurationItem(name, self, version);
    }
    
    function getPostings() override view external returns (address [] memory _jobPostings) {
        require(isSecure(localViewerRole, "getPostings"), "JC EMPLOYER DASHBOARD : getPostings : 00 - local viewer only"); // employer only                 
        return viewableJobPostings; 
    }

    function getPostedJobs() override view external returns (address [] memory _jobPostings) {
        return postedJobs;
    }

    function getDraftPostings() override view external returns (address [] memory _jobPostings){
        return draftJobPostings; 
    }

    function removePosting(address _address) external returns (bool _removed) {
        require(isSecure(localEditorRole, "removePosting"), "JC EMPLOYER DASHBOARD : getPostings : 00 - local editor only"); // employer only     
        viewableJobPostings = _address.remove(viewableJobPostings);
        return true; 
    }

    function getPostingHistory() view external returns (address [] memory _postingHistory) {
        require(isSecure(localModeratorRole, "getPostingHistory"), "JC EMPLOYER DASHBOARD : getPostings : 00 - local moderator only"); // employer only  
        return jobPostings;    
    }

    function findPostedJobs(uint256 _startDate, uint256 _endDate) override view external returns (address [] memory _postedJobs){
        require(isSecure(localViewerRole, "findPostedJobs"), "JC EMPLOYER DASHBOARD : findPostedJobs : 00 - local viewer only"); // employer only         
              
        address [] memory temp_ = new address[](jobPostings.length);
        uint256 y = 0; 
        for(uint256 x = 0; x < jobPostings.length; x++){
            IJobPosting posting = IJobPosting(jobPostings[x]);
            uint256 postingDate = posting.getPostingDate();
            if(postingDate >= _startDate && postingDate <= _endDate){
                temp_[y] = jobPostings[x];
                y++;
            }
        }
        
        _postedJobs = new address[](y);
        for(uint256 c = 0; c < y ; c++){
            _postedJobs[c] = temp_[c];
        }
        return _postedJobs;
    }

    function addJobPosting(address _jobPostingAddress ) override external returns (bool _added) {   
        require(isSecure(localModeratorRole, "addJobPosting"), "JOBCRYPT_EMPLOYER_DASHBOARD : addJobPosting : 00 - local moderator only"); // moderator  
        jobPostings.push(_jobPostingAddress);  
        IJobPosting posting = IJobPosting(_jobPostingAddress);
        string memory status_ = posting.getPostingStatus(); 
        if(status_.isEqual("DRAFT")) {
            draftJobPostings.push(_jobPostingAddress);
        }
        viewableJobPostings.push(_jobPostingAddress);
        return true; 
    }          

    function notifyChangeOfAddress() external returns (bool _recieved){
        require(isSecure(coreRole, "notifyChangeOfAddress")," admin only ");    
        registry                = IOpenRegister(registry.getAddress(registerCA)); // make sure this is NOT a zero address               
        roleManager             = IOpenRoles(registry.getAddress(roleManagerCA));        
        return true; 
    }
    // ======================== INTERNAL ==================================

}