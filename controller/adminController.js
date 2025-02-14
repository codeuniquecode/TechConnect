exports.login = (req,res)=>{
    res.render('login');
}
exports.validateLogin = (req,res)=>{
    const {email, password }= req.body;
    console.log(email,password);
}