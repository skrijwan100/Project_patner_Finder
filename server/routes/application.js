import express from 'express';
import fetchuer from '../middlewares/fecthuser.js';
import userApplication from '../models/Application.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const applicationRouter = express.Router();

applicationRouter.post('/hackthon-application', fetchuer, async (req, res) => {
    try {
        const { eventId } = req.body;
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        const newApllication = new userApplication({
            applicantId: finduser._id,
            eventId,
            eventModel: 'RequirmentHackthon',
        })
        newApllication.save();
        return res.status(201).json({ "msg": "Application submited.", status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": "Internal Servre errror", status: false })
    }
})
applicationRouter.post('/project-application', fetchuer, async (req, res) => {
    try {
        const { eventId } = req.body;
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        const newApllication = new userApplication({
            applicantId: finduser._id,
            eventId,
            eventModel: 'RequirmentProject',
        })
        newApllication.save();
        return res.status(201).json({ "msg": "Application submited.", status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": "Internal Servre errror", status: false })
    }
})
applicationRouter.get("/isApply/:id", fetchuer, async (req, res) => {
    try {
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        console.log(req.params.id, finduser._id)

        const finAppplication = await userApplication.find({
            applicantId:finduser._id ,
            eventId:new mongoose.Types.ObjectId(req.params.id) 
        });
        console.log(finAppplication)
        if (finAppplication.length==0) {
            return res.status(404).json({ "msg": "Not applied", status: false })
        }
        return res.status(200).json({ "msg": "Found", status: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": "Internal Servre errror", status: false })
    }
});
export default applicationRouter;