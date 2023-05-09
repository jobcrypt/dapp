

import classes from '../styles/routes/TermsOfServiceRoute.module.css';
import backArrow from '../assets/back.png';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import ReadyToStart from '../components/ReadyToStart';


const TermsOfServiceRoute = () =>{
    const navigate = useNavigate();


    useLayoutEffect(()=>{
        document.getElementById('cookie').scrollIntoView({ behavior: 'smooth' });
    },[]);

    const openUrl = (url) =>{
        let URL = url;
        // if(!url.startsWith('http://' || !url.startsWith('https://'))){
        //     URL = 'https://'+url;
        // }
        window.open(URL)
      }

    const style={
        color: '#be8e24',
        cursor: 'pointer'
    }

    return(
        <section className={classes.parent} id='cookie'>
            <header className={classes.header}>
                <img src={backArrow} alt='' onClick={()=>navigate('/')} />
                <h1>JobCrypt Website Terms & Conditions</h1>
            </header>
            <main className={classes.main}>
                <h1>Website Term</h1>
                <p>These terms and conditions (the "Terms and Conditions") govern the use of https://www.jobcrypt.com (the "Site"). This Site is owned and operated by JobCrypt. This Site is an ecommerce website. By using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.</p>
                <p style={{ marginTop: '30px', fontSize: '20px' }}>THESE TERMS AND CONDITIONS CONTAIN A DISPUTE RESOLUTION CLAUSE THAT IMPACTS YOUR RIGHTS ABOUT HOW TO RESOLVE DISPUTES. PLEASE READ IT CAREFULLY.</p>
            </main>
            <main className={classes.main}>
                <h1>Intellectual Property</h1>
                <p>All content published and made available on our Site is the property of JobCrypt and the Site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site.</p>
            </main>
            <main className={classes.main}>
                <h1>Age Restrictions</h1>
                <p>The minimum age to use our Site is 18 years old. By using this Site, users agree that they are over 18 years old. We do not assume any legal responsibility for false statements about age.</p>
            </main>
            <main className={classes.main}>
                <h1>Acceptable Use</h1>
                <p>As a user of our Site, you agree to use our Site legally, not to use our Site for illegal purposes, and not to:</p>
                <ul className={classes.ul}>
                    <li>Harass or mistreat other users of our Site</li>
                    <li>Violate the rights of other users of our Site</li>
                    <li>Violate the intellectual property rights of the Site owners or any third party to the Site</li>
                    <li>Hack into the account of another user of the Site</li>
                    <li>Hack or in any other way disrupt the operations of the site</li>
                    <li>Act in any way that could be considered fraudulent or</li>
                    <li>Post any material that may be deemed inappropriate or offensive.</li>
                </ul>
                <p>If we believe you are using our Site illegally or in a manner that violates these Terms and Conditions, we reserve the right to limit, suspend or terminate your access to our Site. We also reserve the right to take any legal steps necessary to prevent you from accessing our Site.</p>
            </main>
            <main className={classes.main}>
                <h1>User Contribution</h1>
                <p>Users may post the following information on our Site:</p>
                <ul className={classes.ul}>
                    <li>Photos</li>
                    <li>Comments</li>
                    <li>Job Listings</li>
                </ul>
                <p>By posting publicly on our Site, you agree to all posted content being stored on public blockchain and open decentralized storage. By posting publicly on our Site, you further agree not to act illegally or violate these Terms and Conditions.</p>
            </main>
            <main className={classes.main}>
                <h1>Accounts</h1>
                <p>When you create an account on our Site, you agree to the following:</p>
                <ul className={classes.ul}>
                    <li>You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account; and</li>
                    <li>All personal information you provide to us through your account is up to date, accurate, and truthful and that you will update your personal information if it changes.</li>
                </ul>
                <p>We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.</p>
            </main>
            <main className={classes.main}>
                <h1>Sales of goods and services</h1>
                <p>These Terms and Conditions govern the sale of goods and services available on our Site. The following goods are available on our Site:</p>
                <ul className={classes.ul}>
                    <li>Decentralized Job Listing.</li>
                </ul>
                 <p style={{ marginTop: '0px'}}>We are under a legal duty to supply goods that match the description of the good(s) you order on our Site..</p>
                {/* <br/><br/> */}
                <ul className={classes.ul}>
                    <li>Managed Job Listing.</li>
                    <li>Credential Verification.</li>
                </ul>
                <p>The services will be paid for in full when the services are ordered.</p>
                <p>These Terms and Conditions apply to all the goods and services that are displayed on our Site at the time you access it. This includes all products listed as being out of stock. All information, descriptions, or images that we provide about our goods and services are as accurate as possible. However, we are not legally bound by such information, descriptions, or images as we cannot guarantee the accuracy of all goods and services we provide. You agree to purchase goods and services from our Site at your own risk.</p>
                <p>We reserve the right to modify, reject or cancel your order whenever it becomes necessary. If we cancel your order and have already processed your payment, we will give you a refund equal to the amount you paid. You agree that it is your responsibility to monitor your payment instrument to verify receipt of any refund.</p>
            </main>
            <main className={classes.main}>
                <h1>Subscriptions</h1>
                <p>Your subscription does not automatically renew. You will be notified before your next payment is due and must authorise that payment in order for your subscription to continue.</p>
                <p>To cancel your subscription, please follow these steps:</p>
                <ul className={classes.ul}>
                    <li>Cancellations are non-refundable.</li>
                </ul>
            </main>
            <main className={classes.main}>
                <h1>Payments</h1>
                <p>We accept the following payment methods on our Site:</p>
                <ul className={classes.ul}>
                    <li>Cryptocurrency</li>
                </ul>
                <p>When you provide us with your payment information, you authorise our use of and access to the payment instrument you have chosen to use. By providing us with your payment information, you authorise us to charge the amount due to this payment instrument.</p>
                <p>If we believe your payment has violated any law or these Terms and Conditions, we reserve the right to cancel or reverse your transaction.</p>
            </main>
            <main className={classes.main}>
                <h1>Right to Cancel and Receive Reimbursement</h1>
                <p>If you are a customer living in the United Kingdom or the Eurpoean Union you have the right to cancel your contract to purchase goods and services from us within 14 days without giving notice. The cancellation period:</p>
                <ul className={classes.ul}>
                    <li>Will end 14 days from the date of purchase when you purchased digital content that was not supplied on a tangible medium; or</li>
                    <li>Will end 14 days from the date of purchase when you purchased a service.</li>
                </ul>
                <p>To exercise your right to cancel you must inform us of your decision to cancel within the cancellation period. To cancel, contact us by email at sales@jobcrypt.com. You may use a copy of the Cancellation Form, found at the end of these Terms and Conditions, but you are not required to do so.</p>
            </main>
            <main className={classes.main}>
                <h1>The right to cancel does not apply to:</h1>
                <ul className={classes.ul}>
                    <li>Goods or services, other than the supply of water, gas, electricity, or district heating, where the price depends upon fluctuations in the financial market that we cannot control and that may occur during the cancellation period;</li>
                    <li>Custom or personalised goods;</li>
                    <li>Goods that will deteriorate or expire rapidly;</li>
                    <li>Services that the customer has requested for the purpose of carrying out urgent repairs or maintenance;</li>
                    <li>Newspapers, magazines, or periodicals, except for subscriptions to such publications; and</li>
                    <li>Accommodation, transport of goods, vehicle rental services, catering, or services related to leisure activities, if the contract includes a specific date or period of performance.</li>
                </ul>
            </main>
            <main className={classes.main}>
                <h1>Effect of cancellation</h1>
                <p>If you requested the performance of services begin during the cancellation period, you are required to pay us an amount which is in proportion to what has been performed until you have communicated to us your decision to cancel this contract. We will reimburse to you any amount you have paid above this proportionate payment.</p>
               <p>If you provide express consent to the supply of digital content during the cancellation period and acknowledge that your right to cancel the contract is lost by the supply of digital content during the cancellation period, you will no longer have a right to cancel the contract. We will make the reimbursement using the same form of payment as you used for the initial purchase unless you have expressly agreed otherwise. You will not incur any fees because of the reimbursement. This right to cancel and to reimbursement is not affected by any return or refund policy we may have.</p>
            </main>
            <main className={classes.main}>
                <h1>Refunds</h1>
                <p style={{ fontSize: '20px', fontWeight: 'bold'}}>Refunds for Goods</p>
                <p>Refund requests must be made within 14 days after receipt of your goods.</p>
                <p>We accept refund requests for goods sold on our Site for any of the following reasons:</p>
                <ul className={classes.ul}>
                    <li>Good is defective.</li>
                </ul>
                <p style={{ fontSize: '20px', fontWeight: 'bold'}}>Refunds do not apply to the following goods:</p>
                <ul className={classes.ul}>
                    <li>Decentralized Job Listings and</li>
                    <li>Managed Job Listings.</li>
                </ul>
                <p style={{ fontSize: '20px', fontWeight: 'bold'}}> Refunds for Services</p>
                <p>We provide refunds for services sold on our Site as follows: The services will be fully refunded if the services are cancelled at least 24 hours before the services were scheduled to be provided.</p>
            </main>
            <main className={classes.main}>
                <h1>Consumer Protection Law</h1>
                <p>Where the Sale of Goods Act 1979, the Consumer Rights Act 2015, or any other consumer protection legislation in your jurisdiction applies and cannot be excluded, these Terms and Conditions will not limit your legal rights and remedies under that legislation. These Terms and Conditions will be read subject to the mandatory provisions of that legislation. If there is a conflict between these Terms and Conditions and that legislation, the mandatory provisions of the legislation will apply.</p>
            </main>
            <main className={classes.main}>
                <h1>Links To Other Website</h1>
                <p>Our Site contains links to third party websites or services that we do not own or control. We are not responsible for the content, policies, or practices of any third party website or service linked to on our Site. It is your responsibility to read the terms and conditions and privacy policies of these third party websites before using these sites.</p>
            </main>
            <main className={classes.main}>
                <h1>Limitation Of Liability</h1>
                <p>JobCrypt and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the Site.</p>
            </main>
            <main className={classes.main}>
                <h1>Indemnity</h1>
                <p>Except where prohibited by law, by using this Site you indemnify and hold harmless JobCrypt and our directors, officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of our Site or your violation of these Terms and Conditions.</p>
            </main>
            <main className={classes.main}>
                <h1>Applicable Law</h1>
                <p>These Terms and Conditions are governed by the laws of the Country of England.</p>
            </main>
            <main className={classes.main}>
                <h1>Dispute Resolution</h1>
                <p>Subject to any exceptions specified in these Terms and Conditions, if you and JobCrypt are unable to resolve any dispute through informal discussion, then you and JobCrypt agree to submit the issue before a mediator. The decision of the mediator will not be binding. Any mediator must be a neutral party acceptable to both you and JobCrypt. The costs of any mediation will be shared equally between you and JobCrypt. Notwithstanding any other provision in these Terms and Conditions, you and JobCrypt agree that you both retain the right to bring an action in small claims court and to bring an action for injunctive relief or intellectual property infringement.</p>
            </main>
            <main className={classes.main}>
                <h1>Additional Terms</h1>
                <p>Customer is liable for all content posted on the decentralized Web; and Customer is made aware that we store all information on the decentralized web without encryption, and will therefore indemnify and hold harmless JobCrypt for any damages resulting from posting on the same..</p>
            </main>
            <main className={classes.main}>
                <h1>Severability</h1>
                <p>If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be considered valid.</p>
            </main>
            <main className={classes.main}>
                <h1>Changes</h1>
                <p>These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave on our Site. We will notify users by email of changes to these Terms and Conditions or post a notice on our Site.</p>
            </main>
            <main className={classes.main}>
                <h1>Contact Details</h1>
                <p>Please contact us if you have any questions or concerns. Our contact details are as follows:</p>
                <ul style={style}>
                    <li onClick={()=>openUrl('mailto:sales@jobcrypt.com')}>sales@jobcrypt.com</li>
                </ul>
                <p>JobCrypt c/o Tongai Ushewokunze Holdings UK Ltd, Kemp House, 160 </p>
                <p>City Road, EC1V 2NX </p>
                <p>Company Registration No: 06887430 </p>
                <p>VAT: GB997306084 </p>
                <p>Effective Date: 16th day of December, 2022</p>
            </main>
            {/* <article className={classes.article}>
                <div className={classes.rightBox}>
                    <h2>Sign Up</h2>
                    <span>You can sign up for this programme. Complete the form <strong style={style} onClick={()=>openUrl('https://docs.google.com/forms/d/e/1FAIpQLSf79sYKcwAyIHhjGKp0zQyVL4zYgHtJRJ_NWANyIibnHzlsPg/viewform')}>here</strong></span>
                </div>
            </article> */}
            <article className={classes.article}>
            <article className={classes.contactUsContainer}>
                <h1>Contact</h1>
                <p>For partnerships or more information about JobCrypt, Contact us on our <strong  onClick={()=>openUrl('https://discord.gg/kDTwvf59')} style={style}>Discord</strong> or <strong style={style} onClick={()=>openUrl('mailto:contact@jobcrypt.com')}>Email</strong> us</p>
            </article>
           </article>
           <ReadyToStart />
        </section>
    )
}

export default TermsOfServiceRoute;