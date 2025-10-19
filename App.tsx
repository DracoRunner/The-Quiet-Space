
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Confession from './pages/Confession';
import Layout from './components/Layout';
import BookingModal from './components/BookingModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (show: boolean) => {
    setIsModalOpen(show);
  };

  return (
    <HashRouter>
      <Layout toggleModal={toggleModal}>
        <Routes>
          <Route path="/" element={<Home toggleModal={toggleModal} />} />
          <Route path="/about" element={<About toggleModal={toggleModal} />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/confession" element={<Confession />} />
        </Routes>
      </Layout>
      <BookingModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </HashRouter>
  );
}

export default App;
