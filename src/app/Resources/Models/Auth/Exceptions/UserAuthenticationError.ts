export class UserAuthenticationError extends Error {
    constructor() {
        super("User was not authenticated yet");
    }
}