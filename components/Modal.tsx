"use client";

import { useSignalEffect } from "@preact-signals/safe-react";
import type React from "react";
import { useRef, useState } from "react";
import modalStore from "../helpers/ModalHelper";

const Modal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current && modalStore.isOpen.value) {
      modalStore.close();
    }
  };

  useSignalEffect(() => {
    setOpen(modalStore.isOpen.value);
  });

  if (!open) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleOutsideClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") modalStore.close();
      }}
      tabIndex={-1}
      className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => modalStore.close()}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Close</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {modalStore.content.value}
      </div>
    </div>
  );
};

export default Modal;
