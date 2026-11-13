import {test, expect} from '@playwright/test';

test('GET user 1', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    await expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);

    await expect(body.email).toContain('@');
    await expect(body.name).toBeTruthy();

})

test('Post user 26', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: { title: 'my New Post', body: 'Hello', userId: 26 }
    });
    console.log(response.status());
    console.log(await response.json());
});

test('GET user 9999', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/9999');
    expect(response.status()).toBe(404);

    const body = await response.json();
    console.log(body);
})

test('Post create a post', async ({request}) => {

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: { title: 'Second New Post', body: 'Hello You', userId: 27 }
    });
    expect(response.status()).toBe(201);

    const bodyInfo = await response.json();
    
    expect(bodyInfo.id).toBeDefined();
    expect(typeof bodyInfo.id).toBe('number');

    expect(bodyInfo.title).toBe('Second New Post');
    expect(bodyInfo.body).toBe('Hello You');
    expect(bodyInfo.userId).toBe(27);
    
    
})