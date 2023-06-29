class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
        // console.error(this.stack); commented out for testing purposes
    }
}


module.exports = ExpressError;