import {test, expect} from '@playwright/test';
import { getVariable } from "./util/apiUtility";

test.describe('Delete a booking test  @api-test', async() =>{

    const bookingId = getVariable("bookingId");
    const token = getVariable("token");

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