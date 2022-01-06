import Process from "process";
import { Header } from "./header.js";
import { Arguments as CLI } from "./arguments.js";
const Casing = await import("../commands/string/index.js");
const Main = async () => {
    Process.stdout.write(Header + "\n");
    const Arguments = async () => {
        const Commands = {
            cwd: async (input) => (await import("../commands/environment/cwd.js")).CWD(input),
            environment: async (input) => (await import("../commands/environment/configuration.js")).Configuration(input),
            input: async (input) => (await import("../commands/test-input.js")).Input(input),
            version: (await import("../commands/version.js")).Version,
            case: {
                "train-case": async (input) => await Casing.Train(input),
                "screaming-train-case": async (input) => await Casing.Scream(input)
            }
        };
        return await CLI(Process.argv.splice(2))
            .scriptName("cloud-factory").wrap(120)
            /*** Version */
            .version(...Commands.version)
            .alias("version", "v")
            .describe("version", "Show Version Number")
            /*** Global Usage Text */
            .usage("Usage: $ cloud-factory [...]")
            /*** Global Help Command */
            .help("help")
            .alias("help", "h")
            .describe("help", "Display Additional Information & Usage Command(s)")
            .showHelpOnFail(true, "[Error]: Invalid Input")
            /*** String Manipulation */
            .command("string", "String Function(s)", (async ($) => {
            const Length = (await $.argv)["_"].length;
            (Length <= 1) && $.help("help", "Display Usage Guide").default("help", true);
            $.help("help", "Display Usage Guide").default("help", true).option({ help: { boolean: true } });
            $.command("train-case", "Train-Case String Manipulation", (async ($) => await Commands.case["train-case"]($)));
            $.command("screaming-train-case", "Screaming-Train-Case String Manipulation", (async ($) => await Commands.case["screaming-train-case"]($)));
        }))
            /*** Runtime Environment */
            .command("environment", "Runtime Environment Command(s)", (async ($) => {
            const Length = (await $.argv)["_"].length;
            (Length <= 1) && $.help("help", "Display Usage Guide").default("help", true);
            /*** NPM Configuration */
            $.command("npm-configuration", "NPM Runtime Environment Variable(s) & Configuration", (async ($) => await Commands.environment($)));
            /*** Current Working Directory */
            $.command("cwd", "Current Working Directory", (async ($) => {
                return await Commands.cwd($);
            }));
            /// (Length === 1) && $.command("environment", "Runtime Environment Command(s)").help();
        }))
            /*** Test-Input */
            .command("test-input", "Arbitrary User-Input (Testing Purposes Only)", (async ($) => {
            return await Commands.input($);
        }))
            .showHelpOnFail(true, "Error Parsing CLI Input(s)")
            .parseAsync();
    };
    const Input = await Arguments();
};
export { Main };
export default Main;
