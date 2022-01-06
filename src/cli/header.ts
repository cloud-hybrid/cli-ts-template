import Colors from "chalk";

const Year = new Date().getFullYear();

const Title = Colors.bold.underline("CLI Application TS Template");
const Copyright = Colors.dim(" - BSD-1 License" + "," + " " + Year);

const Generate = () => {
    const Lines: string[] = [];

    /// Check if Local `run-script start` is interfacing `factory`
    (process.env?.npm_lifecycle_event !== "start") && Lines.push("");

    Lines.push(Title);
    Lines.push(Copyright);
    Lines.push("");

    return Lines.join("\n");
};

const Header = Generate();

export { Header };

export default Header;