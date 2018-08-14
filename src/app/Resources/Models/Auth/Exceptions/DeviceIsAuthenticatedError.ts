export class DeviceIsAuthenticatedError extends Error {
    constructor() {
        super("Device already has an authentication key");
    }
}