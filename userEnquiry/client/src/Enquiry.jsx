import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import EnquiryList from './enquiry/EnquiryList';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';
export default function Enquiry() {
  // save enquiry
  let [formData, setformData]=useState({
    name:'',
    email:'',
    phone:'',
    message:''
  })

  let [enquiryList, setEnquiryList] = useState([]);
     const saveEnquiry = (e) => {
      // alert('Enquiry saved successfully');
      e.preventDefault();
      
      // let formData = {
      //   name: e.target.name.value,
      //   email: e.target.email.value, 
      //   phone: e.target.phone.value,
      //   message: e.target.message.value 
      // };
      if(formData._id){
        axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`, formData)
          .then((res)=>{
            toast.success('Enquiry updated successfully');
            // reset the form
            setformData({
              name:'',
              email:'',
              phone:'',
              message:'',
              _id:''
            })
            getAllenquiry();
          })
      }
      else{
        axios.post('http://localhost:8020/api/website/enquiry/insert',formData)
        .then((res)=>{
          console.log(res.data)
          toast.success('Enquiry saved successfully');
          // reset the form
          setformData({
            name:'',
            email:'',
            phone:'',
            message:''
          })
          getAllenquiry();
        })
       }
      }
     
    
     let getAllenquiry = () =>{
      axios.get('http://localhost:8020/api/website/enquiry/view')
      .then((res)=>{
       return res.data;
      })
      .then((finalData)=>{
        if(finalData.status){
          setEnquiryList(finalData.enquiryList)
        }
      })
     }

     let getValue = (e) =>{
       let inputName = e.target.name;
       let inputValue = e.target.value;
       let oldData = {...formData};
       oldData[inputName] = inputValue;
       setformData(oldData);
     }

     useEffect(()=>{
      getAllenquiry();
     },[])
  return (
    <div>
      <ToastContainer/>
      <h1  className='font-bold text-[40px] text-center'>Enquiry</h1>

    <div className='grid grid-cols-[30%_auto] gap-5 '>
      <div className='bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 p-4 text-white'>
      <h2 className=' text-[30px] font-bold'>Enquiry Form</h2>
       <form action='' onSubmit={saveEnquiry}>
        {formData._id}
        <div>
           <Label htmlFor="name" value="Your name" />
           <TextInput type="name" onChange={getValue} value={formData.name} name='name' placeholder="type your name" required />
        </div>
        <div>
           <Label htmlFor="phone" value="Your mobile number" />
           <TextInput type="text" onChange={getValue} value={formData.phone} name='phone' placeholder="type your mobile number" required />
        </div>
        <div>
           <Label htmlFor="email" value="Your email" />
           <TextInput type="email" onChange={getValue} value={formData.email} name='email' placeholder="type your email" required />
        </div>
        <div className='py-3'>
           <Label htmlFor="message" value="Your message" />
           <Textarea id="comment" onChange={getValue} value={formData.message} name='message' placeholder="Leave a comment..." required rows={4} />
        </div>
        <div className='py-3'>
          <Button type="submit" className='w-[100%]'>
            {formData._id ? 'Update' : 'Save'}
            </Button>
        </div>
       </form>
      </div>
        <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} Swal={Swal} setformData={setformData}/>
        
    </div>
     
    </div>
  )
}