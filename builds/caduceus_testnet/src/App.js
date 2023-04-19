import { Routes, Route } from 'react-router-dom';
// import { WagmiConfig, createClient, configureChains } from 'wagmi';
// import { mainnet, optimism, sepolia } from 'wagmi/chains';
// import { publicProvider } from 'wagmi/providers/public';



import HomeRoute from './routes/HomeRoute';
import Layout from './components/Layout';
import FeaturedEventRoute from './routes/FeaturedEventRoute';
import JobSeekersRoute from './routes/JobSeekersRoute';
import EmployersRoute from './routes/EmployersRoute';
import CommunityRoute from './routes/CommunityRoute';
import SpeakersRoute from './routes/SpeakersRoute';
import AboutUsRoute from './routes/AboutUsRoute';
import PostJobRoute from './routes/PostJobRoute';
import BrowseJobRoute from './routes/BrowseJobRoute';
import PreviousApplicationRoute from './routes/PreviousApplicationRoute';
// import { registryGetAllContracts} from './contracts/InitializeContracts';
// import { ethers } from 'ethers';
import useWindowSize from './hooks/useWindowSize';



// const { chains, provider, webSocketProvider } = configureChains([sepolia],[publicProvider()]);
// console.log(chains)
// // console.log(provider)
// const client = createClient({
//   autoConnect: true,
//   provider,
//   webSocketProvider,
// });


function App() {
  const width = useWindowSize();
  console.log(width)
  // registryGetAllContracts();
//   const provider = new ethers.providers.Web3Provider(window.ethereum);

// const accounts = provider.listAccounts().then(accounts=>{
//   console.log(accounts[0]);
// });


  return (
    // <WagmiConfig client={client}>
    <Layout>
      <Routes>
          <Route exact path='/' element={<HomeRoute />} />
          <Route exact path='/featured-events' element={<FeaturedEventRoute />} />
          <Route exact path='/job-seekers' element={<JobSeekersRoute />} />
          <Route exact path='/employer' element={<EmployersRoute />} />
          <Route exact path='/community' element={<CommunityRoute />} />
          <Route exact path='/speakers' element={<SpeakersRoute />} />
          <Route exact path='/about' element={<AboutUsRoute />} />
          <Route exact path='/post_job' element={<PostJobRoute />} />
          <Route exact path='/browse-job' element={<BrowseJobRoute />} />
          <Route exact path='/previous-application' element={<PreviousApplicationRoute />} />
      </Routes>
    </Layout>
    // </WagmiConfig>
  );
}

export default App;
