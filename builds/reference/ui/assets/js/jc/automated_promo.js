const pagePromoSpot = ge("page_promo_spot");

function loadPromos() { 
	console.log("loading promos");
	pagePromoSpot.innerHTML = ""; 	
	

	var t = new Date().getTime(); 

	console.log(" events :- " + jobCryptEvents.length);

	var qualifierFactor = 1; 

	for(var x = 0; x < jobCryptEvents.length; x++) {
		console.log(x);
		var jc_event = jobCryptEvents[x];
		
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
			pagePromoSpot.append(holder);

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
			var h3 = ce("h3");
			h3.append(text(jc_event.title));
			box.append(h3);

			var h4 = ce("h4");
			box.append(h4);
			h4.append(text(jc_event.date));

			var ul = ce("ul");
			box.append(ul);

			var location 	= ce("li");
			ul.append(location);
			location.append(text(jc_event.location));

			var country 	= ce("li");
			ul.append(country);
			country.append(text(jc_event.country));

			var tyme 		= ce("li");
			ul.append(tyme);
			tyme.append(text(jc_event.startTime +" - "+jc_event.endTime));

			var timezone 	= ce("li");
			ul.append(timezone);
			timezone.append(text(jc_event.timezone));

			var schedule 	= ce("li");
			ul.append(schedule);
			var link = ce("a");
			schedule.append(link);
			link.setAttribute("href", jc_event.scheduleLink);
			link.append(text("Schedule"));

			var tkts = ce("div");
			box.append(tkts);
			tkts.setAttribute("class", "btn-wrap");

			var tktsLink = ce("a");
			tkts.append(tktsLink);

			tktsLink.setAttribute("href",jc_event.ticketsLink);
			tktsLink.setAttribute("class", "btn-buy");
			tktsLink.append(text("Get Tickets"));
			
			qualifierFactor ++; 
		}
	}
}

function ce(element) {
	return document.createElement(element);
}

function ge(element) {
	return document.getElementById(element);
}
