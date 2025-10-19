
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { ToggleModalFunction } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  toggleModal: ToggleModalFunction;
}

const Layout: React.FC<LayoutProps> = ({ children, toggleModal }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleModal={toggleModal} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
