const {Schema ,model} = require("mongoose");

const messSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
        },
        coverImage:{
            type : String,
        },
        price: {
            type:Number,
            required:true,
        },
        noOfMeals:{
            type:Number,
            required:true,
        },
        contactInfo:{
            type:Number,
            required:true,
        },
        days:{
            type:String,

        },
        address:{
            type:String,
            required:true
        },
        detailedAddress:{
            type:String,
        },
        landmark:{
            type:String
        },
        additionalInfo:{
            type:String
        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"user",
        }
    },{timestamps:true}
)

const mess = model("mess" , messSchema);

module.exports = mess;