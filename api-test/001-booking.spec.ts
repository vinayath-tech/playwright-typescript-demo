import { expect, test } from "@playwright/test";
// import { createBookingTestData } from "../test-data/apipayload/booking-data";
import { validateJsonSchema, setVariable } from "./util/apiUtility";
import ENV from "../lib/env";
import authSchema from './schema/auth-schema.json';

test.describe('Authentication endpoint tests @api-test', async() => {

    let token: string;
    const apiUname = ENV.API_USERNAME;
    const apiPword = ENV.API_PASSWORD;

    //Schema value declarations
    // const authSchema = require('./schema/auth-schema.json');

    test('Create a token by passing valid credentials', async({ request })=> {

        const authResponse =  await request.post('/auth', {
            data: {
                "username": `${apiUname}`,
                "password": `${apiPword}`

            }
        });
    
        expect(authResponse.ok()).toBeTruthy();
        expect(authResponse.status()).toBe(200);

        const respBody = await authResponse.json();
        token = respBody.token;

        setVariable('token', respBody.token);
        console.log(token);

        validateJsonSchema(authSchema, respBody);
    });

    test('Get all bookings', async({ request }) => {
        const getAllBookingsResp = await request.get(`/booking`);
        const respBody = await getAllBookingsResp.json();

        expect(getAllBookingsResp.status()).toBe(200);
        expect(respBody.length).toBeGreaterThanOrEqual(1);
    });
});