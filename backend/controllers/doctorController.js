import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/apppointmentModel.js';

async function changeAvailability(req, res) {
    try {
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available});
        res.json({success:true, message:"Doctor Availability changed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

async function doctorList(req, res) {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({success:true,message:"Doctors lists sent successfully", doctors});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

async function loginDoctor(req, res) {
    try {
        const {email, password} = req.body;
        const doctor = await doctorModel.findOne({email});
        if(!doctor){
            return res.json({success:false, message:"Invalid email credentials"})
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if(!isMatch){
            res.json({success:false, message:"Invalid password credentials"})
        }else{
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET);
            res.json({success:true, token});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
    
}

async function appointmentsDoctor(req, res) {
    try {
        const docId = req.docId;
        const appointments = await appointmentModel.find({docId});
        res.json({success:true, appointments});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

async function appointmentComplete(req, res) {
    try {
        const docId = req.docId;
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
            return res.json({success:true, message:"Appointment Completed"});
        }else{
            res.json({success:false, message:"Mark failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

async function appointmentCancel(req, res) {
    try {
        const docId = req.docId;
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
            return res.json({success:true, message:"Appointment cancelled"});
        }else{
            res.json({success:false, message:"Cancellation failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

async function doctorDashboard(req, res) {
    try {
        const docId = req.docId;
        const appointments = await appointmentModel.find({docId});
        let earnings = 0;
        appointments.map((item)=>{
            if(item.isCompleted){
                earnings += item.amount;
            }else if(item.payment && !item.cancelled){
                earnings += item.amount;
            }
        })
        let patients = [];
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success:true, dashData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

async function doctorProfile(req, res) {
    try {
        const docId = req.docId;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({success:true,profileData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

async function updateDoctorProfile(req, res) {
    try {
        const docId = req.docId;
        const {fees, address, available} = req.body;
        await doctorModel.findByIdAndUpdate(docId,{fees,address,available});
        res.json({success:true,message:"Profile Updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}



export {changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile}