const applicantDashboardTable = ge("applicant_dashboard_table");
var iJobSeekerDashboardContract;  

function loadPageData() {
	getDashboard(); 
}

function getDashboard() {
	jcDashboardFactoryContract.methods.hasDashboard(account, "JOBSEEKER_DASHBOARD_TYPE").call({
			from: account
		})
		.then(function(response) {
			if (response === true) {
				findDashboard(); 
			} else {
				createDashboard();
			}
		})
		.catch(function(err) {
			console.log(err);
		});
}

function createDashboard() {
	jcDashboardFactoryContract.methods.createJobSeekerDashboard(account).send({
			from: account
		})
		.then(function(response) {
			console.log(response);
			getDashboard();
		})
		.catch(function(err) {
			console.log(err);
		})
}

function findDashboard() { 
	jcDashboardFactoryContract.methods.findDashboard(account,"JOBSEEKER_DASHBOARD_TYPE" ).call({from : account})
	.then(function(response){
		console.log(response);
		var dashboardAddress = response; 
		iJobSeekerDashboardContract = new web3.eth.Contract(iJCJobSeekerDashboardAbi, dashboardAddress);
		buildAppliantDashboardTable();
	})
	.catch(function(err){
		console.log(err);
	})
}



function buildAppliantDashboardTable() {
	clearTableLeaveHeader(applicantDashboardTable);
	// get all application posts 
	iJobSeekerDashboardContract.methods.getAppliedJobs().call({
			from: account
		})
		.then(function(response) {
			console.log(response);
			var applications = response;
			for (var x = 0; x < applications.length; x++) {
				var postingAddress = applications[x];
				addApplicationRow(postingAddress);
			}
		})
		.catch(function(err) {
			console.log(err);
		});

}

function addApplicationRow(postingAddress) {
	var applicantRow = applicantDashboardTable.insertRow();
	var applicationDateCell = applicantRow.insertCell();
	var titleCell = applicantRow.insertCell();
	var applicationLink = applicantRow.insertCell();
	var applicantCountCell = applicantRow.insertCell();
	var jobStatusCell = applicantRow.insertCell();

	iJobPostingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);

	iJobPostingContract.methods.getApplicantData(account).call({
			from: account
		})
		.then(function(response) {
			console.log(response);
			var applicantData = response;

			var dateTxt = applicantData.applicationDate;
			applicationDateCell.append(text(formatTime(dateTxt)));

			var applicationLinkTxt = applicantData.link;
			applicationLink.append(text(applicationLinkTxt));

		})
		.catch(function(err) {
			console.log(err);
		})

	iJobPostingContract.methods.getFeature("JOB_TITLE").call({
			from: account
		})
		.then(function(response) {
			console.log(response);
			var title = response; 
			var a = ahref(); 
			a.setAttribute("href", "/pages/app/job_detail_template.html?postingAddress="+postingAddress);
			a.append(text(title));
			
			titleCell.append(bold(a));
		})
		.catch(function(err) {
			console.log(err);
		})

	iJobPostingContract.methods.getApplicantCount().call({
			from: account
		})
		.then(function(response) {
			console.log(response);
			applicantCountCell.append(center(text(response)));
		})
		.catch(function(err) {
			console.log(err);
		})

	iJobPostingContract.methods.getPostingStatus().call({
			from: account
		})
		.then(function(response) {
			console.log(response);
			jobStatusCell.append(text(response));

		})
		.catch(function(err) {
			console.log(err);
		})
		// 
		/*
			<tr>
				<td>2021 /12/06 11:00</td>
				<td><a href="../app/job_detail_template.html" target="_blank"><b>DeFi Community Manager</b></a></td>
				<td>
					<center>65</center>
				</td>
				<td>Open</td>
			</tr>
		*/
}

function clearTableLeaveHeader(table) {
	var len = table.rows.length;
	if(len === 1 || len === 0){
		return; 
	}
	for (var x = 1; x < len; x++) {
		table.rows[1].remove();
	}
}

function formatDate(date) {
	return date.toLocaleString('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit' })
}

function formatTime(seconds){
	return formatDate(new Date(seconds * 1000));
}

function ge(element){
	return document.getElementById(element);
}

function text(txt) {
	return document.createTextNode(txt);        
}

function ahref() {
	return document.createElement("a");
}

function bold(node) {
	var bold = document.createElement("b");
	bold.append(node);
	return bold;
}

function center(node){
	var c = document.createElement("center");
	c.append(node);
	return c; 
}