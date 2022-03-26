//"SPDX-License-Identifier: APACHE 2.0"

pragma solidity >=0.8.0 <0.9.0;


interface IJobCryptAdmin  {

    event CriticalFunctionAccess(address indexed _accessor , string indexed _function);
    
    function isAllowed(address _contract, string memory _role, string memory _function, address _sender) view external returns (bool _allowed);

    function isBarred(address _contract, string memory _role, string memory _function, address _sender) view external returns (bool _allowed);

    function isNotBarred(address _contract, string memory _role, string memory _function, address _sender) view external returns (bool _barred);

    function registerJobPosting(address _jobPostingAddress) external returns (bool _registered);

    function registerDashboard(address _dashboard, address _dashboardOwner, string memory _dashboardType) external returns (bool _registered);
    
    function getCongifurationAddress(string memory _addressName) view external returns (address _configurationAddress);

}