import {test, expect} from '@playwright/test';
import { createBookingTestData } from '../test-data/apipayload/booking-data';
import { validateJsonSchema, setVariable, getVariable } from "./util/apiUtility";

test.describe('Get a new booking test  @api-test', async() =>{

    // let bookId: any;
    const bookingId = getVariable("bookingId");
    const getBookingSchema = require('./schema/get-booking-schema.json');


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
});