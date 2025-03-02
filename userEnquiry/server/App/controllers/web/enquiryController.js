const enquiryModel = require("../../models/enquiry.model");

let enquiryInsert=(req, res)=>{
    let {name, email, phone, message} = req.body;
       let enquiry=new enquiryModel({
           name,
           email,
           phone,
           message
       });
       enquiry.save().then(()=>{
           res.send({status:1, message:"Enquiry Saved Successfully"})
       }).catch((err)=>{
           res.send({status:0, message:"Enquiry Not Saved", error:err})
       })
}

 let enquiryList = async(req, res)=>{
    let enquiry = await enquiryModel.find();
    res.send({status:1, enquiryList:enquiry})
 }

 let enquiryDelete = async(req, res)=>{
     let emId = req.params.id;
     let enquiry = await enquiryModel.deleteOne({_id:emId});
     res.send({status:1, message:"Enquiry Deleted Successfully",enquiry})
 }

 let enquirySingleRow= async(req, res)=>{
     let emId = req.params.id;
     let enquiry = await enquiryModel.findOne({_id:emId});
     res.send({status:1, enquiry})
 }

 let enquiryUpdate = async(req, res)=>{
     let emId = req.params.id;
     let {name, email, phone, message} = req.body;
     let updateObj = {
         name,
         email,
         phone,
         message
     }
     let enquiry = await enquiryModel.updateOne({_id:emId},{$set:updateObj});
     res.send({status:1, message:"Enquiry Updated Successfully",enquiry
     })
 }
module.exports={enquiryInsert, enquiryList,enquiryDelete,enquirySingleRow,enquiryUpdate};

