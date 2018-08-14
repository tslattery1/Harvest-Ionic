export class TokenExpiredError extends Error {
    constructor() {
        super("User authentication is expired");
    }
}
