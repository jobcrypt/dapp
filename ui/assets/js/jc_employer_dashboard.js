
/*
		 <select class="ui-component-form">
									<option>Select option</option>
  DRAFT         <option>Edit</option>       <!-- edit posting   -->
  DRAFT         <option>Archive</option>    <!-- clear posting from list  -->
																	<option>Extend</option> <!-- extend posting   -->
  POSTED        <option>Fill</option>       <!-- mark posting filled   -->
  POSTED        <option>Cancel</option>     <!-- posting will may return -->
  
  EXPIRED       <option>Extend</option>     <!-- posting will continue  -->
  EXPIRED       <option>Archive</option>    <!-- posting will not be returning -->

  FILLED       <option>Archive</option>
  CANCELLED    <option>Archive</option>
  

*/

const actionResultSpan = ge("action_result_span");
const employerDashboardTable = ge("employer_dashboard_table");
const extensionModal = ge("extension_modal");


function loadPageData() { 
	getDashboard(); 
}

function getDashboard() {
	jcDashboardFactoryContract.methods.hasDashboard(account, "EMPLOYER_DASHBOARD_TYPE").call({
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
	jcDashboardFactoryContract.methods.createEmployerDashboard(account).send({
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
	jcDashboardFactoryContract.methods.findDashboard(account,"EMPLOYER_DASHBOARD_TYPE" ).call({from : account})
	.then(function(response){
		console.log(response);
		var dashboardAddress = response; 
		iEmployerDashboardContract = new web3.eth.Contract(iJCEmployerDashboardAbi, dashboardAddress);
		buildEmployerDashboardTable(iEmployerDashboardContract);
	})
	.catch(function(err){
		console.log(err);
	})
}

function buildEmployerDashboardTable(iEmployerDashboardContract) {
	iEmployerDashboardContract.methods.getPostings().call({from : account})
	.then(function(response){
		console.log(response);
		var postingAddresses = response; 
		for(var x = 0; x < postingAddresses.length; x++){
			var postingAddress = postingAddresses[x];
			buildPostingTableRow(postingAddress);
		}
	})
	.catch(function(err){
		console.log(err);
	});
}

function buildPostingTableRow(postingAddress){
	
	var row = employerDashboardTable.insertRow();

	iJobPostingContract = new web3.eth.Contract(iJCJobPostingAbi, postingAddress);

	var postingStartDateCell = row.insertCell();   
	var titleCell = row.insertCell(); 
	var applicantCountCell = row.insertCell(); 
	var expiryDateCell = row.insertCell();
	var statusCell = row.insertCell();
	var actionCell = row.insertCell(); 
	var buttonCell = row.insertCell(); 

	getStartDate(postingStartDateCell, iJobPostingContract);
	getTitle(titleCell , iJobPostingContract, postingAddress);
	getApplicantCount(applicantCountCell, iJobPostingContract);
	getExpiryDate(expiryDateCell, iJobPostingContract);
	getStatus(statusCell, iJobPostingContract, postingAddress, actionCell);        
	getActionButton(buttonCell, iJobPostingContract);

	/**
		<tr>
			<td>2021/12/01 10:00 GMT</td>
			<td>
				<a href="../app/job_detail_template.html" target="_blank"><b>DeFi Community Manager</b></a></td>
			<td>65</td>
			<td>2021/12/15 10:00 GMT</td>
			<td>ACTIVE</td>
			<td>
				<select class="ui-component-form">
					<option>Select option</option>
					<option>Edit</option> <!-- edit posting   -->
					<option>Extend</option> <!-- extend posting   -->
					<option>Fill</option> <!-- mark posting filled   -->
					<option>Cancel</option> <!-- posting will not be returning -->
					<option>Archive</option> <!-- posting will not be returning -->
			</td>
			<td> <button type="submit " class="ui-component-button ui-component-button-medium ui-component-button-primary ">Submit</button></td>

		</tr>
	*/

}




function getStartDate(cell, iJCPostingContract){
	iJobPostingContract.methods.getPostingDate().call({from : account})
	.then(function(response){
		console.log(response);
		var startDate = new Date(response*1000);
		var startDateTxt = text(formatDate(startDate));
		cell.append(startDateTxt);
	})
	.catch(function(err){
		console.log(err);
	})
	
}

function getTitle(cell, iJCPostingContract, postingAddress){
	iJobPostingContract.methods.getFeature("JOB_TITLE").call({from : account})
	.then(function(response){
		console.log(response);
		var title = response; 
		
		var titleLink = ce("a"); 
		cell.append(titleLink);

		titleLink.setAttribute("href", "../app/job_detail_template.html?postingAddress="+postingAddress);
		titleLink.setAttribute("target", "_blank"); 
				
		var titleTxt = text(title);
		titleLink.append(bold(titleTxt));
	})
	.catch(function(err){
		console.log(err);
	})

}

function getApplicantCount(cell, iJCPostingContract){
	iJobPostingContract.methods.getApplicantCount().call({from : account})
	.then(function(response){
		console.log(response);
		var applicantCount = response; 

		var applicantCountTxt = text(applicantCount);
		cell.append(applicantCountTxt);
	})
	.catch(function(err){
		console.log(err);
	})     
}

function getExpiryDate(cell, iJCPostingContract){
	iJobPostingContract.methods.getExpiryDate().call({from : account})
	.then(function(response){
		console.log(response);
		var expiryDate = new Date(response*1000);

		var expiryDateTxt = text(formatDate(expiryDate));
		cell.append(expiryDateTxt);
	})
	.catch(function(err){
		console.log(err);
	})       
}

function getStatus(cell, iJCPostingContract, postinAddress, selectCell){
	iJobPostingContract.methods.getPostingStatus().call({from : account})
	.then(function(response){
		console.log(response);
		var status = response;            
		cell.append(bold(text(status)));

		var actionSelect = ce("select");
		actionSelect.setAttribute("id", postinAddress);
		actionSelect.setAttribute("class", "form-control");
		selectCell.append(actionSelect);

		if(status === "DRAFT"){
			console.log("draft"); 
			var editOption = option("EDIT"  , "edit"); 
			var archiveOption = option("ARCHIVE", "archive"); 
			actionSelect.append(editOption);
			actionSelect.append(archiveOption);                            
		}

		if(status === "POSTED"){
			console.log("posted option");
			var fillOption = option("FILL"  , "fill"); 
			var cancelOption = option("CANCEL", "cancel"); 
			actionSelect.append(fillOption);
			actionSelect.append(cancelOption);                                    
		}

		if(status === "EXPIRED"){        
			console.log("expired"); 
			var extendOption = option("EXTEND", "extend"); 
			var archiveOption = option("ARCHIVE"  , "archive"); 
			
			actionSelect.append(extendOption); 
			actionSelect.append(archiveOption);            
		}

		if(status === "FILLED" || status === "CANCELLED" || status === "EXPIRED"   ) {
			var archiveOption = option("ARCHIVE"  , "archive");             
			actionSelect.append(archiveOption);                    
		}
	})
	.catch(function(err){
		console.log(err);
	})      
}

function getActionButton(cell, postingAddress){        
	var submitButton = ce("button");
	cell.append(submitButton) ;
	submitButton.setAttribute("type", "submit");
	submitButton.setAttribute("class","ui-component-button ui-component-button-small ui-component-button-primary");
	submitButton.setAttribute("onclick", "processAction("+postingAddress+")");
	submitButton.append(text("Action"));
}

function processAction(postingAddress){
	var action = ge(postingAddress);

	if(action === "EDIT") {
		// send to post page
		window.open("/pages/app/post.html?postingAddress="+postingAddress); 
	}
	if(action === "EXTEND") {
		// modal
		extensionModal.modal();
		
	}

	if(action === "FILL") {
		// call posting
		iJobPostingContract.methods.fillJob().send({from : account})
		.then(function(response){
			console.log(response);
			actionResultSpan.innerHTML = "FILLED :: "+ response.blockhash
		})
		.catch(function(err){
			console.log(err);
		})
	}

	if(action === "CANCEL") {
		// call posting
		iJobPostingContract.methods.cancelJob().send({from : account})
		.then(function(response){
			console.log(response);
			actionResultSpan.innerHTML = "CANCELLED :: "+ response.blockhash
		})
		.catch(function(err){
			console.log(err);
		})
	}

	if(action === "ARCHIVE") {
		// call posting 
		iJobPostingContract.methods.archive().send({from : account})
		.then(function(response){
			console.log(response);
			actionResultSpan.innerHTML = "ARCHIVED :: "+ response.blockhash
		})
		.catch(function(err){
			console.log(err);
		})
	}

}

function option(name, value) {
	var o = ce("option")
	o.setAttribute("value", value);
	o.append(text(name));

	return o; 
}
function ge(element){
	return document.getElementById(element);
}

function ce(element) {
	return document.createElement(element);
}
function text(txt) {
	return document.createTextNode(txt);
}

function bold(b) {
	var bold = document.createElement("b");
	bold.append(b);
	return bold; 
}

function formatDate(date) {
	return date.toLocaleString('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit' })
}