 function AdminAuths(err,req,res,next){
    const token='xyz';
    const isAdminsAuthenticated=token==='xyz';
    if(!isAdminsAuthenticated){
        res.status(401).send("you are not authenticated");
    }
    else{
next()
    }
 }

 module.exports={AdminAuths};

