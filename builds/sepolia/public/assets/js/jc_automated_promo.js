
const pagePromoSpot = ge("front_page_promo_spot");

const promoStartDate = 1668115939000;
const promoEndDate = 1669147200000; 

function loadPromos() { 
	console.log("loading promos");
	pagePromoSpot.innerHTML = ""; 
	var t = new Date().getTime(); 

	if(t < promoEndDate){
		pagePromoSpot.innerHTML = "<a href=\"pages/promotions/munich/2022-11-22-Online-Talk.html\"><b>JobCrypt Online Talk 22-11-2022</b></a>";
	}
}

function ge(element) {
	return document.getElementById(element);
}