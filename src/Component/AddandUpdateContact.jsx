import React from 'react';
import Modal from './Modal.jsx';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import {db} from "../config/firebase"
import { toast } from 'react-toastify'
import { addDoc,collection, doc, updateDoc } from 'firebase/firestore';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  Name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});
const AddandUpdateContact = ({ isOpen, onClose,isupDate ,contact}) => {
  const AddContact= async (acontact)=>{
    try {
      const contactRef = collection(db,"contact");
      await addDoc(contactRef,acontact);
      onClose()
     
       
    
    } catch (error) {
      console.log(error);
    }
  }
  const upDateContact= async (acontact,id)=>{
    try {
      const contactRef = doc(db,"contact",id);
      await updateDoc(contactRef,acontact);
      onClose()
     
    } catch (error) {
      console.log(error);
    }
  }

  
  
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
       
        <Formik
        validationSchema={contactSchemaValidation}
        initialValues={isupDate?
         {
           Name:contact.Name,
           email:contact.email,
         }: 
         {
            Name:"",
            email:"",
        }}
        onSubmit={(values)=>{isupDate?upDateContact(values,contact.id):AddContact(values)}}>
          <Form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='Name'>Name</label>
              <Field name="Name" className="h-10 border p-2" />
              <div className='text-red-500 text-xs'>
              <ErrorMessage name='Name'/>
            </div>
            </div>
           
            <div className='flex flex-col gap-1'>
              <label htmlFor='email'>Email</label>
              <Field name="email" className="h-10 border p-2" />
              <div className='text-red-500 text-xs'>
              <ErrorMessage name='email'/>
            </div>
            </div>
            <button 
           
            className='p-3 bg-blue-400 rounded-md'>{isupDate ? <p>Update</p> : <p>Add</p>} contact</button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default AddandUpdateContact;
