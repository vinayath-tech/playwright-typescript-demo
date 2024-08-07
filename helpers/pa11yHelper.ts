import { expect } from "../lib/baseTest";
import { createHtmlReport} from "axe-html-reporter";
import fs from 'fs';

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