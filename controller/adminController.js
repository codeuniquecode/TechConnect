const bcrypt = require('bcrypt');
const adminData = require('../model/adminSchema');
exports.login = (req,res)=>{
    res.render('login');
}
exports.validateLogin = async (req,res)=>{
    const {email, password }= req.body;
    try {
        const validEmail = await adminData.findOne({ email });
    
        if (validEmail) {
            console.log('valid email');
            const validPassword = await bcrypt.compare(password, validEmail.password);
            
            if (validPassword) {
                console.log('all valid');
                res.status(200).json({message:'admin dash here'});
            } else {
                res.status(401).json({ message: 'Invalid password' }); // 401 Unauthorized
            }
        } else {
            res.status(404).json({ message: 'Email not found' }); // 404 Not Found
        }
    } catch (error) {
        
    }
}
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