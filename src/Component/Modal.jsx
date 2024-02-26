import React from 'react';
import { MdCancel } from 'react-icons/md';
import useDisclose from '../hooks/useDisclose';
const Modal = ({ onClose,isOpen,children }) => {

  return (
    <>
      {isOpen && (
        <>
          <div className='fixed inset-0 flex items-center justify-center backdrop-blur'>
            <div className='relative z-50 min-h-[200px] max-w-[85%] bg-white p-4 rounded-lg'>
              <div className='flex justify-end'>
                <MdCancel onClick={onClose} className='cursor-pointer text-2xl' />
              </div>
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
