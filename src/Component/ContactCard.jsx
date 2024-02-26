import React from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { RiEditCircleLine } from 'react-icons/ri';
import { IoMdTrash } from 'react-icons/io';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import useDisclose from '../hooks/useDisclose';
import AddandUpdateContact from './AddandUpdateContact';
import { toast } from 'react-toastify';
const ContactCard = ({ contact }) => {

  const {onClose,onOpen,isOpen} = useDisclose();

  const deleteContact= async (id)=>{
    try {
      await deleteDoc(doc(db, "contact", id));
      
      
    } catch (error) {
      console.log(error)
    }

  }
 
  
  return (
   <>
     <div  className='bg-yellow flex justify-between bg-yellow-200 mb-3 text-black p-4 rounded-md'>
      <div className='flex items-center'>
        <HiOutlineUserCircle className='text-blue-500 text-3xl' />
        <div className='ml-2'>
          <h2 className='text-xl font-bold text-gray-800'>{contact.Name}</h2>
          <p className='text-sm text-gray-600'>{contact.email}</p>
        </div>
      </div>
      <div className='flex items-center'>
        <RiEditCircleLine 
        onClick={onOpen}
        className='cursor-pointer text-green-500 text-3xl' />
        <IoMdTrash
        onClick={()=>{deleteContact(contact.id)}}
       className='text-red-500 text-3xl cursor-pointer' alt='Delete' />
      </div>
    </div>
    <AddandUpdateContact contact={contact} isupDate isOpen={isOpen} onClose={onClose}/>
   </>
    
  );
};

export default ContactCard;
