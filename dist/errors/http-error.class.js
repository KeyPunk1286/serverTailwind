export class HTTPErrors extends Error {
    statusCode;
    context;
    constructor(statusCode, message, context) {
        super(message);
        this.statusCode = statusCode;
        this.context = context;
    }
}
//# sourceMappingURL=http-error.class.js.map