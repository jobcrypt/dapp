// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/93764de97d40c04b150f51b92bf2a448f22fbd1f/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";
import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProductCore.sol";
import "https://github.com/Block-Star-Logic/open-bank/blob/d4d48357b75030706a7f04e8721ba84ed2be33cc/blockchain_ethereum/solidity/V2/contracts/interfaces/IOpenBank.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/f7708720af6a9821311c7b0ffa0d3858b66292c6/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol";
import "https://github.com/Block-Star-Logic/open-product/blob/f7708720af6a9821311c7b0ffa0d3858b66292c6/blockchain_ethereum/solidity/V1/interfaces/IOpenProductList.sol";

import "../interfaces/IJobPosting.sol";
import "../interfaces/IJobCryptPaymentManager.sol";
import "../interfaces/IJobCrypt.sol";
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title JobCryptPaymentManager
 * @dev 
 */
contract JobCryptPaymentManager is OpenRolesSecureCore, IOpenVersion, IOpenRolesManaged, IJobCryptPaymentManager{ 

    using LOpenUtilities for string; 
    using LOpenUtilities for address;

    string name                 = "RESERVED_JOBCRYPT_PAYMENT_MANAGER_CORE";
    uint256 version             = 27;

    IOpenRegister               registry; 
    IOpenProductCore            productManager; 
    IOpenBank                   bank; 

    string productManagerCA          = "RESERVED_OPEN_PRODUCT_CORE";
    string bankCA                    = "RESERVED_OPEN_BANK_CORE";
    string registerCA                = "RESERVED_OPEN_REGISTER_CORE";
    
    string roleManagerCA             = "RESERVED_OPEN_ROLES_CORE";

   
    
    string barredPublicUserRole      = "BARRED_PUBLIC_USER_ROLE";    
    string jobCryptBusinessAdminRole = "JOBCRYPT_BUSINESS_ADMIN_ROLE";    
    string jobCryptAdminRole         = "JOBCRYPT_ADMIN_ROLE";
    
    string jobPostingType            = "JOB_POSTING_TYPE";



    string [] defaultRoles = [barredPublicUserRole, jobCryptBusinessAdminRole, jobCryptAdminRole];

    
    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    address NATIVE_CURRENCY = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address payable private SAFE_HARBOUR = payable(0x6A4D96AAA567771e4fB64EE26170f403dCDb3aa8);
    
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

    mapping(string=>uint256) limitsByName; 
    
    bool bankingActive = false; 
    bool shutdown      = false; 

    constructor(address _registryAddress) OpenRolesSecureCore("JOBCRYPT") {
        registry                = IOpenRegister(_registryAddress);
        productManager          = IOpenProductCore(registry.getAddress(productManagerCA));
         
        address bankAddress_    = registry.getAddress(bankCA); 
        
        if(bankAddress_ != address(0)){
            bank = IOpenBank(bankAddress_);
            addConfigurationItem(address(bank));
            bankingActive = true; 
        }

        setRoleManager(registry.getAddress(roleManagerCA));
        
        addConfigurationItem(_registryAddress);   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(productManager));  
        
 
        addConfigurationItem(name, self, version);        
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

    function getPaymentData(uint256 _txRef) override view external returns (Payment memory _payment) {  
        _payment = paymentByTxRef[_txRef];  
        require(msg.sender == _payment.payer || isSecure(jobCryptBusinessAdminRole, "getPaymentData") , " payer or business admin only ");
        return _payment; 
    }

    function getPaymentDate(address _posting) override view external returns(uint256 _paymentDate) {
        return paymentByAddress[_posting].date;
    }

    function isProductPaidForPosting(address _posting, address _product) view external returns (bool _isPaid){
        return isPaidForProductByAddress[_posting][_product];
    }

    function payForPosting(address _postingAddress) override payable external returns (uint256 _txRef){
        require(!shutdown, " system shutdown ");
        require(isSecureBarring(barredPublicUserRole, "payForPosting"),"JCPM 00 - user barred.");        
        require(!isPaidPostingByAddress[_postingAddress], " posting already paid for ");
        
        IJobPosting posting_ = IJobPosting(_postingAddress);
        require(posting_.getStatus() == IJobPosting.PostStatus.DRAFT, " draft postings only ");

        address productAddress_ = posting_.getFeatureADDRESS("PRODUCT_FEATURE");
       
        _txRef = processPaymentInternal(_postingAddress, productAddress_); 
             
        // add to paid postings
        paidPostingsByOwner[posting_.getFeatureADDRESS("OWNER_FEATURE")].push(_postingAddress); 
        
        isPaidPostingByAddress[_postingAddress] = true; 
        paidPostingList.push(_postingAddress);

        return (_txRef);
    }

    function payForProductForPosting(address _postingAddress, address _productAddress) override payable external returns (uint256 _txRef){
        require(!shutdown, " system shutdown ");
        require(isSecureBarring(barredPublicUserRole, "payForProductForPosting"),"JCPM 00 - user barred.");        
        return processPaymentInternal(_postingAddress, _productAddress); 
    }

    function getPaidPostings(address _postingOwner) override view external returns (address [] memory _postingAddresses) {
        require(msg.sender == _postingOwner || isSecure(jobCryptBusinessAdminRole, "getPaidPostings"), " owner <-> sender mis-match. owner or business admin only");
        require(hasPaidPostingsByOwner[_postingOwner], " no postings ");
        return paidPostingsByOwner[_postingOwner];
    }

    function getPaymentTxRefs(address _payer) view external returns (uint256 [] memory _txRefs) {    
        require(msg.sender == _payer || isSecure(jobCryptBusinessAdminRole, "getPaymentTxRefs"), " owner <-> sender mis-match. owner or business admin only");    
        return txRefsByPayer[_payer];
    }

    //================================== BIZ ADMIN ==============================================================

    function getPaymentRefs() view external returns (uint256 [] memory _txRefs){
        require(isSecure(jobCryptBusinessAdminRole, "getPaymentRefs")," biz admin only ");
        return txRefs; 
    }

    function getAllPaidPostings() view external returns (address [] memory _paidPostings) {
        require(isSecure(jobCryptBusinessAdminRole, "getAllPaidPostings")," biz admin only ");
        return paidPostingList;
    }


    function safeWithdrawNative() external returns (bool withdrawn) {
        require(isSecure(jobCryptBusinessAdminRole, "safeWithdrawNative")," biz admin only ");
        return safeHarbourTransferNative();
    }
   
    function safeWithdraw(address _erc20Address) external returns (bool withdrawn) {
        require(isSecure(jobCryptBusinessAdminRole, "safeWithdraw")," biz admin only ");
        return safeHarbourTransfer(_erc20Address);
    }

    function withdraw() external returns (bool _withdrawn) {
        // transfer to safe harbour all monies in batches of 5 
        require(isSecure(jobCryptBusinessAdminRole, "withdraw")," biz admin only ");
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

    // ===================================================== DIT ADMIN ======================================================

    function setLimit(string memory _limit, uint256 _amount) external returns (bool _set) {
        require(isSecure(jobCryptAdminRole, "setLimit")," admin only ");
        limitsByName[_limit] = _amount; 
        return true; 
    }

    function activateBanking() external returns (bool _bankingActivated) {
        require(isSecure(jobCryptAdminRole, "activateBanking")," admin only ");
        require(address(bank) != address(0), " no bank set ");
        bankingActive = true; 
        return bankingActive; 
    }

    function deactivateBanking() external returns (bool _bankingDeactivated){
        require(isSecure(jobCryptAdminRole, "deactivateBanking")," admin only ");
        bankingActive = false; 
        return _bankingDeactivated; 
    }

    function notifyChangeOfAddress() external returns(bool _nofified) {
        require(isSecure(jobCryptAdminRole, "notifyChangeOfAddress")," admin only ");
        registry = IOpenRegister(registry.getAddress(registerCA));
        productManager = IOpenProductCore(registry.getAddress(productManagerCA));        

        setRoleManager(registry.getAddress(roleManagerCA));
        address bankAddress_    = registry.getAddress(bankCA); 
        
        if(bankAddress_ != address(0)){
            bank = IOpenBank(bankAddress_);
            addConfigurationItem(address(bank));
        }

        addConfigurationItem(address(registry));   
        addConfigurationItem(address(roleManager));   
        addConfigurationItem(address(productManager));

        
        return true; 
    }

    function shutdownPayaments() external returns (bool _shutdown) {
        require(isSecure(jobCryptAdminRole, "shutdownPayaments")," admin only ");
        shutdown = true; 
        return shutdown; 
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
            erc20_.transfer(SAFE_HARBOUR, balance_);
            return true; 
        }
        return false; 
    }
    
    function safeHarbourTransferNative() internal returns (bool ) {
        uint256 balance_ = self.balance;
        SAFE_HARBOUR.transfer(balance_);
        return true;  
    }

    // @withdraw method 
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
            safeHarbourTransferNative();    
        }
        else {             
        
            IERC20 erc20_ = IERC20(_erc20Address);
            require(erc20_.allowance(msg.sender, self) >= _fee, " insufficient ERC20 approval ");
            require(erc20_.balanceOf(msg.sender) >= _fee, " insufficient balance ");            
            erc20_.transferFrom(msg.sender, self, _fee);   
            safeHarbourTransfer(_erc20Address);         
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

    function processPaymentInternal(address _postingAddress, address _productAddress) internal returns(uint256 _txRef) {
         
        require(productManager.isVerified(_productAddress), " JCPM 01 unknown product ");

        IOpenProduct product_ = IOpenProduct(_productAddress);

        if(product_.hasFeature("PURCHASE_PERMISSIONS_LIST")){
            IOpenProductList list_ = IOpenProductList(product_.getFeatureADDRESSValue("PURCHASE_PERMISSIONS_LIST"));
            if(list_.getListType().isEqual("ALLOW")) {
                require(list_.isOnList(msg.sender), "purchase not allowed");
            }
            if(list_.getListType().isEqual("BAR")) {
                require(!list_.isOnList(msg.sender), "purchase barred");
            }
        }

        uint256 fee_             = product_.getPrice(); 
        address erc20Address_    = product_.getErc20();
        string memory reference_ = string("JOB POSTING PRODUCT : ").append(product_.getName()).append(" : ").append(toAsciiString(_postingAddress));
       
        if(bankingActive){
            _txRef = makeBankPayment(erc20Address_, fee_, reference_);
        }
        else { 
            _txRef = recievePayment(erc20Address_, fee_);
        }

        IJobPosting posting_    = IJobPosting(_postingAddress);
        address owner_          = posting_.getFeatureADDRESS("OWNER_FEATURE");
        Payment memory payment_ = Payment({
                                    payer : owner_, 
                                    posting : _postingAddress,
                                    product : _productAddress,
                                    fee : fee_,
                                    erc20 : erc20Address_,
                                    ref : reference_,
                                    date : block.timestamp
                                    });
        paymentByTxRef[_txRef]  = payment_; 
        txRefs.push(_txRef);

        isPaidForProductByAddress[_postingAddress][_productAddress] = true; 
        txRefsByPayer[owner_].push(_txRef);
        if(!hasPaidPostingsByOwner[owner_]){
            hasPaidPostingsByOwner[owner_]  = true; 
        } 
        return _txRef; 
    }
    
    function initDefaultFunctionsForRoles() internal { 
        hasDefaultFunctionsByRole[barredPublicUserRole] = true; 
        hasDefaultFunctionsByRole[jobCryptAdminRole]    = true; 
        hasDefaultFunctionsByRole[jobCryptBusinessAdminRole] = true; 
          
        defaultFunctionsByRole[jobCryptAdminRole].push("payForPosting");
        defaultFunctionsByRole[jobCryptAdminRole].push("forceUnstake");
        defaultFunctionsByRole[jobCryptAdminRole].push("forceUnstakeOwner");
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyChangeOfAddress");
        defaultFunctionsByRole[jobCryptAdminRole].push("activateBanking");
        defaultFunctionsByRole[jobCryptAdminRole].push("deactivateBanking");
        defaultFunctionsByRole[jobCryptAdminRole].push("shutdownPayaments");
        defaultFunctionsByRole[jobCryptAdminRole].push("setLimit");

        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("safeWithdraw");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("safeWithdrawNative");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("withdraw");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("getAllPaidPostings");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("getPaymentRefs");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("getPaymentTxRefs");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("getPaidPostings");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("getPaymentData");

        defaultFunctionsByRole[barredPublicUserRole].push("payForPosting");
        defaultFunctionsByRole[barredPublicUserRole].push("payForProductForPosting");
        defaultFunctionsByRole[barredPublicUserRole].push("stake");      
    }

}