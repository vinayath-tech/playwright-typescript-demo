import { expect, test } from "../lib/baseTest";
import { createHtmlReport} from "axe-html-reporter";
const fs = require('fs');

export class Helper {

    // static async checkPa11y:(makeAxeBuilder) =>{
    //     const accessibilityScanResults = await makeAxeBuilder().analyze();
    //     // expect(accessibilityScanResults.violations).toEqual([]);
    //     const reportHTML = createHtmlReport({
    //         results: accessibilityScanResults,
    //         options: {
    //           projectKey: "PlaywrightHomepage"
    //         },
    //       });
      
    //     fs.writeFileSync("accessibility-report/report.html", reportHTML);
    //     expect(accessibilityScanResults.violations).not.toEqual([]);
    // }


    static async checkPa11y(makeAxeBuilder) {

        const accessibilityScanResults = await makeAxeBuilder().analyze();
        // expect(accessibilityScanResults.violations).toEqual([]);
        const reportHTML = createHtmlReport({
            results: accessibilityScanResults,
            options: {
              projectKey: "PlaywrightHomepage"
            },
          });
      
        fs.writeFileSync("accessibility-report/report.html", reportHTML);
        expect(accessibilityScanResults.violations).not.toEqual([]);

        }

}