import {test, expect} from '@playwright/test';
import { createBookingTestData } from '../test-data/apipayload/booking-data';
import { validateJsonSchema, setVariable } from "./util/apiUtility";

test.describe('Create a new booking test  @api-test', async() =>{

    const postBookingSchema = require('./schema/post-booking-schema.json');


    test('Create a new booking', async({ request }) => { 
         
        const bookingResp = await request.post('/booking', {
                                data: createBookingTestData
                            });

        expect(bookingResp.ok()).toBeTruthy();
        
        const bookingRespBody = await bookingResp.json();
        console.log(bookingRespBody);


        setVariable('bookingId', bookingRespBody.bookingid);
        expect(bookingRespBody.booking.firstname).toEqual(createBookingTestData.firstname);
        expect(bookingRespBody.booking.totalprice).toEqual(111);

        validateJsonSchema(postBookingSchema, bookingRespBody);

    });
});