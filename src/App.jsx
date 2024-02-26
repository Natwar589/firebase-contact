// App.jsx
import React, { useEffect, useState } from 'react';
import Nav from './Component/Nav';
import './App.css';
import { IoIosSearch } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";

import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import ContactCard from './Component/ContactCard';
import AddandUpdateContact from './Component/AddandUpdateContact';
import useDisclose from './hooks/useDisclose';
import NotFoundContact from './Component/NotFoundContact';


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { onClose, onOpen, isOpen } = useDisclose();
    


 
  useEffect(() => {
    const getContact = async () => {
      try {
        
        const contactRef = collection(db, "contact");
      //  const contactSnapshot = await getDocs(contactRef);
        onSnapshot(contactRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
        setContacts(contactLists);
        return contactLists;
        

        })
        setLoading(false);
       
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setLoading(false); // Set loading to false to handle errors
      }
    };

    getContact();
  }, []);

  const filteredContact=(e)=>{
   const value = e.target.value;
   const contactRef = collection(db, "contact");
   //  const contactSnapshot = await getDocs(contactRef);
     onSnapshot(contactRef,(snapshot)=>{
       const contactLists = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       }));


    const filteredContacts = contactLists.filter((contacts)=>
       contacts.Name.toLowerCase().includes(value.toLowerCase())
    );
     setContacts(filteredContacts);
     return filteredContacts;
     

     })
  }

  return (
   <>
     <div className='bg-gray min-h-[100vh]'>
      <div className='max-w-[320px] mx-auto'>
        <Nav />
        <div className='flex relative gap-1 mb-3'>
          <input
          onChange={filteredContact}
            type='text'
            className='pl-11 text-white border-white bg-transparent rounded-md border h-[40px] flex-grow'
          />
          <IoIosSearch className='text-white absolute end-13 text-[40px] cursor-pointer' alt='Search' />
          <FaPlusCircle onClick={onOpen} className='text-white text-[40px] cursor-pointer' alt='Add' />
        </div>

        <div className=''>
          {loading ? (
            <p>Loading...</p>
          ) : (
            contacts.length <=0 ? <NotFoundContact/>:
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
        <AddandUpdateContact onClose={onClose} isOpen={isOpen} />
      </div>
      
    </div>
<ToastContainer/>
   </>
  );
};

export default App;
