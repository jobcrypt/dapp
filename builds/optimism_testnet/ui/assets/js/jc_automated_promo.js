
const pagePromoSpot = ge("page_promo_spot");

const promoStartDate = 1670374942000;
const promoEndDate = 1674668700000; 

function loadPromos() { 
	console.log("loading promos");
	pagePromoSpot.innerHTML = ""; 
	var t = new Date().getTime(); 

	if(t < promoEndDate){
		pagePromoSpot.innerHTML = "<a href=\"pages/promotions/munich/2023-01-25-In-Person-Talk.html\"><font color=\"orange\" target=\"_blank\"><b>JobCrypt Web3 & Blockchain Talks - Munich (Germany) - In Person - 25/01/2023</b></font></a>";
	}
}

function ge(element) {
	return document.getElementById(element);
}