// SPDX-License-Identifier: APACHE 2.0

pragma solidity >=0.7.0 <0.9.0;


interface IJobPostingInstantiator {

   function getPostingAddress(address _owner, address _product) external returns (address _jobPostingAddress);

}