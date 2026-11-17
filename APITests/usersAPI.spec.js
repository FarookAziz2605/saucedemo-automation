import fs from 'fs';
const data = JSON.parse(fs.readFileSync('testData/posts.json', 'utf-8'));

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

test('Post create a post', async ({request}) => {

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: data.newPost
    });
    expect(response.status()).toBe(201);

    const bodyInfo = await response.json();
    
    expect(bodyInfo.id).toBeDefined();
    expect(typeof bodyInfo.id).toBe('number');

    expect(bodyInfo.title).toBe(data.newPost.title);
    expect(bodyInfo.body).toBe(data.newPost.body);
    expect(bodyInfo.userId).toBe(data.newPost.userId);
    
    
})


test ('PUT updates an existing post', async({request}) => {
    const responseBefore = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const body1= await responseBefore.json();

    expect(body1.id).toBe(data.updatedPost.id);

    const responseAfter = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: data.updatedPost
    });
    const body2= await responseAfter.json();
    

    expect(responseAfter.status()).toBe(200);
    expect(body2.id).toBe(data.updatedPost.id);
    expect(body2.userId).toBe(data.updatedPost.userId);
    expect(body2.title).toBe(data.updatedPost.title);
    expect(body2.body).toBe(data.updatedPost.body);
    expect(body2.title).not.toBe(body1.title);

})

test('Delete a post', async ({request}) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body).toEqual({});
})