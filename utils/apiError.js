class APIError extends Error{
    
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith('4')?'fail':"error";
        this.isOperational = true;
        // console.log(this.message)
        Error.captureStackTrace(this,this.constructor)
    }  
}
module.exports = APIError;