// SPDX-License-Identifier: Apache-2.0

pragma solidity >=0.8.0 <0.9.0;
/**
 * @dev 
 */
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

import "https://github.com/Block-Star-Logic/open-roles/blob/fc410fe170ac2d608ea53e3760c8691e3c5b550e/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";

import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol";
import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProductCore.sol";

import "https://github.com/Block-Star-Logic/open-roles/blob/e7813857f186df0043c84f0cca42478584abe09c/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecure.sol";
import "https://github.com/Block-Star-Logic/open-bank/blob/d4d48357b75030706a7f04e8721ba84ed2be33cc/blockchain_ethereum/solidity/V2/contracts/interfaces/IOpenBank.sol";

import "../interfaces/IJobPosting.sol";
import "../interfaces/IJobCryptPaymentManager.sol";
import "../interfaces/IJobCrypt.sol";

contract JobCryptPaymentManager is OpenRolesSecure, IOpenRolesManaged, IJobCryptPaymentManager{ 

    using LOpenUtilities for string; 
    using LOpenUtilities for address;

    string name                 = "RESERVED_JOBCRYPT_PAYMENT_MANAGER";
    uint256 version             = 7;

    IOpenRegister               registry; 
    IOpenProductCore            productManager; 
    IOpenBank                   bank; 
    IJobCrypt                   jobCrypt; 

    string productManagerCA     = "RESERVED_OPEN_PRODUCT_CORE";
    string bankCA               = "RESERVED_OPEN_BANK_CORE";
    string registerCA           = "RESERVED_OPEN_REGISTER_CORE";
    
    string jobcryptCA           = "RESERVED_JOBCRYPT_CORE";
    string roleManagerCA        = "RESERVED_OPEN_ROLES_CORE";

    string stakeErc20CA         = "JOBCRYPT_STAKE_ERC20_CA";
    
    string barredPublicUserRole = "BARRED_PUBLIC_USER_ROLE";
    string coreRole             = "JOBCRYPT_CORE_ROLE"; 
    string jobcryptBusinessRole = "JOBCRYPT_BUSINESS_ROLE";
    string jobCryptAdminRole    = "JOBCRYPT_ADMIN_ROLE";
    string barredUserRole       = "JOBCRYPT_BARRED_USER_ROLE";

  
    string jobPostingType       = "JOB_POSTING_TYPE";

    string stakeLimitKey        = "STAKE_LIMIT_KEY";

    bool NATIVE_STAKING         = false; 

    string [] defaultRoles = [barredPublicUserRole, coreRole, jobcryptBusinessRole, jobCryptAdminRole, barredUserRole];

    address stakeErc20Address; 

    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    address NATIVE_CURRENCY = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address private SAFE_HARBOUR = 0x0405A007Cf9Ef3D05E3C44058dD0A742ce1DE97C;
    
    mapping(address=>bool) hasPaidPostingsByOwner; 
    mapping(address=>address[]) paidPostingsByOwner; 

    address [] paidPostingList;
    mapping(address=>bool) isPaidPostingByAddress; 

    mapping(address=>mapping(address=>bool)) isPaidForProductByAddress; 

    uint256 [] txRefs; 

    address [] erc20Funds; 
    mapping(address=>bool) knownByERC20Address; 


    mapping(address=>Payment) paymentByAddress; 
    mapping(uint256=>Payment) paymentByTxRef; 
    mapping(address=>uint256[]) txRefsByPayer;

    
    address [] stakedUsers; 
    mapping(address=>uint256) stakeAmountsByAddress; 

    mapping(string=>uint256) limitsByName; 
    
    bool bankingActive = false; 

    ProductPostingPayment [] productPostingPaymentList;

    constructor(address _registryAddress) {
        registry                = IOpenRegister(_registryAddress);
        productManager          = IOpenProductCore(registry.getAddress(productManagerCA));
        stakeErc20Address       = registry.getAddress(stakeErc20CA);
        if(stakeErc20Address == NATIVE_CURRENCY){
            NATIVE_STAKING = true; 
        }      
        address bankAddress_    = registry.getAddress(bankCA); 
        
        if(bankAddress_ != address(0)){
            bank = IOpenBank(bankAddress_);
            addConfigurationItem(address(bank));
            bankingActive = true; 
        }


        jobCrypt = IJobCrypt(registry.getAddress(jobcryptCA));
        setRoleManager(registry.getAddress(roleManagerCA));
        
        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(productManager));
        addConfigurationItem(address(jobCrypt));    
        
        addConfigurationItem(stakeErc20CA, stakeErc20Address, 0);
        addConfigurationItem(name, self, version);
        initLimitDefaults();
        initDefaultFunctionsForRoles();
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

    function getStakeErc20Address() override view external returns (address _erc20){
        return stakeErc20Address; 
    }

    function getMinimumStakeAmount() override view external returns (uint256 _amount) {
        return limitsByName[stakeLimitKey];
    }

    function getStakedAmount() override view external returns(uint256 _stakedAmount) {
        return stakeAmountsByAddress[msg.sender]; 
    }

    function getPaymentData(uint256 _txRef) override view external returns (Payment memory _payment) {    
        require(isSecureBarring(barredPublicUserRole, "getPaymentData"),"JCPM 00 - user barred.");   
        _payment = paymentByTxRef[_txRef];
        if(msg.sender == _payment.payer || isSecure(jobcryptBusinessRole, "getPaymentData") ){
            return  _payment; 
        }      
        return Payment({
            payer   : address(0), 
            posting : address(0),
            product : address(0),
            fee     : 0,
            erc20   : address(0),
            ref     : "",
            date    : 0
        });
    }

    function whenPaid(address _posting) override view external returns(uint256 _paymentDate) {
        return paymentByAddress[_posting].date;
    }


    function isPaid(address _posting ) override view external returns (bool _isPaid) {
        return isPaidPostingByAddress[_posting];
    }

    function getPaidPostings(address _postingOwner) override view external returns (address [] memory _postingAddresses) {
        require(msg.sender == _postingOwner || isSecure(jobcryptBusinessRole, "getPaidPostings"), " owner <-> sender mis-match. owner or admin only");
        if(hasPaidPostingsByOwner[_postingOwner]){
            return paidPostingsByOwner[_postingOwner];
        }
        _postingAddresses = new address[](0);
    
        return _postingAddresses; 
    }

    function getPaymentTxRefs(address _payer) view external returns (uint256 [] memory _txRefs) {    
        require(msg.sender == _payer || isSecure(jobcryptBusinessRole, "getPaymentTxRefs"), " owner <-> sender mis-match. owner or admin only");    
        return txRefsByPayer[_payer];
    }


    function getPaymentRefs() view external returns (uint256 [] memory _txRefs){
        require(isSecure(jobcryptBusinessRole, "getPaymentRefs")," admin only ");
        return txRefs; 
    }

    function stake(uint256 _amount) override payable external returns (bool _staked){
        require(isSecureBarring(barredUserRole, "stake"), " user barred ");
        return stakeInternal(msg.sender, _amount); 
    }

    function unstake() override external returns (uint256 _unstakedAmount) {
        return unstakeInternal(msg.sender);
    }

    function payForPosting(address _postingAddress) override payable external returns (uint256 _txRef){
        require(isSecureBarring(barredPublicUserRole, "payForPosting"),"JCPM 00 - user barred.");        
        require(!isPaidPostingByAddress[_postingAddress], " posting already paid for ");
        

        IJobPosting posting_ = IJobPosting(_postingAddress);
        require(posting_.getPostingStatus().isEqual("DRAFT") , " draft postings only ");

        address productAddress_ = posting_.getProduct();
       
        _txRef = processPaymentInternal(_postingAddress, productAddress_); 
             
        // add to paid postings
        paidPostingsByOwner[posting_.getOwner()].push(_postingAddress); 
        hasPaidPostingsByOwner[posting_.getOwner()]  = true;  
        isPaidPostingByAddress[_postingAddress] = true; 
        txRefsByPayer[posting_.getOwner()].push(_txRef);
        paidPostingList.push(_postingAddress);
        jobCrypt.notifyPayment(_postingAddress);
        return (_txRef);
    }

    function payForProductForPosting(address _postingAddress, address _productAddress) override payable external returns (uint256 _txRef){
        require(isSecureBarring(barredPublicUserRole, "payForPosting"),"JCPM 00 - user barred.");        
        require(jobCrypt.isPaidPosting(_postingAddress), " no paid postings, pay for posting then add product ");
        _txRef = processPaymentInternal(_postingAddress, _productAddress); 
        isPaidForProductByAddress[_postingAddress][_productAddress] = true; 
        ProductPostingPayment memory productPostingPayment_ = ProductPostingPayment({
            productAddress :_productAddress,
            postingAddress : _postingAddress,
            paymentDate : block.timestamp,
            txRef : _txRef
        });
        productPostingPaymentList.push(productPostingPayment_);
        jobCrypt.notifyProductPayment(_postingAddress, _productAddress);
        return _txRef; 
    }

    function isProductPaidForPosting(address _posting, address _product) view external returns (bool _isPaid){
        return isPaidForProductByAddress[_posting][_product];
    }


    function setLimit(string memory _limit, uint256 _amount) external returns (bool _set) {
        limitsByName[_limit] = _amount; 
        return true; 
    }

    function deactivateBanking() external returns (bool _bankingDeactivated){
        require(isSecure(jobCryptAdminRole, "getPaymentRefs")," admin only ");
        bankingActive = false; 
        return _bankingDeactivated; 
    }


    function notifyChangeOfAddress() external returns(bool _nofified) {
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");
        registry = IOpenRegister(registry.getAddress(registerCA));
        productManager = IOpenProductCore(registry.getAddress(productManagerCA));        
        jobCrypt = IJobCrypt(registry.getAddress(jobcryptCA));
        setRoleManager(registry.getAddress(roleManagerCA));
        address bankAddress_    = registry.getAddress(bankCA); 
        stakeErc20Address       = registry.getAddress(stakeErc20CA); 
        if(stakeErc20Address == NATIVE_CURRENCY){
            NATIVE_STAKING = true; 
        } 
        if(bankAddress_ != address(0)){
            bank = IOpenBank(bankAddress_);
            addConfigurationItem(address(bank));
            bankingActive = true; 
        }

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(productManager));
        addConfigurationItem(address(jobCrypt));
        addConfigurationItem(stakeErc20CA, stakeErc20Address, 0);
        return true; 
    }


    function safeWithdraw(address _erc20Address) external returns (bool withdrawn) {
        require(isSecure(jobCryptAdminRole, "safeWithdraw")," admin only ");
        return safeHarbourTransfer(_erc20Address);
    }


    function withdraw() external returns (bool _withdrawn) {
        // transfer to safe harbour all monies in batches of 5 
        require(isSecure(jobCryptAdminRole, "withdraw")," admin only ");
        uint256 batchSize = 5; 
        uint256 length_ = batchSize; 
        if(batchSize > erc20Funds.length){
            length_ = erc20Funds.length; 
        }
        
        uint256 y = 0;
        for(uint256 x = 0; x < erc20Funds.length; x++){
            if(safeHarbourTransfer(erc20Funds[x])){
                y++;
                if(y >= batchSize){
                    break; 
                }
            }                        
        }
        return true; 
    }

    function syncJobCrypt() external returns (bool _synced){
        for(uint x = 0; x < paidPostingList.length; x++){
            address posting_ = paidPostingList[x];
            jobCrypt.notifyPayment(posting_);
        }
        for(uint y = 0; y < stakedUsers.length; y++){
            address user_ = stakedUsers[y];
            jobCrypt.notifyUserStaked(user_, true);
        }

        for(uint256 z = 0; z < productPostingPaymentList.length ;z++){
             ProductPostingPayment memory productPostingPayment_ = productPostingPaymentList[z];
             jobCrypt.notifyProductPayment(productPostingPayment_.postingAddress, productPostingPayment_.productAddress);
        }

        return true; 
    }

    function forceUnstake() external returns (uint256 _unstakedUserCount, uint256 _stakedUserCount) {   
        require(isSecure(jobCryptAdminRole, "forceUnstake")," admin only ");      
        _stakedUserCount = stakedUsers.length; 
        for(uint256 x = 0; x < stakedUsers.length; x++) {
            address stakedUser = stakedUsers[x];
            unstakeInternal(stakedUser);
            _unstakedUserCount++;
        }
        return (_unstakedUserCount, _stakedUserCount); 
    }

    function forceUnstakeOwner(address _owner) external returns (uint256 _unstakedAmount) {   
        require(isSecure(jobCryptAdminRole, "forceUnstakeOwner")," admin only ");      
        return unstakeInternal(_owner);
    }
    // ======================================= INTERNAL ===========================
    
    function toAsciiString(address x) pure internal returns (string memory) {

        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(abi.encodePacked("0x",s));
    }


    function char(bytes1 b) pure internal returns (bytes1 c) {

        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    function safeHarbourTransfer(address _erc20) internal returns (bool ) {
        IERC20 erc20_ = IERC20(_erc20);
        uint256 balance_ = erc20_.balanceOf(self);
        if(balance_ > 0){
            erc20_.transferFrom(self, SAFE_HARBOUR, balance_);
            return true; 
        }
        return false; 
    }
    
    
    // @withdraw mehod 
    function makeBankPayment(address _erc20Address, uint256 _fee, string memory _reference) internal returns (uint256 _txRef) {
        if(_erc20Address == NATIVE_CURRENCY) {
            require(msg.value >= _fee, " invalid amount transmitted ");                       
            bank.deposit{value : _fee}(_fee, NATIVE_CURRENCY, _reference);
        }
        else {             
        
            IERC20 erc20_ = IERC20(_erc20Address);
            require(erc20_.allowance(msg.sender, self) >= _fee, " insufficient ERC20 approval ");
            require(erc20_.balanceOf(msg.sender) >= _fee, " insufficient balance ");
            
            erc20_.transferFrom(msg.sender, self, _fee);            
            erc20_.approve(address(bank), _fee);
            bank.deposit( _fee, _erc20Address, _reference);
        }
       
        if(!knownByERC20Address[_erc20Address]){
            erc20Funds.push(_erc20Address);
            knownByERC20Address[_erc20Address] = true; 
        }
        return getTXRef();
    }

    function recievePayment(address _erc20Address, uint256 _fee) internal returns (uint256 _txRef) {
        if(_erc20Address == NATIVE_CURRENCY) {
            require(msg.value >= _fee, " invalid amount transmitted ");                               
        }
        else {             
        
            IERC20 erc20_ = IERC20(_erc20Address);
            require(erc20_.allowance(msg.sender, self) >= _fee, " insufficient ERC20 approval ");
            require(erc20_.balanceOf(msg.sender) >= _fee, " insufficient balance ");            
            erc20_.transferFrom(msg.sender, self, _fee);            
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

    function stakeInternal(address _owner, uint256 _amount) internal returns (bool) {        
        require(stakeAmountsByAddress[_owner] == 0, " already staked ");
        if(NATIVE_STAKING) {
            require(msg.value >= _amount, " sent value <-> declared value mis-match "); 
            require(_amount >= limitsByName[stakeLimitKey], " in sufficient stake ");
            stakeAmountsByAddress[_owner] = msg.value; 
          
        }
        else {
            IERC20 erc20 = IERC20(stakeErc20Address);
            require(erc20.allowance(_owner, self) >= _amount, " insufficient approval ");
            erc20.transferFrom(_owner, self, _amount);
            stakeAmountsByAddress[_owner] = _amount; 
        }
        stakedUsers.push(_owner);      
        jobCrypt.notifyUserStaked(_owner, true);
        return true; 
    }

    function unstakeInternal(address _owner) internal returns (uint256 _unstakedAmount) {        
        _unstakedAmount = stakeAmountsByAddress[_owner];
        if(_unstakedAmount > 0){
            stakeAmountsByAddress[_owner] -= _unstakedAmount; 
            if(NATIVE_STAKING){
                address payable leaver = payable(_owner);
                leaver.transfer(_unstakedAmount);
            }
            else {
                IERC20 erc20_ = IERC20(stakeErc20Address);
                erc20_.transfer(_owner, _unstakedAmount);
            }
            stakedUsers = _owner.remove(stakedUsers);
            jobCrypt.notifyUserStaked(_owner, false); 
        }
        return _unstakedAmount; 
    }
    

    function processPaymentInternal(address _postingAddress, address _productAddress) internal returns(uint256 _txRef) {
         
        require(productManager.isVerified(_productAddress), " JCPM 01 unknown product ");
        
        IOpenProduct product_ = IOpenProduct(_productAddress);
        uint256 fee_ = product_.getPrice(); 
        address erc20Address_ = product_.getErc20();
        string memory reference_ = string("JOB POSTING PRODUCT : ").append(product_.getName()).append(" : ").append(toAsciiString(_postingAddress));
        if(bankingActive){
            _txRef = makeBankPayment(erc20Address_, fee_, reference_);
        }
        else { 
            _txRef =recievePayment(erc20Address_, fee_);
        }
        IJobPosting posting_ = IJobPosting(_postingAddress);
        Payment memory payment_ = Payment({
                                    payer : posting_.getOwner(), 
                                    posting : _postingAddress,
                                    product : _productAddress,
                                    fee : fee_,
                                    erc20 : erc20Address_,
                                    ref : reference_,
                                    date : block.timestamp
                                    });
        paymentByTxRef[_txRef] = payment_; 
        txRefs.push(_txRef);
        return _txRef; 
    }


    function initLimitDefaults() internal { 
        limitsByName[stakeLimitKey] = 1000000000000000000; 
    }
    function initDefaultFunctionsForRoles() internal { 
        hasDefaultFunctionsByRole[barredPublicUserRole] = true; 
        defaultFunctionsByRole[barredPublicUserRole].push("payForPosting");
        defaultFunctionsByRole[barredPublicUserRole].push("payForPostingFeature");

        hasDefaultFunctionsByRole[coreRole] = true; 
        defaultFunctionsByRole[coreRole].push("getPaidPostings");
    }

}