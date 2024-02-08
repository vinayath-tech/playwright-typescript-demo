import { defineConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 * 
 */

export default defineConfig({
  testDir: '../api-test/',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  workers: 1,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
        'Accept': 'application/json' 
    }
  },
  globalSetup: "../lib/global.setup.ts"
});
