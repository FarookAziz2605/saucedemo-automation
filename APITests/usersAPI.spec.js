import {test, expect} from '@playwright/test';

test('GET user 1', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    await expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);

    await expect(body.email).toContain('@');
    await expect(body.name).toBeTruthy();

})

test('GET user 9999', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/9999');
    expect(response.status()).toBe(404);
})