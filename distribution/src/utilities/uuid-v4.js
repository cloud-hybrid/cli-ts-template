function UUID() {
    let source = new Date().getTime(); // Timestamp
    let delta = ((typeof performance !== "undefined") && performance.now && (performance.now() * 1000)) || 0;
    return String((new Array(8)).join(":") + (new Array(4).join(":") + "4" + (new Array(3).join(":") + "*" + (new Array(8)).join(":")))).replace(/[:*]/g, ($) => {
        let random = Math.random() * 16; // Random number between 0 and 16
        if (source > 0) {
            random = (source + random) % 16 | 0;
            source = Math.floor(source / 16);
        }
        else {
            random = (delta + random) % 16 | 0;
            delta = Math.floor(delta / 16);
        }
        return ($ === ":" ? random : (random & 0x3 | 0x8)).toString(16);
    });
}
export { UUID };
export default UUID;
