const pagePromoSpot = ge("page_promo_spot");
const calendarUrl = "https://events.jobcrypt.com/data/jc_annual_calendar.json"; 


function fetchPromos() {

	fetch(calendarUrl)
	.then(function(response) {
		console.log(response);
		return response.text();
	})
	.then(function(text) {
		console.log(text);
		var jcEvents = JSON.parse(text);
		console.log(jcEvents);
		loadPromos(jcEvents)
	 })
	 .catch(function(err) {
		console.log(err);
	});
}


function loadPromos(jcEvents) {
  console.log("loading promos");
  pagePromoSpot.innerHTML = "";

  var d = ce("div");
  d.setAttribute("class","row");
  pagePromoSpot.append(d);

  var t = new Date().getTime();

  console.log(" events :- " + jcEvents.length);

  var qualifierFactor = 1;

  for (var x = 0; x < jcEvents.length; x++) {
    console.log(x);
    var event = jcEvents[x];
	console.log(event);
	console.log(event["start-date"]);

    if (t > event["start-date"] && t < event["end-date"]) {
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
      d.append(holder);

      if (1 === qualifierFactor) {
        holder.setAttribute("class", "col-lg-3 col-md-6");
      } else {
        holder.setAttribute("class", "col-lg-3 col-md-6 mt-4 mt-lg-0");
      }
      holder.setAttribute("data-aos", "fade-up");
      holder.setAttribute("data-aos-delay", delay + "");

      var box = ce("div");
      if (1 === qualifierFactor) {
        console.log("featured box");
        box.setAttribute("class", "box featured");
      } else {
        console.log("not featured box " + x);
        box.setAttribute("class", "box");
      }
      holder.append(box);
      var h3 = ce("h5");
      h3.append(text(event.title));
      box.append(h3);

      var h4 = ce("h4");
      box.append(h4);
      h4.append(text(event.date));

      var ul = ce("ul");
      box.append(ul);

      var location = ce("li");
      ul.append(location);
      location.append(text(event.location));

      var country = ce("li");
      ul.append(country);
      country.append(text(event.country));

      var tyme = ce("li");
      ul.append(tyme);
      tyme.append(text(event["start-time"] + " - " + event["end-time"]));

      var timezone = ce("li");
      ul.append(timezone);
      timezone.append(text(event["time-zone"]));

      var schedule = ce("li");
      ul.append(schedule);
      var link = ce("a");
      schedule.append(link);
      link.setAttribute("href", event["link"]);
      link.append(text("Schedule"));
      console.log(event["schedule-link"] + "");
      var tkts = ce("div");
      box.append(tkts);
      tkts.setAttribute("class", "btn-wrap");

      var tktsLink = ce("a");
      tkts.append(tktsLink);

      tktsLink.setAttribute("href", event["tickets-link"]);
      tktsLink.setAttribute("class", "btn-buy");
      tktsLink.append(text(event["button-text"]));

      qualifierFactor++;
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
