import express from "express";
export class App {
    app;
    port;
    server;
    constructor() {
        this.app = express();
        this.port = 5000;
    }
    init() {
        this.server = this.app.listen(this.port);
        console.log(`Server is running on port ${this.port}`);
    }
}
//# sourceMappingURL=app.js.map