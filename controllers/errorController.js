const APIError  = require('./../utils/apiError')
const handleCastErrorDB = (err)=>{

    const message = `Invalid ${err.path},${err.value}`;
    return new APIError(message,400);
}
const handleDuplicateDB = (err)=>{
    const message = `Duplicate field value. Please use another value `;
    return new APIError(message,400);
}
const handleValidatonDB = (err)=>{
    const errors = Object.values(err.errors).map(el=>el.message);

     const message = `Invalid input data. ${errors.join('. ')}`;
     return new APIError(message,400);
}
const handleJWTTokenError = err=>new APIError('You are not login. Please login!',401)

const handleTokenExpiredError = err => new APIError("Your Token has been expired. Please Login Again!",401)
const errorOnpro = (err,res)=>{
    
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
        
    }
    else{
        console.log('error',err)
        res.status(err.statusCode).json({
            status: err.status,
            message: "Something is wrong"
        })
       
    }
    
}
const errorOndev = (err,res)=>{
    console.log(err)
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error:err,
        stack:err.stack
    })
}


module.exports = ((err,req,res,next) =>{
    err.statusCode = err.statusCode||500;
    err.status = err.status||"error";
    console.log(process.env.NODE_ENV)
    
    if(process.env.NODE_ENV ==="development"){
       errorOndev(err,res);
    }
    else if(process.env.NODE_ENV ==="production"){
       
        let error = {...err};
        if(error.message === undefined) return errorOnpro(err,res)
        if(err.name==="CastError") error = handleCastErrorDB(error);
        if(err.code===11000) error = handleDuplicateDB(error);
        if(err.name==='ValidationError') error = handleValidatonDB(error);
        if(err.name==='JsonWebTokenError') error  = handleJWTTokenError(error);
        if(err.name==='TokenExpiredError') error  = handleTokenExpiredError(error);

       errorOnpro(error,res); 
    }

})
