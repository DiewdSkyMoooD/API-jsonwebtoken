const express= require('express');
const router=express.Router();
const bcryptjs=require('bcryptjs');
const conection=require('./db');
const jwt=require('jsonwebtoken');

//midleware need token
const validation=(req,res,next)=>{
    const token=req.header('auth-token');
    if(token){
        try{
            let verificado=jwt.verify(token,process.env.TOKEN)
            req.info=verificado;
            next()
        }catch(err){
            res.json({Status: "token no valido"})
        }
        
    }else{
        res.json({Status:"Denegado"})
    }
}

router.post('/registro',async(req,res)=>{
    const {nombre,correo,password}=req.body;
    const passwordhash= await bcryptjs.hash(password,8);
    conection.query('INSERT INTO users (nombre,correo,password)VALUES(?,?,?)',[nombre,correo,passwordhash],(err)=>{
        if(!err){
            res.json({Status:"Insertado"});
        }else{
            res.json({Status:"Ocurrio un error"})
        }
    })
})

router.post('/login',(req,res)=>{
    const {correo,password}=req.body;
    console.log(req.body)
    conection.query('SELECT * FROM users WHERE correo=?',[correo],(err,rows)=>{
        if(!err && rows.length!=0){
            let compare=bcryptjs.compareSync(password,rows[0].password)
            if(compare){
                const token=jwt.sign({
                    id:rows[0].id,
                    nombre:rows[0].name,
                },process.env.TOKEN)
                res.status(200).json({Status:"Logueado",token})
                 
            }else{
            res.status(404).json({Status:"Correo o contraseña incorrectos"})
            }
            
        }else{
            res.status(404).json({Status:"Correo o contraseña incorrectos"})
        }
    })
})

router.get('/profile',validation,(req,res)=>{
    const {id}=req.info;
    conection.query('SELECT * FROM documents WHERE id_user=?',[id],(err,rows)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err)
        }
    })
})

router.get('/',(req,res)=>{
    res.send("WELCOME MI API")
})

module.exports= router;