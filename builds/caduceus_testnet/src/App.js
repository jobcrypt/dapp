
import { Routes, Route } from 'react-router-dom';
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


function App() {
  return (
    <Layout>
      <Routes>
          <Route exact path='/' element={<HomeRoute />} />
          <Route exact path='/featured-events' element={<FeaturedEventRoute />} />
          <Route exact path='/job-seekers' element={<JobSeekersRoute />} />
          <Route exact path='/employer' element={<EmployersRoute />} />
          <Route exact path='/community' element={<CommunityRoute />} />
          <Route exact path='/speakers' element={<SpeakersRoute />} />
          <Route exact path='/about' element={<AboutUsRoute />} />
          <Route exact path='/post-job' element={<PostJobRoute />} />
          <Route exact path='/browse-job' element={<BrowseJobRoute />} />
      </Routes>
    </Layout>
  );
}

export default App;
