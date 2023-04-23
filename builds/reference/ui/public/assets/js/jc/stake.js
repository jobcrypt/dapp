const stakeSpan = ge("stake_span");

function getStaking(root) {
	stakeSpan.innerHTML = ""; 
	console.log("preparing staking");
	var component = ce("div");
	component.setAttribute("class", " icon-box aos-init aos-animate");
	component.setAttribute("data-aos", "fade-up");
	component.setAttribute("data-aos-delay","400");
	var center = ce("center");
	component.append(center);
	var table = ce("table");
	
	var titleRow = table.insertRow(); 
	var titleCell = titleRow.insertCell();
	titleCell.setAttribute("colspan", "3");
	var c = ce("center");
	var h4 = ce("h5");
	c.append(h4);
	h4.append(text("Prove you are Human Stake to Apply"));
	titleCell.append(c);

	var row = table.insertRow();


	
	var stakingFAQCell = row.insertCell(); 
	
	var a = ce("a");
	a.setAttribute("href", root+"staking.html");
	a.setAttribute("target", "_blank"); 
	var i = ce("i");
	i.setAttribute("class","fa fa-info-circle");
	i.setAttribute("title", "Staking with JobCrypt");
	a.append(i);
	stakingFAQCell.append(a);

	var approveCell = row.insertCell(); 
	var approveSpan = ce("span");
	approveSpan.setAttribute("id", "stake_approve_span");
	approveCell.append(approveSpan);

	var stakeCell = row.insertCell(); 	
	var stakeButtonSpan = ce("span");
	stakeButtonSpan.setAttribute("id", "stake_button_span");
	stakeCell.append(stakeButtonSpan);
	
	center.append(table);

	var centerStatus = ce("center");
	var small = ce("small");
	var stakeStatusSpan = ce("span");
	stakeStatusSpan.setAttribute("id", "stake_status_span");
	small.append(stakeStatusSpan);
	centerStatus.append(small);
	component.append(centerStatus);
	stakeSpan.append(component);
}

function ge(element){
	return document.getElementById(element);
}

function ce(element) {
	return document.createElement(element);
}