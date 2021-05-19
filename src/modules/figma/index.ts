import sync from "./sync";
import UtyponModule from "../../core/UtyponModule";

class Figma extends UtyponModule{
    run() {}
}

export default (new Figma).asModule("figma", [], [sync]);
