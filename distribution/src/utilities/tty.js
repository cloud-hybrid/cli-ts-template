import TTY from "tty";
import Process from "process";
const Device = TTY.isatty(Process.stdout.fd);
const Rows = () => (Device) ? Process.stdout.rows : null;
const Columns = () => (Device) ? Process.stdout.columns : null;
export { Device, Rows, Columns };
export default {
    Device, Rows, Columns
};
