import UtyponModule from "../../core/UtyponModule";
import ColorsHelper from "./helpers/ColorsHelper";
import FileSystem from "../../util/FileSystem";
import StyleguideUtil from "../../util/Styleguide";
import GenericUtil from "../../util/Generic";
import * as fs from 'fs';
class FigmaSync extends UtyponModule {
    run() {
        console.log("This module is deprecated")
        // const protypon = new ProtyponSync();
        // const tokensFilePath = FileSystem.resolveRelativeToWorkingDirectory("figma-tokens.json");
        // const tokensFile = JSON.parse(FileSystem.readFileSync(tokensFilePath) || "");

        // let generatedFile = `\n\n /* journal branding section */ \n\n`;
        // generatedFile += ColorsHelper.brandingHelper(tokensFile.colors.branding);
        // delete tokensFile.colors.branding;
        // generatedFile += `\n\n /* Color Groups section */ \n\n`;
        // generatedFile += ColorsHelper.colorGroupsHelper(tokensFile.colors, StyleguideUtil.workingLevel !== 'product');
        // const figmaScssFilePath = FileSystem.resolveRelativeToWorkingDirectory("scss/variables/_figma-variables.scss");
        // FileSystem.writeFileSync(figmaScssFilePath, generatedFile);
        
        // GenericUtil.withOutLogging(() => {
        //     protypon.run({
        //         figma_file: "https://www.figma.com/file/WlYBQEevddp7MObld6Nc7p",
        //         token: "187206-c045e5e0-403b-4584-9712-aae15c72a02a"
        //     }).then((content:any) => {

        //     })
        // });
    }
}

export default (new FigmaSync()).asModule("sync", []);