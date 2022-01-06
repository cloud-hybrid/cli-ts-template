import Process from "process";
import Spawn from "child_process";
const Subprocess = async (command, directory = Process.cwd()) => {
    console.log("[Log]", "Subprocess Command" + ":", command, directory);
    const Binary = command.split(" ")[0];
    const Arguments = command.split(" ").splice(1);
    const Awaitable = new Promise((resolve, reject) => {
        const Stream = {
            PID: -1,
            Status: "",
            Signal: ""
        };
        const Command = Spawn.spawn(Binary, [...Arguments], {
            cwd: directory,
            env: Process.env,
            stdio: "pipe"
        });
        const Data = {
            Output: [""],
            Input: [""],
            Error: [""],
            PID: -1,
            Status: "",
            Signal: ""
        };
        const Output = Command.stdout;
        const Error = Command.stderr;
        Output.on("data", (_) => {
            let Allocation = 0;
            // Allocate --> Array Buffer of (n + 1) Bytes
            const Buffer = _;
            Array(Buffer[Symbol.iterator]).forEach(() => Allocation += 1);
            // Shift <-- Left to Release Empty Byte for String[0]
            const Output = Buffer.toString("utf-8", Allocation - 1);
            Data.Error.push(Output);
            Process.stdout.write(Output);
        });
        Error.on("data", (_) => {
            let Allocation = 0;
            // Allocate an Array Buffer of (n + 1) Bytes
            const Buffer = _;
            Array(Buffer[Symbol.iterator]).forEach(() => Allocation += 1);
            // Shift <-- Left to Release Empty Byte for String[0]
            const Output = Buffer.toString("utf-8", Allocation - 1);
            Data.Error.push(Output);
            Process.stderr.write(Output);
            reject(Output);
        });
        Command.on("error", ($) => {
            Stream.PID = Command.pid || 0;
            Stream.Status = String($);
            Stream.Signal = Command.signalCode || "";
            Data.PID = Stream.PID;
            Data.Status = Stream.Status;
            Data.Signal = Stream.Signal;
            resolve(Command);
        });
        Command.on("exit", ($) => {
            Stream.PID = Command.pid || 0;
            Stream.Status = String($);
            Stream.Signal = Command.signalCode || "";
            Data.PID = Stream.PID;
            Data.Status = Stream.Status;
            Data.Signal = Stream.Signal;
            resolve(Command);
        });
        Command.on("disconnect", () => {
            Stream.PID = Command.pid || 0;
            Stream.Status = "-1";
            Stream.Signal = Command.signalCode || "";
            Data.PID = Stream.PID;
            Data.Status = Stream.Status;
            Data.Signal = Stream.Signal;
            resolve(Command);
        });
        Command.on("close", ($) => {
            Stream.PID = Command.pid || 0;
            Stream.Status = String($);
            Stream.Signal = Command.signalCode || "";
            Data.PID = Stream.PID;
            Data.Status = Stream.Status;
            Data.Signal = Stream.Signal;
            resolve(Command); // ? resolve(Command);
        });
    });
    return await Awaitable;
};
export { Subprocess };
export default Subprocess;
