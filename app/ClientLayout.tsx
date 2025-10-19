'use client';

import React, { useState, createContext, useContext, ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import { ToggleModalFunction } from '../types';

interface ModalContextType {
  isModalOpen: boolean;
  toggleModal: ToggleModalFunction;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};


export default function ClientLayout({
  children,
}: {
  children: ReactNode
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (show: boolean) => {
    setIsModalOpen(show);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
      <div className="flex flex-col min-h-screen">
        <Header toggleModal={toggleModal} />
        <main className="flex-grow">{children}</main>
        <Footer />
        <BookingModal isOpen={isModalOpen} toggleModal={toggleModal} />
      </div>
    </ModalContext.Provider>
  );
}
