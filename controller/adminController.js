const bcrypt = require('bcrypt');
const adminData = require('../model/adminSchema');
const formData = require('../model/formSchema');
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
    const data = await formData.find();
    res.render('dashboard',{data});
}