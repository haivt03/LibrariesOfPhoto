import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AuthorPage } from './pages/AuthorPage';
import { PageDetailPhoto } from './pages/PageDetailPhoto';

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
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
