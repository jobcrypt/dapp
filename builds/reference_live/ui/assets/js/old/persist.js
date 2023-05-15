// ipfs connect 
const px 			= "32gRYwh36BEdK7HufbWmyDsD2Q4P2fT9Q9yCgsmKGpJoghRdyt9mynndPpUQhA5vkfMgXFC6kTQ0zKjBR0czwrwNY341voDv1wah"; 
const ipid 			= "U2FsdGVkX1/BRWcf69vfyEuPoyPPv76lxeITlpe+lLRVkUpvlPPGHB9V/gv2F3+g"; 
const ips 			= "U2FsdGVkX1+6ANshPPH82m5ApGpfUwR8c4Xnssfc8VunGy2ocrzHpoEn6t+p7UBy0mFO+W+djcSbR9fJ6pACJw=="; 

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
var auth = Base64.encode(getToken());

var options = {}
options.apiUrl = 'https://ipfs.infura.io:5001';
options.headers = {};
options.headers.Authorization = "Basic " + auth; 

console.log(options);

const ipfs = window.IpfsHttpClientLite(options); 
const buffer = window.IpfsHttpClientLite.Buffer;
console.log("got ipfs: " + ipfs);

function getToken(){
	return d(ipid) + ':' + d(ips); 
}

function d(v) {
	return CryptoJS.AES.decrypt(v, px).toString(CryptoJS.enc.Utf8); 
}