const GeneralError = require('../errors/GeneralError')
const logger = require('../config/logger')

const handleErrors = (err, req, res, next) => {
    try {
        if (err instanceof GeneralError) {
            throw err
        }
        if (err instanceof Error) {
            logger.error(err)
            return res.status(500).send({
                status: 'error',
                message: err.message
            });
        }
    } catch (err) {
        if (err.message) {
            if(!err.moreInfo){
                err.moreInfo = []
            }
            if (err.moreInfo.length == 0) {
                err.moreInfo.push({ msg: err.message })
            }
        }
        res.status(err.status ? err.status : 500)
        return res.send({
            status: 'error',
            message: err.message,
            moreInfo: err.moreInfo,
            errorName: err.errorName ? err.errorName : "Error"
        })
    }


}


module.exports = handleErrors;