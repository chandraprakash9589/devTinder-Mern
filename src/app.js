const express=require('express');   
const app=express();

app.use('/home',(req,res,next)=>{
    res.send("hello world testing again and agaun");
})
app.use('/test',(req,res,next)=>{
    res.send("hello test 77 77 8888");
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");
} 
  )

