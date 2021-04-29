const userSchema = require('../models/UserSchema');
const pictureSchema = require('../models/PictureSchema');


const newPicture = async (req, res) => {
    try {    
        console.log('-------------newPicture');     
        console.log('req.authorization'+JSON.stringify(req.headers['authorization']));
        const user = await userSchema.findOne({userName:req.headers['authorization'].userName , userPassword: req.headers['authorization'].userPassword })
        console.log('user:'+user);
        let picture = new pictureSchema(req.body);
        picture.user=user._id;
        console.log('picture:'+picture);
        await picture.save();
        user.pictures.push(picture._id);
        await user.save();
        console.log('user after update:'+user);
        res.status(200).send('new picture' + picture);
    }
    catch (err) {
        res.status(500).send("error:" + err)
    }
}
    
const getAllPicture=async(req,res)=>{
    console.log('get all pictures');
    try{
        console.log(JSON.stringify(req.headers['authorization']));
        const userPicture=await userSchema.find({userName:req.headers['authorization'].userName,userPassword:req.headers['authorization'].userPassword}).populate('pictures')
        console.log('pictures'+userPicture);
        res.status(200).json({pictures:userPicture})
    }
    catch(err){
        res.status(500).send('error:'+error)
    }
}

module.exports={newPicture,getAllPicture}