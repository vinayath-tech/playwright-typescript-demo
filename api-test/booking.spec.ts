import { expect, test } from "@playwright/test";
import { createBookingTestData } from "../test-data/apipayload/booking-data";
import { validateJsonSchema } from "./util/apiUtility";
import ENV from "../lib/env";

test.describe('Authentication endpoint tests @api-test', async() => {

    let token: any;
    let bookingId: any;
    const apiUname = ENV.API_USERNAME;
    const apiPword = ENV.API_PASSWORD;

    //Schema value declarations
    const authSchema = require('./schema/auth-schema.json');
    const getBookingSchema = require('./schema/get-booking-schema.json');
    const postBookingSchema = require('./schema/post-booking-schema.json');

    test('Create a token by passing valid credentials', async({ request })=> {

        const authResponse: any =  await request.post('/auth', {
            data: {
                "username": `${apiUname}`,
                "password": `${apiPword}`

            }
        });
    
        expect(authResponse.ok()).toBeTruthy();
        expect(authResponse.status()).toBe(200);

        const respBody = await authResponse.json();
        token = respBody.token;
        console.log(token);

        validateJsonSchema(authSchema, respBody);
    });

    test('Create a new booking', async({ request }) => { 
         
        const bookingResp = await request.post('/booking', {
                                data: createBookingTestData
                            });

        expect(bookingResp.ok()).toBeTruthy();
        
        const bookingRespBody = await bookingResp.json();
        console.log(bookingRespBody);
        bookingId = bookingRespBody.bookingid;

        console.log(bookingId);
        expect(bookingRespBody.booking.firstname).toEqual(createBookingTestData.firstname);
        expect(bookingRespBody.booking.totalprice).toEqual(111);

        validateJsonSchema(postBookingSchema, bookingRespBody);

    });

    test('Get a booking', async({ request }) => {
        const getBookingResp = await request.get(`/booking/${bookingId}`);
        const getBookingRespBody = await getBookingResp.json();

        expect(getBookingResp.status()).toBe(200);
        expect(getBookingRespBody.firstname).toEqual(createBookingTestData.firstname);
        expect(getBookingRespBody.lastname).toEqual(createBookingTestData.lastname);
        expect(getBookingRespBody.totalprice).toEqual(111);
        expect(getBookingRespBody.bookingdates.checkin).toEqual(createBookingTestData.bookingdates.checkin);
        expect(getBookingRespBody.bookingdates.checkout).toEqual(createBookingTestData.bookingdates.checkout);

        validateJsonSchema(getBookingSchema, getBookingRespBody);

    });

    test('Get all bookings', async({ request }) => {
        const getAllBookingsResp = await request.get(`/booking`);
        const respBody = await getAllBookingsResp.json();

        expect(getAllBookingsResp.status()).toBe(200);
        expect(respBody.length).toBeGreaterThanOrEqual(1);
    });

    test('Delete a booking', async({ request }) => {

        const deleteResp = await request.delete(`/booking/${bookingId}`, {
            headers: {
                cookie: `token=${token}`
            }
        });

        expect(deleteResp.status()).toBe(201);

        //verify successful deletion of the booking
        const getBookingResp = await request.get(`/booking/${bookingId}`);
        expect(getBookingResp.status()).toBe(404);

    });
});