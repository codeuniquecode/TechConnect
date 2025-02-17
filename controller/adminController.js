const bcrypt = require('bcrypt');
const adminData = require('../model/adminSchema');
const formData = require('../model/formSchema');
const form = require('../model/formSchema');
exports.login = (req,res)=>{
    res.render('login');
}
exports.validateLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const validEmail = await adminData.findOne({ email });

        if (!validEmail) {
            console.log(' Email not found');
            return res.status(404).json({ message: 'Email not found' });
        }

        const validPassword = await bcrypt.compare(password, validEmail.password);
        if (!validPassword) {
            console.log(' Invalid password');
            return res.status(401).json({ message: 'Invalid password' });
        }
        return res.redirect('/dashboard');

    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.register = (req,res)=>{
    res.render('register');
}
exports.validateRegister = async(req,res)=>{
    const {email, password }= req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password,1);
        const data = new adminData({email,password:hashedPassword});
        await data.save();
    res.status(201).json({ message: 'Admin created successfully' }); // Send response as JSON
    } catch (error) {
        console.log('error in registering', error);
    res.status(500).json({ message: 'error in registering' }); // Send response as JSON
        
    }
}
exports.showDashboard = async(req,res)=>{
    const data = await formData.find({contacted:false});
    res.render('dashboard',{data});
}
exports.displayData = async(req,res)=>{
    const {id} = req.params;
    // console.log(id);
    const data = await form.findById(id);

    if(!data){
        res.status(500).end();
    }
    res.render('data',{data});

}
exports.contacted = async(req,res)=>{
    const {id} = req.body;
    const data = await form.findByIdAndUpdate(id,{contacted:true});
    if(!data){
        return res.status(404).json({ error: "Data not found" });
    }
    return res.status(200).json({ message:"done" });
    
    
}