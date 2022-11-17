const stakeSpan = ge("stake_span");

function getStaking(root) {
	console.log("preparing staking");
	var component = ce("div");
	component.setAttribute("class", " ui-layout-column-5");
	var center = ce("center");
	component.append(center);
	var table = ce("table");
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