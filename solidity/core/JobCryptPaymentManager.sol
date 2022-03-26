// SPDX-License-Identifier: Apache-2.0

pragma solidity >=0.8.0 <0.9.0;
/**
 * @dev 
 */
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/00f0632adcc11d981f374ff24bfc6a47ec3456af/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecure.sol";

import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol";
import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProductCore.sol";


import "../openblock/IOpenBank.sol";

import "../interfaces/IJobPosting.sol";
import "../interfaces/IJobCryptPaymentManager.sol";
import "../interfaces/IJobCrypt.sol";

contract JobCryptPaymentManager is OpenRolesSecure, IOpenRolesManaged, IJobCryptPaymentManager{ 

    using LOpenUtilities for string; 
    using LOpenUtilities for address;

    string productManagerCA     = "RESERVED_OPEN_PRODUCT_CORE";
    string bankCA               = "RESERVED_OPEN_BANK";
    string registerCA           = "RESERVED_OPEN_REGISTER";
    
    string jobcryptCA           = "RESERVED_JOBCRYPT_CORE";
    string roleManagerCA        = "RESERVED_OPEN_ROLES";
    
    string name                 = "RESERVED_JOBCRYPT_PAYMENT_MANAGER";
    uint256 version             = 3;
    IOpenRegister               registry; 
    IOpenProductCore            productManager; 
    IOpenBank                   bank; 
    IJobCrypt                   jobCrypt; 
    
    string barredPublicUserRole = "BARRED_PUBLIC_USER_ROLE";
    string coreRole             = "JOBCRYPT_CORE_ROLE"; 

    string [] defaultRoles = [barredPublicUserRole, coreRole];

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    address NATIVE_CURRENCY = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    
    mapping(address=>bool) hasPaidPostingsByOwner; 
    mapping(address=>address[]) paidPostingsByOwner; 

    mapping(address=>uint256) isPaidPostingByAddress; 

    address [] erc20Funds; 
    mapping(address=>bool) knownByERC20Address; 

    struct Payment { 
        address posting; 
        address product; 
        uint256 fee; 
        address erc20; 
        string ref;
    }

    mapping(uint256=>Payment) paymentByTxRef; 
    mapping(address=>uint256[]) txRefsByPayer;


    constructor(address _registryAddress) {
        registry = IOpenRegister(_registryAddress);
        productManager = IOpenProductCore(registry.getAddress(productManagerCA));
      //  bank = IOpenBank(registry.getAddress(bankCA));
        jobCrypt = IJobCrypt(registry.getAddress(jobcryptCA));
        setRoleManager(registry.getAddress(roleManagerCA));
        
        addConfigurationItem(registerCA, _registryAddress, 0);   
        addConfigurationItem(roleManagerCA, address(roleManager), 0);   
        addConfigurationItem(productManagerCA, address(productManager), 0);
        addConfigurationItem(jobcryptCA, address(jobCrypt), 0);
        addConfigurationItem(bankCA, address(bank), 0);

        addConfigurationItem(name, self, version);
    }
    
    function getName() override view external returns (string memory _name) {
        return name; 
    }

    function getVersion() override view external returns (uint256 _version){
        return version; 
    }

    function getDefaultRoles() override view external returns (string [] memory _roles){
        return defaultRoles; 
    }
    function hasDefaultFunctions(string memory _role) override view external returns(bool _hasFunctions){
        return hasDefaultFunctionsByRole[_role];
    }

    function getDefaultFunctions(string memory _role) override view external returns (string [] memory _functions){
        return defaultFunctionsByRole[_role];
    }

    function getPaymentData(uint256 _txRef) override view external returns (address _posting, address _product, uint256 _fee, address _erc20, string memory _reference) {
        Payment memory payment_ = paymentByTxRef[_txRef];
        return (payment_.posting, payment_.product, payment_.fee, payment_.erc20, payment_.ref);
    }   

    function payForPostingFeature(string memory _feature, address _posting) override payable external returns ( uint256 _txRef) {
        require(isSecureBarring(barredPublicUserRole, "payForPostingFeature"),"JCPM 00 - user barred");
        IJobPosting posting_ = IJobPosting(_posting);
        IOpenProduct product_ = IOpenProduct(posting_.getProduct());

        // does the product allow the feature
        require(product_.hasFeature(_feature), string(" feature : ").append(_feature).append(string("  not allowed for posting ")));

        uint256 fee_ = product_.getFeatureFee(_feature);
        address erc20Address_ = product_.getErc20();
        
        string memory reference_ = string("JOB POSTING PRODUCT : ").append(product_.getName()).append(string(" FEATURE : ").append(_feature));

        _txRef = makePayment(erc20Address_, fee_, reference_);

        // apply feature to posting
        jobCrypt.configureFeature(_feature, _posting);

        Payment memory payment_ = Payment({
                                    posting : _posting,
                                    product : posting_.getProduct(),
                                    fee : fee_,
                                    erc20 : erc20Address_,
                                    ref : reference_
                                    });
        paymentByTxRef[_txRef] = payment_; 
        txRefsByPayer[msg.sender].push(_txRef);
        return _txRef; 
    }

    function payForPosting(address _postingAddress) override payable external returns (uint256 _txRef){
        require(isSecureBarring(barredPublicUserRole, "payForPosting"),"JCPM 00 - user barred.");
        IJobPosting posting_ = IJobPosting(_postingAddress);
        address productAddress_ = posting_.getProduct();
        require(productManager.isVerified(productAddress_), " JCM 01 unknown product ");
        IOpenProduct product_ = IOpenProduct(productAddress_);
        uint256 fee_ = product_.getPrice(); 
        address erc20Address_ = product_.getErc20();
        string memory reference_ = string("JOB POSTING PRODUCT : ").append(product_.getName());
        _txRef = makePayment(erc20Address_, fee_, reference_);

        Payment memory payment_ = Payment({
                                    posting : _postingAddress,
                                    product : productAddress_,
                                    fee : fee_,
                                    erc20 : erc20Address_,
                                    ref : reference_
                                    });
        paymentByTxRef[_txRef] = payment_; 
        
        address postingOwner_ = msg.sender;
             
        // add to paid postings
        paidPostingsByOwner[postingOwner_].push(_postingAddress); 
        hasPaidPostingsByOwner[postingOwner_]  = true;  
        isPaidPostingByAddress[_postingAddress] = block.timestamp; 
        txRefsByPayer[msg.sender].push(_txRef);
        
        jobCrypt.notifyPayment(_postingAddress);
        return (_txRef);
    }

    function getPaymentTxRefs(address _payer) view external returns (uint256 [] memory _txRefs) {
        return txRefsByPayer[_payer];
    }

    function isPaid(address _posting ) override view external returns (uint256 _paidOn) {
        return isPaidPostingByAddress[_posting];
    }

    function getPaidPostings(address _postingOwner) override view external returns (address [] memory _postingAddresses) {
        require(msg.sender == _postingOwner || isSecure(coreRole, "getPaidPostings"), " owner <-> sender mis-match. owner only");
        if(hasPaidPostingsByOwner[_postingOwner]){
            return paidPostingsByOwner[_postingOwner];
        }
        _postingAddresses = new address[](0);
    
        return _postingAddresses; 
    }

    function notifyChangeOfAddress() external returns(bool _nofified) {
        registry = IOpenRegister(registry.getAddress(registerCA));
        productManager = IOpenProductCore(registry.getAddress(productManagerCA));
        bank = IOpenBank(registry.getAddress(bankCA));
        jobCrypt = IJobCrypt(registry.getAddress(jobcryptCA));
        setRoleManager(registry.getAddress(roleManagerCA));
        return true; 
    }


    function withdraw() external returns (bool _withdrawn) {
        // transfer to save harbour all monies in batches of 5 
        address safeHarbour = 0x0405A007Cf9Ef3D05E3C44058dD0A742ce1DE97C;
        uint256 batchSize = 5; 
        uint256 length_ = batchSize; 
        if(batchSize > erc20Funds.length){
            length_ = erc20Funds.length; 
        }
        
        uint256 y = 0;

        for(uint256 x = 0; x < erc20Funds.length; x++){
                IERC20 erc20_ = IERC20(erc20Funds[x]);
                uint256 balance_ = erc20_.balanceOf(self);
                if(balance_ > 0){
                    erc20_.transferFrom(self, safeHarbour, balance_);
                    y++;
                    if(y >= batchSize) {
                        break; 
                    }
                }                            
        }
        return true; 
    }

    // ======================================= INTERNAL ===========================
// @withdraw mehod 
    function makePayment(address _erc20Address, uint256 _fee, string memory _reference) internal returns (uint256 _txRef) {
        if(_erc20Address == NATIVE_CURRENCY) {
            // require(msg.value == _fee, " invalid amount transmitted ");                       
          //  bank.deposit{value : _fee}(_reference, _fee);
        }
        else {             
        
            IERC20 erc20_ = IERC20(_erc20Address);
            //require(erc20_.allowance(msg.sender, self) >= _fee, " insufficient ERC20 approval ");
           // require(erc20_.balanceOf(msg.sender) >= _fee, " insufficient balance ");
            
            erc20_.transferFrom(msg.sender, self, _fee);            
           // erc20_.approve(address(bank), _fee);
           // bank.deposit( _fee, _erc20Address, _reference);
        }
       
        if(!knownByERC20Address[_erc20Address]){
            erc20Funds.push(_erc20Address);
            knownByERC20Address[_erc20Address] = true; 
        }
        return getTXRef();
    }


    function getTXRef() view internal returns (uint256){
        return block.timestamp; 
    }

    function initDefaultFunctionsForRoles() internal { 
        hasDefaultFunctionsByRole[barredPublicUserRole] = true; 
        defaultFunctionsByRole[barredPublicUserRole].push("payForPosting");
        defaultFunctionsByRole[barredPublicUserRole].push("payForPostingFeature");

        hasDefaultFunctionsByRole[coreRole] = true; 
        defaultFunctionsByRole[coreRole].push("getPaidPostings");
    }

}