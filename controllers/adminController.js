const adminmodel = require("../models/adminModel");
const path = require("path");
const fs = require("fs");
const bcryptjs= require('bcryptjs');

const config= require("../config/config");

const jwt= require("jsonwebtoken");

const nodemailer= require("nodemailer");

const randomstring= require("randomstring");




// get all data
const getdetail = async (req, res) => {

    try {

        const data = await adminmodel.find();
        const formattedData = data.map(item => ({

            id: item._id,
            title: item.title,
            description: item.description,           
            status: item.status
          
         //   imagePath: path.join(__dirname, '..', 'public/productImages', item.images) // Construct complete local image path

        }));

        // Send the formatted data as the response
        res.status(200).json(formattedData);


        //  res.status(200).send({success: true, msg: "All details :", data: data});

    } catch (error) {
        res.status(400).send(error.message);
    }

}


// get data by id
const getdetailbyid = async (req, res) => {
    try {

        //const id= req.body.id;
        const id = req.params.id;

        const data = await adminmodel.findOne({ _id: id });

        if (data) {
            res.status(200).send({ success: true, msg: "product details :", data: { data } });

        } else {
            res.status(200).send({ success: false, msg: "id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}


// insert data
const insertproduct = async (req, res) => {

    try {
        // var arrimages= [];
        // for(let i=0; i<req.files.length; i++){

        //     arrimages[i]= req.files[i].filename;

        // }
        

        const getdata = new adminmodel({
            title: req.body.title,
            description: req.body.description
           // images: req.file.filename
           //images: arrimages
           
        });
        const product_data = await getdata.save();

        res.status(200).send({ success: true, msg: "product Details", data: product_data })

    }

    catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


// update data
const statusupdate = async (req, res) => {
    try {

       
        const id = req.body.id;
        

        const data = await adminmodel.findOne({ _id: id });

        if (data) {

            const oldstatus= parseInt(data.status);
            const newstatus= oldstatus+1; 
            const userData = await adminmodel.findByIdAndUpdate({ _id: id }, {
                $set: {
                    status: newstatus
                }
            });

            res.status(200).send({ success: true, msg: "your data has been updated" });

        } else {
            res.status(200).send({ success: false, msg: "id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getdetail,
    getdetailbyid,
    insertproduct,
    statusupdate
   

}