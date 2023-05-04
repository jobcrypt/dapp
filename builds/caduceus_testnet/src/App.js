import { Routes, Route, Navigate } from 'react-router-dom';


import HomeRoute from './routes/HomeRoute';
import Layout from './components/Layout';
import FeaturedEventRoute from './routes/FeaturedEventRoute';
import JobFinderProgrammeRoute from './routes/JobFinderProgrammeRoute';
import ManagedServiceProgrammeRoute from './routes/ManagedServiceProgrammeRoute';
import CommunityProgrammeRoute from './routes/CommunityProgrammeRoute';
import DistinguishedSpeakersRoute from './routes/DistinguishedSpeakersRoute';
import AboutUsRoute from './routes/AboutUsRoute';
import EmployerDashboardRoute from './routes/EmployerDashboardRoute';
import BrowseJobRoute from './routes/BrowseJobRoute';
import JobSeekerDashboardRoute from './routes/JobSeekerDashboardRoute';
import { registryGetAllContracts} from './contracts/InitializeContracts';
// import { ethers } from 'ethers';
import useWindowSize from './hooks/useWindowSize';
import { createContext, useEffect, useState } from 'react';
import Germany_24_5_2023 from './eventPages/germany/Germany_24-5-2023';
import Uk_25_4_2023 from './eventPages/uk/Uk_25-4-2023';
import May_8_Monday from './eventPages/uk/May_8_Monday';
import EventCalendarRoute from './routes/EventCalendarRoute';
import CookiePolicyRoute from './routes/CookiePolicyRoute';
import TermsOfServiceRoute from './routes/TermsOfServiceRoute';
import PrivacyPolicyRoute from './routes/PrivacyPolicyRoute';
import FaqRoute from './routes/FaqRoute';
import ViewJobApplicationDetailRoute from './routes/ViewJobApplicationDetailRoute';

// const { chains, provider, webSocketProvider } = configureChains([sepolia],[publicProvider()]);
// console.log(chains)
// // console.log(provider)
// const client = createClient({
//   autoConnect: true,
//   provider,
//   webSocketProvider,
// });

export const AccountContext = createContext();
export const FormContext = createContext();

function App() {
  const width = useWindowSize();
  // console.log(width)
  const [ account, setAccount ] = useState({ address: '', isConnected: false });
  const [ isStaked, setIsStaked ] = useState(false);
  const [ isApproved, setIsApproved ] = useState(false);
  const [ employerDashAddress, setEmployerDashAddress ] = useState('');
  const [ jobSeekerDashAddress, setJobSeekerDashAddress ] = useState('');
// END OF ACCOUNT CONTEXT

//BEGINING OF FORM CONTEXT
const [ jobTitle, setJobTitle ] = useState({ isValid: false, text: '' });
const [ locationType, setLocationType ] = useState({ isValid: false, text: '', isVisible: false });
const [ locationSupport, setLocationSupport ] = useState({ isValid: false, text: '', isVisible: false });
const [ workLocation, setWorkLocation ] = useState({ isValid: false, text: '' });
const [ companyName, setCompanyName ] = useState({ isValid: false, text: '' });
const [ companyLink, setCompanyLink ] = useState({ isValid: false, text: '' });
const [ companySummary, setCompanySummary ] = useState({ isValid: false, text: '' });
const [ skills, setSkills ] = useState({ isValid: false, text: '' });
const [ searchCategories, setSearchCategories ] = useState({ isValid: false, text: '' });
const [ searchTerms, setSearchTerms ] = useState({ isValid: false, text: '' });
const [ companyLogo, setCompanyLogo ] = useState(null);
const [ workType, setWorkType ] = useState({ isValid: false, text: '', isVisible: false });
const [ paymentType, setPaymentType ] = useState({ isValid: false, text: '', isVisible: false });
const [ jobDesc, setJobDesc ] = useState({ isValid: false, text: '' });
const [ jobApplyLink, setJobApplyLink ] = useState({ isValid: false, text: '' });
const [ employerPostingAddress, setEmployerPostingAddress ] = useState('');
const [ paymentData, setPaymentData ] = useState(null);
const [ productAddress, setProductAddress ] = useState('');
const [ editingJobPosting, setEditingJobPosting ] = useState('');


  const accountData = {
    account, setAccount, isStaked, setIsStaked, isApproved, setIsApproved, employerDashAddress, setEmployerDashAddress, jobSeekerDashAddress, setJobSeekerDashAddress
  }
  
   const formData ={
        jobTitle, setJobTitle, locationType, setLocationType,locationSupport, setLocationSupport, workLocation, setWorkLocation, companyName, setCompanyName, companyLink, setCompanyLink, companySummary, setCompanySummary, skills, setSkills, searchCategories, setSearchCategories, searchTerms, setSearchTerms, workType, setWorkType, paymentType, setPaymentType, jobDesc, setJobDesc, jobApplyLink, setJobApplyLink, employerPostingAddress, setEmployerPostingAddress, paymentData, setPaymentData, productAddress, setProductAddress, editingJobPosting, setEditingJobPosting, companyLogo, setCompanyLogo
       }

  useEffect(()=>{
    registryGetAllContracts();
  },[]);


  return (
      <AccountContext.Provider value={accountData}>
      <FormContext.Provider value={formData}>
    <Layout>
      <Routes>
          <Route exact path='/' element={<HomeRoute />} />
          <Route exact path='/featured-events' element={<FeaturedEventRoute />} />
          <Route exact path='/job-finder-programme' element={<JobFinderProgrammeRoute />} />
          <Route exact path='/managed-service-programme' element={<ManagedServiceProgrammeRoute />} />
          <Route exact path='/community-programme' element={<CommunityProgrammeRoute />} />
          <Route exact path='/distinguished-speakers-programme' element={<DistinguishedSpeakersRoute />} />
          <Route exact path='/about' element={<AboutUsRoute />} />
          <Route exact path='/employer_dashboard' element={<EmployerDashboardRoute />} />
          <Route exact path='/browse-job' element={<BrowseJobRoute />} />
          <Route exact path='/jobseeker_dashboard' element={<JobSeekerDashboardRoute />} />
          <Route exact path='/job_application_detail' element={<ViewJobApplicationDetailRoute />} />
          <Route exact path='/cookie-policy' element={<CookiePolicyRoute />} />
          <Route exact path='/terms-of-service' element={<TermsOfServiceRoute />} />
          <Route exact path='/privacy-policy' element={<PrivacyPolicyRoute />} />
          <Route exact path='/faq' element={<FaqRoute />} />
          <Route exact path='/events/germany/Germany_24_5_2023' element={<Germany_24_5_2023 />} />
          <Route exact path='/events/uk/Uk_25_4_2023' element={<Uk_25_4_2023 />} />
          <Route exact path='/events/uk/may_8_monday' element={<May_8_Monday />} />
          <Route exact path ='/events_calendar' element={<EventCalendarRoute />} />
          <Route exact path ='*' element={<Navigate to='/' />} />
      </Routes>
    </Layout>
    </FormContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
