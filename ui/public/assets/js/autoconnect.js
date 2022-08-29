console.log("loading core js");
/** standard elements  */
const onboardButton = document.getElementById("connect_web_3");
const showWallet = document.getElementById("showAccount");

const storage = window.sessionStorage;

var account;

// ipfs connect 

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
var PROJECT_ID      = '29AflXVfb4xEoNyHFhs2ppR8aNY';
var PROJECT_SECRET  = 'bd5f9ed6f2c41da730359d87ec7c8aa7';
var auth = Base64.encode(PROJECT_ID + ':' + PROJECT_SECRET);

var options = {}
options.apiUrl = 'https://ipfs.infura.io:5001';
options.headers = {};
options.headers.Authorization = "Basic " + auth; 

console.log(options);

const ipfs = window.IpfsHttpClientLite(options); 
const buffer = window.IpfsHttpClientLite.Buffer;
console.log("got ipfs: " + ipfs);

// chain connect 
/*
var chain = {};
chain.name = 'Celo (Alfajores Testnet)';
chain.id =  44787;
chain.rpcUrls = ['https://alfajores-forno.celo-testnet.org'];
chain.blockExplorerUrls = ['https://alfajores-blockscout.celo-testnet.org'];
var nativeCurrency = {}; 
nativeCurrency.name = 'CELO';
nativeCurrency.decimals = 18;
nativeCurrency.symbol = 'CELO';
chain.nativeCurrency = nativeCurrency; 
*/

var chain = {};
/*
chain.name = 'Optimistic Ethereum Testnet Kovan (OKOV)';
chain.id =  69;
chain.rpcUrls = ['https://kovan.optimism.io/'];
chain.blockExplorerUrls = ['https://kovan-optimistic.etherscan.io/'];
var nativeCurrency = {}; 
nativeCurrency.name = 'KOR';
nativeCurrency.decimals = 18;
nativeCurrency.symbol = 'KOR';
chain.nativeCurrency = nativeCurrency; 
*/

chain.name = 'Optimistim';
chain.id =  10;
chain.rpcUrls = ['https://mainnet.optimism.io'];
chain.blockExplorerUrls = ['https://optimistic.etherscan.io/'];
var nativeCurrency = {}; 
nativeCurrency.name = 'ETH';
nativeCurrency.decimals = 18;
nativeCurrency.symbol = 'ETH';
chain.nativeCurrency = nativeCurrency; 

var provider = "https://cloudflare-eth.com/";
var web3Provider = new Web3.providers.HttpProvider(provider);
console.log(web3Provider);

const web3 = new Web3(window.ethereum);
console.log(web3);

console.log("web 3 " + web3.currentProvider);

var sessionTimeout = 30000; // five minutes

var loadCount = 0; 
var pageloadTimeout = 5000;
var connected; 

function autoconnect() { 
	if(!connected) {
		var sessionExpiry = storage.getItem("sessionExpiry");
		if(sessionExpiry === null || sessionExpiry - Date.now > sessionTimeout){
			manualConnect();
		}
		else{ 
			loadConnect(); 
			setSessionTimeout();
		}
	}
	else { 
		loadConnect();
		setSessionTimeout();
	}	
}

function setSessionTimeout() { 
	var sessionExpiry = Date.now + sessionTimeout;
	storage.setItem("sessionExpiry", sessionExpiry);
}

function disconnect() {
	if(connected) {
		account = "";
		storage.removeItem("sessionExpiry");
		connected = false; 
		onboardButton.innerText = "Web 3 Disconnected";
		onboardButton.addEventListener('click', manualConnect);
	}
}



function loadWait() { 
    console.log("load count :: " + loadCount);
    setTimeout(loadPageData, pageloadTimeout);
    console.log("loadCount :: " + loadCount);  
}  

//Created check function to see if the MetaMask extension is installed
const isMetaMaskInstalled = () => {

    const {
        ethereum
    } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

const MetaMaskClientCheck = () => {
    //Now we check to see if Metmask is installed
    if (!isMetaMaskInstalled()) {
        console.log("metamask not installed");
        //If it isn't installed we ask the user to click to install it
        onboardButton.innerText = 'Click here to install MetaMask!';
        //When the button is clicked we call this function
        onboardButton.onclick = onClickInstall;
        //The button is now disabled
        onboardButton.disabled = false;
    } else {
        //If it is installed we change our button text
        onboardButton.innerText = 'Click to Connect Metamask';

        console.log("metamask installed");
		autoconnect(); 
    }
};
const initialize = () => {
    MetaMaskClientCheck();
};

window.addEventListener('DOMContentLoaded', initialize);

window.ethereum.on('accountsChanged', async () => {
    getAccount(); 
});

function manualConnect() { 
	onboardButton.addEventListener('click', () => {
		web3.eth.net.getId()
		.then(function(response){
			var currentChainId = response; 
			if (currentChainId !== chain.id) {                                          
				web3.currentProvider.request({
					method: 'wallet_switchEthereumChain',
					  params: [{ chainId: Web3.utils.toHex(chain.id) }],
				})
				.then(function(response){
					console.log(response);                        
					loadConnect();
				})
				.catch(function(err){
					console.log(err);
					// This error code indicates that the chain has not been added to MetaMask
					if (err.code === 4902) {
						window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
							chainName: chain.name,
							chainId: web3.utils.toHex(schain.id),
							nativeCurrency: { name: chain.nativeCurrency.name, decimals: chain.nativeCurrency.decimals, symbol: chain.nativeCurrency.symbol },
							rpcUrls: chain.rpcUrls,
							blockExplorerUrls : chain.blockExplorerUrls
							}
						]
						})
						.then(function(response){
							console.log(response);
						})
						.catch(function(err){
							console.log(err);
						});
					}

				});                    
			}
			else { 
				loadConnect();
			}
			
		})
		.catch(function(err){
			console.log(err);
		})
	   
	});
}

function loadConnect() { 
    if(!connected) {
        getAccount();
        onboardButton.innerText = "Web 3 Connected";
		onboardButton.addEventListener('click', disconnect);
		setSessionTimeout();
		connected = true; 
    }
}

async function getAccount() {
    const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    });
    account = accounts[0];
    connected = true; 
    showWallet.innerHTML = "<b>Connected Wallet :: " + account + "</b>";
    configureCoreContracts()
	.then(function(response){
		console.log(response);		
        loadWait(); 		
    })
    .catch(function(err){
        console.log(err);
    })
}

//We create a new MetaMask onboarding object to use in our app
//const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

//This will start the onboarding proccess
const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress';
    onboardButton.disabled = true;
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
};

const onClickConnect = async() => {
    try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        await ethereum.request({
            method: 'eth_requestAccounts'
        });
    } catch (error) {
        console.error(error);
    }
};