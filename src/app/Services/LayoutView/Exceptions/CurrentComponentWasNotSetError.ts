export class CurrentComponentWasNotSetError extends Error {
    constructor() {
        super("Current view component was not set yet");
    }
}