const express = require("express");
const router = express.Router();
const Authenticate = require("../model/authenticate.js");


const User = require("../userSchema.js");



router.post('/signup', async (req, res) => {
    let {email, phone, password, cpassword} = req.body;
    const user = new User({email, phone, password, cpassword});
    const resp = await user.save();
    if(resp){
        res.status(200).send({data: resp});
    }    
})

router.post('/login', async (req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && password == user.password){
        const token = await user.generateToken();
        res.cookie('userToken', token, {
            expires: new Date(Date.now() + 1800000),
            httpOnly: true, // try this
        });
        res.cookie('test', "text122222");
        res.status(200).send({data: user, cook: token})

    }else{
        res.status(422).send({data: user});
    }
})

router.post('/check', Authenticate, async (req, res) =>{

    res.send({data:req.rootuser});

})

router.post('/save', Authenticate, async (req, res) => {
    console.log(req.userid);
    let new_items = req.body.items;

    const user_update = await User.updateOne({_id: req.userid}, {
        todoData : new_items
    });
})

router.post('/update', Authenticate, async (req, res) => {
    let new_items = req.body.array_data;

    const user_update = await User.updateOne({_id: req.userid}, {
        todoData : new_items
    });

    const updated_data = await User.findOne({_id: req.userid});

    console.log(updated_data.todoData);
    res.status(200).send({data : updated_data.todoData});
    
})

module.exports = router;