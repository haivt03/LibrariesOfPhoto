import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PageDetailPhoto } from './pages/PageDetailPhoto';
import { TopicPhotoPage } from './pages/TopicPhotoPage';
import { AllTopicPage } from './pages/AllTopicsPage';
import { CollectionsPhoto } from './components/CollectionsPhoto';
import { UserDetails } from './components/UserDetail';
import { AllCollectionPage } from './pages/AllCollectionsPage';
import { UserPage } from './pages/UserPage';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/photos/:imageId" element={<PageDetailPhoto/>} />
          <Route path="/topics/:topicId" element={<TopicPhotoPage/>} />
          <Route path="/topics/all" element={<AllTopicPage/>} />
          <Route path="/collections/all" element={<AllCollectionPage/>} />
          <Route path="/collections/:collectionId" element={<CollectionsPhoto/>} />
          <Route path="/users/:username" element={<UserPage/>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
