console.log("loading core js");

const IPFS = "https://jobcrypt.infura-ipfs.io/ipfs/";

/** standard elements  */
const onboardButton = ge("connect_web_3");

const showWallet = ge("showAccount");
const removeElement = ge("home_not_connected");
const heroElement = ge("hero");

const connectVideoLinkSpan = ge("connect_video_link_span");
const connectVideoIconSpan = ge("connect_video_icon_span");
const getStartedButtonSpan = ge("get_started_button_span");
const startPointSpan = ge("start_point_span");

const storage = window.sessionStorage;

function ge(element) {
  return document.getElementById(element);
}

var account;

// chain connect
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

chain.name = "Sepolia test network";
chain.id = 11155111;
chain.rpcUrls = ["https://sepolia.infura.io/v3/"];
chain.blockExplorerUrls = ["https://sepolia.etherscan.io"];
var nativeCurrency = {};
nativeCurrency.name = "SepoliaETH";
nativeCurrency.decimals = 18;
nativeCurrency.symbol = "SepoliaETH";
chain.nativeCurrency = nativeCurrency;

// chain.name 				= 'Optimistim';
// chain.id 				= 10;
// chain.rpcUrls 			= ['https://mainnet.optimism.io'];
// chain.blockExplorerUrls = ['https://optimistic.etherscan.io/'];
// var nativeCurrency 		= {};
// nativeCurrency.name 	= 'ETH';
// nativeCurrency.decimals = 18;
// nativeCurrency.symbol 	= 'ETH';
// chain.nativeCurrency 	= nativeCurrency;

const web3 = new Web3(window.ethereum);
console.log(web3);

console.log("web 3 " + web3.currentProvider);

var sessionTimeout = 30000; // five minutes

var loadCount = 0;
var pageloadTimeout = 5000;
var connected;

function autoconnect() {
  if (!connected) {
    var sessionExpiry = storage.getItem("sessionExpiry");
    if (sessionExpiry === null || sessionExpiry - Date.now > sessionTimeout) {
      manualConnect();
    } else {
      loadConnect();
      setSessionTimeout();
    }
  } else {
    loadConnect();

    setSessionTimeout();
  }
}

function setSessionTimeout() {
  var sessionExpiry = Date.now + sessionTimeout;
  storage.setItem("sessionExpiry", sessionExpiry);
}

function disconnect() {
  if (connected) {
    account = "";
    storage.removeItem("sessionExpiry");
    connected = false;
    onboardButton.innerText = "Web 3 Disconnected";
    onboardButton.setAttribute(
      "class",
      "cursor-pointer text-black my-4 bg-jcBlue font-thin rounded-full text-xs whitespace-nowrap px-4 py-2 bg-opacity-90"
    );

    onboardButton.addEventListener("click", manualConnect);
  }
}

function loadWait() {
  console.log("load count :: " + loadCount);
  setTimeout(loadPageData, pageloadTimeout);
  console.log("loadCount :: " + loadCount);
}

//Created check function to see if the MetaMask extension is installed
const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

const metamaskDownloadUrl = "https://metamask.io/download/";
function startOnboarding() {
  window.open(metamaskDownloadUrl, "_blank");
}

//This will start the onboarding proccess
const onClickInstall = () => {
  onboardButton.innerText = "Onboarding in progress";
  onboardButton.setAttribute(
    "class",
    "cursor-pointer text-black my-4 bg-jcBlue font-thin rounded-full text-xs whitespace-nowrap px-4 py-2 bg-opacity-90"
  );

  onboardButton.disabled = true;
  //On this object we have startOnboarding which will start the onboarding process for our end user
  startOnboarding();
};

const MetaMaskClientCheck = () => {
  //Now we check to see if Metmask is installed

  if (!isMetaMaskInstalled()) {
    console.log("metamask not installed");
    //If it isn't installed we ask the user to click to install it
    onboardButton.innerText = "Click here to install MetaMask!";
    onboardButton.setAttribute(
      "class",
      "cursor-pointer text-black my-4 bg-jcBlue font-thin rounded-full text-xs whitespace-nowrap px-4 py-2 bg-opacity-90"
    );

    //When the button is clicked we call this function
    onboardButton.onclick = onClickInstall;
    //The button is now disabled
    onboardButton.disabled = false;
    setInstallPlayList();
  } else {
    //If it is installed we change our button text
    onboardButton.disabled = false;
    onboardButton.setAttribute(
      "class",
      "cursor-pointer text-black my-4 bg-jcBlue font-thin rounded-full text-xs whitespace-nowrap px-4 py-2 bg-opacity-90"
    );
    onboardButton.innerText = "Click to Connect Metamask";

    console.log("metamask installed");
    autoconnect();
  }
};

function clearVideos() {
  connectVideoLinkSpan.innerHTML = "";
  connectVideoIconSpan.innerHTML = "";
  startPointSpan.innerHTML = "";
}

const howToUseJobCrypt =
  "https://www.youtube.com/playlist?list=PLdG1qxRmiG9N_RcS8E0Rmx5n4v0RnEOLL";
const howToInstallMetamaskPlaylist =
  "https://www.youtube.com/playlist?list=PLdG1qxRmiG9P0Aihaauq8zSre8es_y_iH";

function createVideoLink(link, txt, font) {
  var a = ce("a");
  a.setAttribute("href", link);
  a.setAttribute("target", "_blank");
  a.setAttribute("class", "glightbox btn-watch-video");
  if (txt != "") {
    font.append(text(txt));
    a.append(font);
  }
  return a;
}

function createVideoIcon(link, font) {
  var i = ce("i");
  i.setAttribute("class", "fa-brands fa-youtube");
  font.append(i);
  a = createVideoLink(link, "");
  a.append(font);
  return a;
}

function getColoredNode(color) {
  var font = ce("font");
  font.setAttribute("color", color);
  return font;
}

const o1installMetamaskText = "Click here to Install Metamask to Begin";
const o2watchHowToInstallMetamaskVideoText =
  "Watch this video on how to install Metamask";

const o3connectMetamaskText = "Click here to Connect Metamask to Begin";
const o4watchHowToConnectMetamaskVideoText =
  "Watch this video on how to Connect Metamask to Blockchain";

const o5getStartedText = "";
const o6howtoUseJobCrypt = "How to use JobCrypt";

function setInstallPlayList() {
  clearVideos();

  var button = ce("a");
  button.setAttribute("href", "https://metamask.io/download/");
  button.setAttribute("class", "btn-get-started");
  button.append(text(o1installMetamaskText));

  getStartedButtonSpan.innerHTML = "";
  getStartedButtonSpan.append(button);

  var f = getColoredNode("white");
  connectVideoLinkSpan.append(
    createVideoLink(
      howToInstallMetamaskPlaylist,
      o2watchHowToInstallMetamaskVideoText,
      f
    )
  );

  var c = getColoredNode("white");
  connectVideoIconSpan.append(createVideoIcon(howToInstallMetamaskPlaylist, c));
}

function setHowToPlayList() {
  clearVideos();

  var button = ce("a");
  button.setAttribute("href", "#featured-jobs");
  button.setAttribute("class", "btn-get-started scrollto");
  button.append(text(o5getStartedText));

  getStartedButtonSpan.innerHTML = "";
  getStartedButtonSpan.append(button);

  var f = getColoredNode("white");
  connectVideoLinkSpan.append(
    createVideoLink(howToUseJobCrypt, o6howtoUseJobCrypt, f)
  );
  var c = getColoredNode("white");
  connectVideoIconSpan.append(createVideoIcon(howToUseJobCrypt, c));
}

const initialize = () => {
  MetaMaskClientCheck();
};

window.addEventListener("DOMContentLoaded", initialize);

window.ethereum.on("accountsChanged", async () => {
  getAccount();
});

function manualConnect() {
  onboardButton.addEventListener("click", () => {
    web3.eth.net
      .getId()
      .then(function (response) {
        var currentChainId = response;
        if (currentChainId !== chain.id) {
          web3.currentProvider
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: Web3.utils.toHex(chain.id) }],
            })
            .then(function (response) {
              console.log(response);
              loadConnect();
            })
            .catch(function (err) {
              console.log(err);
              // This error code indicates that the chain has not been added to MetaMask
              if (err.code === 4902) {
                window.ethereum
                  .request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainName: chain.name,
                        chainId: web3.utils.toHex(schain.id),
                        nativeCurrency: {
                          name: chain.nativeCurrency.name,
                          decimals: chain.nativeCurrency.decimals,
                          symbol: chain.nativeCurrency.symbol,
                        },
                        rpcUrls: chain.rpcUrls,
                        blockExplorerUrls: chain.blockExplorerUrls,
                      },
                    ],
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (err) {
                    console.log(err);
                  });
              }
            });
        } else {
          loadConnect();
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}

function loadConnect() {
  if (!connected) {
    getAccount();
    onboardButton.innerText = "Web 3 Connected";
    onboardButton.setAttribute(
      "class",
      "cursor-pointer text-black my-4 bg-jcBlue font-thin rounded-full text-xs whitespace-nowrap px-4 py-2 bg-opacity-90"
    );

    onboardButton.addEventListener("click", disconnect);
    removeElement.remove();
    setSessionTimeout();
    connected = true;
  }
}

abbrev_name = function (str1) {
  var split_names = str1.trim().split(" ");
  if (split_names.length > 1) {
    return split_names[0] + " " + split_names[1].charAt(0) + ".";
  }
  return split_names[0];
};

async function getAccount() {
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  account = accounts[0];
  connected = true;
  showWallet.innerHTML =
    "Connected Wallet :: " + abbrev_name(account) + "<br/>";
  setHowToPlayList();
  configureCoreContracts()
    .then(function (response) {
      console.log(response);
      loadWait();
    })
    .catch(function (err) {
      console.log(err);
    });
}

const onClickConnect = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    await ethereum.request({
      method: "eth_requestAccounts",
    });
  } catch (error) {
    console.error(error);
  }
};
