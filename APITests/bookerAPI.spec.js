import {test, expect} from '@playwright/test';
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('testData/posts.json', 'utf-8'))

const base = 'https://restful-booker.herokuapp.com';

async function login(request, username, password) {
    const response = await request.post(`${base}/auth`, {
        data: {
            'username': username, 
            'password': password
        }
    });

    return response;
}

async function createBooking(request) {
    const response = await request.post(`${base}/booking`, {
        data : data.newBooking,
        headers: {Accept: 'application/json'}
    });

    return response
    
}

async function updateBooking(request, newfirstName, id, token) {

    const headers = {
        Accept: 'application/json'
    };

    if (token) {
        headers.Cookie = `token=${token}`;
    }

    const updatedResponse = await request.put(`${base}/booking/${id}`, {
        data: { ...data.newBooking, firstname: newfirstName },
        headers: headers
    });

    return updatedResponse;
}

test('gets an auth token with valid login', async({request}) =>{

    const response = await login(request, 'admin', 'password123');
    const body = await response.json();
    
    expect(body.token).toBeDefined();
    expect(typeof(body.token)).toBe('string');
    expect(response.status()).toBe(200);
})

test('should rejects wrong password', async({request}) => {

    const response= await login(request, 'admin', 'password1234');
    const body = await response.json();

    expect(body.reason).toBe('Bad credentials');
    expect(response.status()).toBe(200);
    expect(body).not.toHaveProperty('token');

})

test('Creating a booking', async({request}) =>{

    const response = await createBooking(request)

    const created = await response.json();
    
    expect(created.bookingid).toBeDefined();
    expect(typeof(created.bookingid)).toBe('number');

    expect(created.booking.lastname).toBe(data.newBooking.lastname);
    expect(created.booking.depositpaid).toBe(data.newBooking.depositpaid);

    expect(response.status()).toBe(200);

    const id = created.bookingid;

    const responseFromCreated = await request.get(`${base}/booking/${id}`);
    const body = await responseFromCreated.json();

    expect(responseFromCreated.status()).toBe(200);
    expect(body.firstname).toBe(data.newBooking.firstname);
    expect(body.totalprice).toBe(data.newBooking.totalprice);
})

test('Updating a Booking', async ({ request }) => {
    const responseFromSignIn = await login(request, 'admin', 'password123');
    const token = (await responseFromSignIn.json()).token;

    const responseFromBooking = await createBooking(request);

    const body = await responseFromBooking.json();
    const id = body.bookingid;

    let newFirstName= 'Farook Abdul';

    const updatedResponse = await updateBooking(request, newFirstName, id, token);

    const updatedBody = await updatedResponse.json();
    expect(updatedResponse.status()).toBe(200);
    expect(updatedBody.firstname).toBe(newFirstName);
    
});

test('update without a token', async({request}) => {

    const responseFromBooking = await createBooking(request);

    const body = await responseFromBooking.json();
    const id = body.bookingid;
    let newFirstName= 'Farook Abdul';

    const updatedResponse = await updateBooking(request, newFirstName, id);

    const updatedBody = await updatedResponse.text();
    expect(updatedResponse.status()).toBe(403);
    expect(updatedBody).toBe('Forbidden');

    const checkResponse = await request.get(`${base}/booking/${id}`);
    const checkBody = await checkResponse.json();

    expect(checkResponse.status()).toBe(200);
    expect(checkBody.firstname).toBe(data.newBooking.firstname);
});

test('Deleting a booking', async({request}) => {

    const responseFromSignIn = await login(request, 'admin', 'password123');
    const token = (await responseFromSignIn.json()).token;


    const response = await createBooking(request);
    const body = await response.json();
    const id = body.bookingid;

    const deletingResponse = await request.delete(`${base}/booking/${id}`, {
        headers: {cookie: `token=${token}`}
    });
    const deleteBody = await deletingResponse.text();

    expect(deletingResponse.status()).toBe(201);
    expect(deleteBody).toBe('Created');

    const checkResponse = await request.get(`${base}/booking/${id}`);
    
    expect(checkResponse.status()).toBe(404);
})