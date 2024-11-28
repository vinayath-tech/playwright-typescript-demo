import { faker } from '@faker-js/faker';
let inDate;

function checkInDate():string {
    let d = new Date();
    const dateOnly = d.toISOString().split('T')[0];
    console.log(dateOnly);
    return dateOnly;
 }

function checkOutDate() {
    let tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    let tomorrowDate = tomorrow.toISOString().split('T')[0];
    console.log(tomorrowDate);

    return tomorrowDate;
}


export const createBookingTestData = 
    {
        "firstname" : faker.person.firstName(),
        "lastname" : faker.person.lastName(),
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
                "checkin" : checkInDate(),
                "checkout" : checkOutDate()
        },
        "additionalneeds" : "Breakfast"
    };