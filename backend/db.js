require('dotenv').config();
const mysql=require('mysql');
const conection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

conection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }else{
        console.log("DB conected")
    }
})

module.exports=conection;