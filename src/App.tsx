import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AuthorPage } from './pages/AuthorPage';
import { PageDetailPhoto } from './pages/PageDetailPhoto';
import { TopicPhotoPage } from './pages/TopicPhotoPage';
import { TopicPage } from './pages/TopicPage';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/author/:username" element={<AuthorPage username={''} />} />
          <Route path="/photos/:imageId" element={<PageDetailPhoto/>} />
          <Route path="/topics/:topicId" element={<TopicPhotoPage/>} />
          <Route path="/topics/all" element={<TopicPage/>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
