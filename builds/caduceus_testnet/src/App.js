import { Routes, Route } from 'react-router-dom';
import { WagmiConfig, createClient, configureChains, useContract, useContractRead } from 'wagmi';
import { mainnet, optimism } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';



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
import PreviousApplication from './routes/PreviousApplication';
import { useEffect } from 'react';


const { chains, provider, webSocketProvider } = configureChains([optimism],[publicProvider()]);
console.log(chains)
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});


function App() {
  const contract = useContractRead({
    address: '',
    abi: '',
    functionName: '',
    onSuccess: ()=>{

    },
    onError: () =>{

    }
});

// console.log('contract Instance ', contract)

// const data = await contract.getRanking("POPULAR_JOBS_RANKING_LIST",20);
// console.log(data);


  return (
    <WagmiConfig client={client}>
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
          <Route exact path='/previous-application' element={<PreviousApplication />} />
      </Routes>
    </Layout>
    </WagmiConfig>
  );
}

export default App;
