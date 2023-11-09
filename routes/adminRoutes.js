const express= require("express");
const get_route= express();

const admincontroller= require("../controllers/adminController");



get_route.set('view engine', 'ejs');
get_route.set('views', "./views/users");
//get_route.set('views', __dirname + '/views/users');

const bodyParser= require("body-parser");
get_route.use(bodyParser.json());
get_route.use(bodyParser.urlencoded({extended: true}));
const auth= require("../middleware/auth");

const multer= require("multer");
const path= require("path");


get_route.use(express.static('public'));

const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/productImages'), function(err, success){

            if(err){
                throw err
            }

        });
    },
    
    filename: function(req, file, cb){

        const name= Date.now()+'-'+file.originalname;
        cb(null, name, function(error, success){

            if(error){
                throw error
            }

        });

    }
});

const upload= multer({storage: storage});

get_route.get('/get-data', admincontroller.getdetail);
get_route.get('/get-databyid/:id', admincontroller.getdetailbyid);
get_route.post('/post-data', admincontroller.insertproduct);
get_route.post('/status',  admincontroller.statusupdate);
get_route.post('/status/:id',  admincontroller.statusupdate);


module.exports= get_route;

