const GeneralError = require('./GeneralError')

class DataValidationError extends GeneralError {

    constructor(message = "Validation Error", moreInfo = []) {
        super();
        this.message = message == null ? 'Validation Error' : message;
        this.status = 404;
        this.moreInfo = moreInfo
        this.errorName = "DataValidationError"
    }
}


module.exports = DataValidationError