import { expect, test } from "../lib/baseTest";
import { createHtmlReport} from "axe-html-reporter";
const fs = require('fs');

export async function checkPa11y(makeAxeBuilder) {

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