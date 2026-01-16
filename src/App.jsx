import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Announcements from './pages/Announcements';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';

// Layout component to conditionally render Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  // Don't show Navbar/Footer on login/admin pages
  const isFullScreen = location.pathname === '/login' || location.pathname.startsWith('/admin');

  return (
    <>
      {!isFullScreen && <Navbar />}
      <main>{children}</main>
      {!isFullScreen && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router basename={import.meta.env.DEV ? '/' : '/JVL/'}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anuncios" element={<Announcements />} />
          <Route path="/contactos" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
