const Mess = require("../model/messDetails");

const messDetailsController = async(req,res) =>{

    // Check if req.body.data exists
    // if (!req.body.data) {
    //     return res.status(400).json({ success: false, error: "Data is missing" });
    // }

    const data = JSON.parse(JSON.stringify(req.body.data));
    // const data = req.body.data;
    // const {title ,price,noOfMeals,contactInfo,days,address,detailedAddress,landmark,additionalInfo,id} = JSON.parse(JSON.stringify(req.body.data));
    
// //    console.log(data);

//     console.log(data.id);
//     console.log(data.title);
//     console.log(data.price);
//     console.log(data.noOfMeals);
//     console.log(data.contactInfo);
//     console.log(data.days);
//     console.log(data.address);
//     console.log(data.detailedAddress);
//     console.log(data.landmark);
//     console.log(data.additionalInfo);
//     console.log("",req.file.filename);
    try{
        

        const newMessDetails = await Mess({
            title: data.title,
            coverImage:`uploads/${req.file.filename}`,
            price: data.price,
            noOfMeals: data.noOfMeals,
            contactInfo: data.contactInfo,
            days: data.days,
            address:data.address,
            detailedAddress:data.detailedAddress,
            landmark:data.landmark,
            additionalInfo:data.additionalInfo,
            createdBy:data.id,
        }
    )
        await newMessDetails.save()
       
        res.status(200).json(newMessDetails); 
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

const allmess = async(req,res)=>{
    try{
        const mess = await Mess.find().populate("createdBy");

        if(!mess){
            return res.status(400).json({success:false ,error:"mess not found"})
        }
        return res.status(200).json({success:true ,data:mess})
    }
    catch{
        res.json(error);
    }
}

const fullMessDetail= async(req,res)=>{
    const id = req.params.id;
    const details = await Mess.findById(id).populate("createdBy");

    if(!details){
        return res.status(400).json({success:false , error : "mess details not found"})
    }
    return res.status(200).json({success:true ,data:details});
}


module.exports={messDetailsController ,fullMessDetail ,allmess};