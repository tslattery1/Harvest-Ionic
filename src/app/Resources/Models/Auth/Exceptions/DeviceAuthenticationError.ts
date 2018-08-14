export class DeviceAuthenticationError extends Error {
    constructor() {
        super("Device was not authenticated yet");
    }
}