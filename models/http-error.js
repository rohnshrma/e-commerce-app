class HttpError extends Error{
    constructor(message,errorCode){
        super(message)
        this.code = errorCode //create
    }
}


module.exports = HttpError