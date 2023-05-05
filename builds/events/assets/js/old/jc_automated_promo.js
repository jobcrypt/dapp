
const pagePromoSpot = ge("page_promo_spot");

var munichOnline20230209 = {};
munichOnline20230209.link = "pages/promotions/munich/2023-02-09-Online-Talk.html"; 
munichOnline20230209.title = "JobCrypt Web3 & Blockchain Talks - Introduction to Blockchain Ecosystems & Mining - (Germany) - Online - 09/02/2023"; 
munichOnline20230209.startDate = 1675874700000; 
munichOnline20230209.endDate = 1675961100000; 

var liverpoolOnline20230228 = {}
liverpoolOnline20230228.link = "pages/promotions/liverpool/2023-02-28-Online-Talk.html"
liverpoolOnline20230228.title = "JobCrypt Blockchain & Web3 Talks - Introducing Blockchain Streaming and Web3 Media Ecosystems - (UK) - Online - 28/02/2023"
liverpoolOnline20230228.startDate = 1677111697000; 
liverpoolOnline20230228.endDate = 1677543525000; 

var liverpoolInPerson20230315 = {};
liverpoolInPerson20230315.link = "pages/promotions/liverpool/2023-03-16-In-Person-Talk.html"
liverpoolInPerson20230315.title = "JobCrypt Web3 & Blockchain Talks - Introducing Blockchain and Decentralized Storage - Liverpool (UK) - In Person - 15/03/2023";
liverpoolInPerson20230315.startDate = 1677629565000; 
liverpoolInPerson20230315.endDate = 1678902341000; 

var munichInPerson20230322 = {};
munichInPerson20230322.link = "pages/promotions/munich/2023-03-22-In-Person-Talk.html"
munichInPerson20230322.title = "JobCrypt Web3 & Blockchain Talks - Sustainability in Blockchain - Munich (DE) - In Person - 22/03/2023 ";
munichInPerson20230322.startDate = 1677629565000; 
munichInPerson20230322.endDate = 1679507141000; 


const events = [munichOnline20230209, liverpoolOnline20230228, liverpoolInPerson20230315, munichInPerson20230322];


function loadPromos() { 
	console.log("loading promos");
	pagePromoSpot.innerHTML = ""; 
	var table = ce("table");
	pagePromoSpot.append(table);

	var t = new Date().getTime(); 
	for(var x = 0; x < events.length; x++) {
		var event = events[x];
		var row =  table.insertRow(); 
	
		if(t > event.startDate && t < event.endDate){
			var cell = row.insertCell(); 
			var link = ce("a");
			link.setAttribute("href", event.link);
			link.setAttribute("target", "_blank");
			var font = ce("font");
			font.setAttribute("color","orange");
			font.append(text(event.title));
			link.append(font);			
			cell.append(link);
		}
	}
}

function ce(element) {
	return document.createElement(element);
}

function ge(element) {
	return document.getElementById(element);
}