import { faker } from '@faker-js/faker';


export const createBookingTestData = 
    {
        "firstname" : faker.person.firstName(),
        "lastname" : faker.person.lastName(),
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
                "checkin" : "2024-02-06",
                "checkout" : "2024-02-07"
        },
        "additionalneeds" : "Breakfast"
    };

// async function checkInDate() {
//    let d = new Date();
//    let dateOnly = await d.toISOString().split('T')[0];
//    console.log(dateOnly);
//    let checkInDay = dateOnly.toString();

//    return checkInDay;
// }

// async function checkOutDate() {
//     let tomorrow = await new Date();
//     await tomorrow.setDate(new Date().getDate() + 1);
//     let tomorrowDate = await tomorrow.toISOString().split('T')[0];
//     console.log(tomorrowDate);

//     return tomorrowDate;
// }