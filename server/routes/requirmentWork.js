import express from 'express';
import fetchuer from '../middlewares/fecthuser.js';

const requirmentWorkRouter= express.Router();

requirmentWorkRouter.post("/add-hackthon-reqirment", fetchuer, async(req,res)=>{
    res.send("hello")
})


export default requirmentWorkRouter;