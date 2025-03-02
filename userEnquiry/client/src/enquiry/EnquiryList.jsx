import React from 'react'
import { Table, TableCell } from "flowbite-react"
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
export default function EnquiryLlist({data,getAllenquiry,Swal,setformData}){
  let deleteRow = (delid) => {
  
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "YES",
      denyButtonText: `NO`
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
        .then((res) => {
          toast.success("Enquiry Deleted Successfully")
          getAllenquiry();
        })

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  let editRow=(editRow)=>{
    axios.get(`http://localhost:8020/api/website/enquiry/single/${editRow}`)
    .then((res)=>{
      let data=res.data
      setformData(data.enquiry)
    })
  }

  return(
    <div className='bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 p-4 text-whit'>
   
          <h1 className='text-[20px] font-bold mb-4'>Enquiry List</h1>
           <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Sr. No</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Message</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">

        {
  data.length >= 1 ? (
    data.map((items, index) => (
      <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{items.name}</Table.Cell>
        <Table.Cell>{items.phone}</Table.Cell>
        <Table.Cell>{items.email}</Table.Cell>
        <Table.Cell>{items.message}</Table.Cell>
        <Table.Cell>
          <button onClick={()=>deleteRow(items._id)} className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-700">
            Delete
          </button>
        </Table.Cell> 
        <Table.Cell>
          <button onClick={()=>editRow(items._id)} className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-700">
            Edit
          </button>
        </Table.Cell> 
      </Table.Row>
    ))
  ) : (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell colSpan={7} className="text-center">No Data Found</Table.Cell>
    </Table.Row>
  )
}


        </Table.Body>
      </Table>
    </div>
  </div>

  )
}
