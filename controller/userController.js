const form = require('../model/formSchema');
exports.home = (req,res)=>{
    res.render('index.ejs');
}
exports.contact = async(req,res)=>{
   const {name, email, description, service} = req.body;
   try {
    const data = new form(req.body);
    await data.save();
    res.status(201).json({ success: true, message: 'Your form has been submitted.' });

   } catch (error) {
    console.log('error occured in storing data', error);
    res.status(500).json({ success: false, message: 'Error occurred during form submission.' });
   }
}