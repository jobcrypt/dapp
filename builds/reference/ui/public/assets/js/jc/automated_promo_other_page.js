const pagePromoSpot = ge("page_promo_spot");

function loadPromos() { 
	console.log("loading promos");
	pagePromoSpot.innerHTML = ""; 	
	var drow = ce("div");
	drow.setAttribute("class", "row");
	pagePromoSpot.append(drow);

	var t = new Date().getTime(); 

	console.log(" events :- " + jobCryptEvents.length);

	var qualifierFactor = 1; 

	for(var x = 0; x < jobCryptEvents.length; x++) {
		console.log(x);
		var jc_event = jobCryptEvents[x];
		console.log(jc_event.title);
		
		if(t > jc_event.startDate && t < jc_event.endDate){
			console.log("qualifying events " + x);
			delay = qualifierFactor * 100; 
			
			/*
			<div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="box featured">
              <h3>Introducing Blockchain and Decentralized Storage</h3>
              <h4>15th Mar 2023</h4>
              <ul>
                <li>Liverpool</li>
                <li>UK</li>
                <li>17:45 - 21:00</li>          
                <li>GMT</li>
                <li><a href="/pages/promotions/liverpool/2023-03-15-In-Person-Talk.html">Schedule</a></li>
              </ul>
              <div class="btn-wrap">
                <a href="https://www.eventbrite.com/e/529781750477" class="btn-buy">Get Tickets</a>
              </div>
            </div>
          </div>
			*/
			
			var holder = ce("div");
			drow.append(holder);

			if(1 === qualifierFactor){
				holder.setAttribute("class","col-lg-3 col-md-6");
			}
			else { 
				holder.setAttribute("class","col-lg-3 col-md-6 mt-4 mt-lg-0");
			}
			holder.setAttribute("data-aos","fade-up");
			holder.setAttribute("data-aos-delay",delay+"");

			var box = ce("div");
			if(1 === qualifierFactor) {
				console.log("featured box");
				box.setAttribute("class", "box featured");
			}
			else { 
				console.log("not featured box " + x);
				box.setAttribute("class", "box");
			}
			
			holder.append(box);

			var eDate = ce("b");
			box.append(eDate);
			eDate.append(text(jc_event.date));

			var br0 = ce("br");
			box.append(br0);

			var tktsLink = ce("a");
			box.append(tktsLink);
			tktsLink.setAttribute("href", jc_event.ticketsLink);
			tktsLink.append(text(jc_event.location));

			var br1 = ce("br");
			box.append(br1);
			
			box.append(text(jc_event.country));
			
			var br2 = ce("br");
			box.append(br2);

			
			var scheduleLink = ce("a");			
			scheduleLink.setAttribute("href", jc_event.scheduleLink);
			scheduleLink.append(jc_event.title);
			box.append(scheduleLink);

			qualifierFactor ++; 
		}
	}
}

function text(txt) {
	return document.createTextNode(txt);
}

function ce(element) {
	return document.createElement(element);
}

function ge(element) {
	return document.getElementById(element);
}
