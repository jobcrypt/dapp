// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/8177c4620e049b2749c2069651d7d5b4691e23d2/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/8177c4620e049b2749c2069651d7d5b4691e23d2/contracts/utils/Strings.sol";
import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/93764de97d40c04b150f51b92bf2a448f22fbd1f/blockchain_ethereum/solidity/v2/contracts/interfaces/IOpenRolesManaged.sol";
import "https://github.com/Block-Star-Logic/open-roles/blob/732f4f476d87bece7e53bd0873076771e90da7d5/blockchain_ethereum/solidity/v2/contracts/core/OpenRolesSecureCore.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/85c0a12e23b69c71a0c256938f6084cfdf651c77/blockchain_ethereum/solidity/V1/interfaces/IOpenRegister.sol";
import "https://github.com/Block-Star-Logic/open-product/blob/b373f7f6ec11876bdd0aad863e0a80d6bbdef9d9/blockchain_ethereum/solidity/V1/interfaces/IOpenProductCore.sol";
import "https://github.com/Block-Star-Logic/open-bank/blob/d4d48357b75030706a7f04e8721ba84ed2be33cc/blockchain_ethereum/solidity/V2/contracts/interfaces/IOpenBank.sol";

import "https://github.com/Block-Star-Logic/open-product/blob/f7708720af6a9821311c7b0ffa0d3858b66292c6/blockchain_ethereum/solidity/V1/interfaces/IOpenProduct.sol";
import "https://github.com/Block-Star-Logic/open-product/blob/f7708720af6a9821311c7b0ffa0d3858b66292c6/blockchain_ethereum/solidity/V1/interfaces/IOpenProductList.sol";

import "../interfaces/IJobCryptVSPaymentManager.sol";
/**
 * @author Tony Ushe - JobCrypt ©2023
 * @title JobCryptVerificationServicePaymentManager
 * @dev 
 */
contract JobCryptVerificationServicePaymentManager is OpenRolesSecureCore, IJobCryptVSPaymentManager, IOpenVersion, IOpenRolesManaged { 

    using LOpenUtilities for string; 
    using LOpenUtilities for address;
    using Strings for uint256;

    string constant name                 = "RESERVED_JOBCRYPT_VERIFICATION_SERVICE_PAYMENT_MANAGER_CORE";
    uint256 constant version             = 3;

    IOpenRegister               registry; 
    IOpenProductCore            productManager; 
    IOpenBank                   bank; 

    string constant productManagerCA          = "RESERVED_OPEN_PRODUCT_CORE";
    string constant bankCA                    = "RESERVED_OPEN_BANK_CORE";
    string constant registerCA                = "RESERVED_OPEN_REGISTER_CORE";
    
    string constant roleManagerCA             = "RESERVED_OPEN_ROLES_CORE";
   
    string constant barredPublicUserRole      = "BARRED_PUBLIC_USER_ROLE";    
    string constant jobCryptBusinessAdminRole = "JOBCRYPT_BUSINESS_ADMIN_ROLE";    
    string constant jobCryptAdminRole         = "JOBCRYPT_ADMIN_ROLE";

    string [] defaultRoles = [barredPublicUserRole, jobCryptBusinessAdminRole, jobCryptAdminRole];

    
    mapping(string=>bool) hasDefaultFunctionsByRole;
    mapping(string=>string[]) defaultFunctionsByRole;

    address NATIVE_CURRENCY                 = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address payable private SAFE_HARBOUR    = payable(0x6A4D96AAA567771e4fB64EE26170f403dCDb3aa8);

    mapping(string=>uint256) limitsByName; 
    
    bool bankingActive = false; 
    bool shutdown      = false; 

    address [] erc20Funds; 
    mapping(address=>bool) knownErc20Address;   

    mapping(string=>bool) supportedSymbols; 

    string [] allPaymentRefs; 
    uint256[] allBankingRefs; 
    
    mapping(address=>bool) hasPaymentReferencesByPayer; 
    mapping(address=>string[]) paymentReferencesByPayer; 
    mapping(address=>mapping(string=>bool)) isPaymentReferenceOwnerByOwner;          

    mapping(string=>VSPaymentTicket) paymentTicketByReference; 

    mapping(uint256=>string) paymentTicketReferenceByBankingRef; 

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
        initDefaultSupportedSymbols();
        initDefaultFunctionsForRoles();
    }
    
    function getName() override pure external returns (string memory _name) {
        return name; 
    }

    function getVersion() override pure external returns (uint256 _version){
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
    function getPayerPayments() view external returns (VSPaymentTicket [] memory _payments){
        return getPaymentsForPayerInternal(msg.sender);
    }

    function isReferenceOwner(string memory _reference, address _address) view external returns (bool _isOwner){
        return isPaymentReferenceOwnerByOwner[_address][_reference];
    }

    function getPaymentTicket(string memory _ref) view external returns (VSPaymentTicket memory _payment){
        return paymentTicketByReference[_ref];
    }           

    function payForVerificationService(address _erc20, address _product) payable external returns (string memory _ref){
        require(!shutdown, " system shutdown ");
        require(isSecureBarring(barredPublicUserRole, "payForVerificationService"),"JCVSPM 00 - user barred.");                
        _ref = processPaymentInternal(_erc20, _product); 
        return _ref;
    }

    //================================== BIZ ADMIN ==============================================================

    function getPaymentsForPayer(address _payer) view external returns (VSPaymentTicket [] memory _payments){
        require(isSecure(jobCryptBusinessAdminRole, "getPaymentsForPayer")," biz admin only ");        
        if(hasPaymentReferencesByPayer[_payer]){
            return getPaymentsForPayerInternal(_payer);
        }        
        return _payments;
    }

    function getAllPaymentReferences() view external returns (string [] memory _paymentReferences) {
        require(isSecure(jobCryptBusinessAdminRole, "getAllPaymentReferences")," biz admin only ");
        return allPaymentRefs; 
    }
    
    function getAllBankingReferences() view external returns (uint256 [] memory _bankingReference) {
        require(isSecure(jobCryptBusinessAdminRole, "getAllBankingReferences")," biz admin only ");
        return allBankingRefs; 
    }

    function setSupportedPaymentSymbols(string [] memory _symbols, bool _supported) external returns (bool _set){
        require(isSecure(jobCryptBusinessAdminRole, "setSupportedPaymentSymbols")," biz admin only ");
        return setSymbolSupport(_symbols, _supported);
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

    function shutdownPayments() external returns (bool _shutdown) {
        require(isSecure(jobCryptAdminRole, "shutdownPayaments")," admin only ");
        shutdown = true; 
        return shutdown; 
    }

    // ======================================= INTERNAL ===========================
    function setSymbolSupport(string [] memory _symbols, bool _supported) internal returns (bool _set) {
        for(uint256 x = 0; x < _symbols.length; x++) {
            supportedSymbols[_symbols[x]]  = _supported;  
        }
        return true;
    }

    function getPaymentsForPayerInternal(address _payer) view internal returns (VSPaymentTicket [] memory _payments){
         string [] memory refs = paymentReferencesByPayer[_payer];
        return resolve(refs);
    }

    function resolve(string [] memory _paymentReferences) view internal returns (VSPaymentTicket [] memory _payments) {
        _payments = new VSPaymentTicket[](_paymentReferences.length);
        for( uint256 x = 0; x < _paymentReferences.length; x++) {
            _payments[x] = paymentTicketByReference[_paymentReferences[x]];
        }
        return _payments; 
    }

    
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
       
        if(!knownErc20Address[_erc20Address]){
            erc20Funds.push(_erc20Address);
            knownErc20Address[_erc20Address] = true; 
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
       
        if(!knownErc20Address[_erc20Address]){
            erc20Funds.push(_erc20Address);
            knownErc20Address[_erc20Address] = true; 
        }
        return getTXRef();
    }

    function getTXRef() view internal returns (uint256){
        return block.timestamp; 
    }

    function processPaymentInternal(address _paymentErc20, address _productAddress) internal returns(string memory _reference) {
        address payer_ = msg.sender; 
        require(productManager.isVerified(_productAddress), " JCVSPM 01 unknown product ");

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

        if(erc20Address_ != _paymentErc20){
            string memory symbol_ = IERC20Metadata(_paymentErc20).symbol();
            require(supportedSymbols[symbol_], "unsupported payment currency");
            erc20Address_ = _paymentErc20;              
        } 

        _reference = string("JCVSP:").append(product_.getName()).append(":").append((block.timestamp.toString())).append(":").append(toAsciiString(payer_));
       allPaymentRefs.push(_reference);

       uint256 _bankingRef = 0; 
        if(bankingActive){
            _bankingRef = makeBankPayment(erc20Address_, fee_, _reference);
        }
        else { 
            _bankingRef = recievePayment(erc20Address_, fee_);
        }

        VSPaymentTicket memory ticket_ = VSPaymentTicket({
                                                            payer       : payer_,
                                                            ref         : _reference, 
                                                            product     : _productAddress, 
                                                            fee         : fee_, 
                                                            erc20       : erc20Address_,
                                                            date        : block.timestamp,
                                                            bankingRef  : _bankingRef
                                                        });
        if(!hasPaymentReferencesByPayer[payer_]) {
            hasPaymentReferencesByPayer[payer_] = true; 
        }     
        paymentReferencesByPayer[payer_].push(_reference);
        isPaymentReferenceOwnerByOwner[payer_][_reference]  = true;                                                   
        paymentTicketByReference[_reference]                = ticket_;
        paymentTicketReferenceByBankingRef[_bankingRef]     = _reference; 

        allBankingRefs.push(_bankingRef);
                   
        return _reference; 
    }


    function initDefaultSupportedSymbols() internal returns (bool _set) { 
        string [] memory defaultSupportedSymbols_ = new string[](3);
        defaultSupportedSymbols_[0] = "USDC" ;
        defaultSupportedSymbols_[1] = "USDT" ;
        defaultSupportedSymbols_[2] = "DAI" ;
        setSymbolSupport(defaultSupportedSymbols_, true); 
        return true; 
    }
    
    function initDefaultFunctionsForRoles() internal { 
        hasDefaultFunctionsByRole[barredPublicUserRole] = true; 
        hasDefaultFunctionsByRole[jobCryptAdminRole]    = true; 
        hasDefaultFunctionsByRole[jobCryptBusinessAdminRole] = true; 
          
        defaultFunctionsByRole[jobCryptAdminRole].push("notifyChangeOfAddress");
        defaultFunctionsByRole[jobCryptAdminRole].push("activateBanking");
        defaultFunctionsByRole[jobCryptAdminRole].push("deactivateBanking");
        defaultFunctionsByRole[jobCryptAdminRole].push("shutdownPayments");
        defaultFunctionsByRole[jobCryptAdminRole].push("setLimit");

        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("getPaymentsForPayer");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("safeWithdraw");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("safeWithdrawNative");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("withdraw");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("getAllBankingReferences");
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("getAllPaymentReferences");   
        defaultFunctionsByRole[jobCryptBusinessAdminRole].push("setSupportedPaymentSymbols");     

        defaultFunctionsByRole[barredPublicUserRole].push("payForVerificationService");
    }

}
