const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require('path') //for setup the path
const fs = require('fs');

const {messDetailsController, allmess, fullMessDetail} = require("../controller/messDetailsController");
const { checkForAuthenticationCookie } = require("../middleware/Authentication");


//MAKING STORAGE.....
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      // Define the directory where files will be saved
      const dir = './uploads/';

      // Check if the directory exists, if not, create it
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
      }
  
      cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log("Hello: ", file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
  const upload = multer({ storage })


//for getting details of mess
router.post("/messdetails",checkForAuthenticationCookie() ,upload.single("coverimage"), messDetailsController);

//for providing all mess details
router.get("/allmess",checkForAuthenticationCookie() ,allmess);

//for providing full detail of each mess
router.get("/single/:id",checkForAuthenticationCookie() ,fullMessDetail);

module.exports = router