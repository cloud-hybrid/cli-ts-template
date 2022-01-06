class Schema extends Error {
    constructor(configuration, trace = 3, capture = () => null) {
        super(configuration.message);
        Object.defineProperty(this, "stackTraceLimit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "trace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reference", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /*** Ensure the Error-Name is Machine-Readable */
        this.name = configuration.name.replace(" ", "-");
        // This clips the constructor invocation from the stack trace.
        this.stackTraceLimit = trace;
        this.captureStackTrace(this, (capture !== null) ? capture : this.constructor);
    }
    captureStackTrace(reference, namespace) {
        this.reference = reference;
        this.trace = namespace;
    }
}
export { Schema };
export default Schema;
