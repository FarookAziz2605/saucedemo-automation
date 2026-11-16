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
        data: { title: 'Second New Post', body: 'Hello You', userId: 99 }
    });
    expect(response.status()).toBe(201);

    const bodyInfo = await response.json();
    
    expect(bodyInfo.id).toBeDefined();
    expect(typeof bodyInfo.id).toBe('number');

    expect(bodyInfo.title).toBe('Second New Post');
    expect(bodyInfo.body).toBe('Hello You');
    expect(bodyInfo.userId).toBe(99);
    
    
})

test('GET posts returns 100 posts', async({request}) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/posts');

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveLength(100);
});

test("GET posts filtered by userId returns only that user's posts", async({request}) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/posts?userId=1');
    expect (response.status()).toBe(200);
    
    const posts = await response.json();
    expect(posts).not.toHaveLength(0);

    for (const post of posts) {
        expect(post.userId).toBe(1);
    }

})

test ('PUT updates an existing post', async({request}) => {
    const responseBefore = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const body1= await responseBefore.json();

    expect(body1.id).toBe(1);

    const responseAfter = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: {userId: 19, id: 1, title: 'New Title', body: 'New Body'}
    });
    const body2= await responseAfter.json();
    

    expect(responseAfter.status()).toBe(200);
    expect(body2.id).toBe(1);
    expect(body2.userId).toBe(19);
    expect(body2.title).toBe('New Title');
    expect(body2.body).toBe('New Body');
    expect(body2.title).not.toBe(body1.title);

})