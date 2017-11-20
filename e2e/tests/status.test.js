import { Selector } from 'testcafe';
import * as randomstring from 'randomstring';

const { TEST_URL } = process.env;
const username = randomstring.generate();
const email = `${username}@test.com`;

fixture('/status').page(`${TEST_URL}/status`);

test('should display the page if user is not logged in', async (t) => {
  await t
    .navigateTo(`${TEST_URL}/status`)
    .expect(Selector('p').withText('You must be logged in to view this.').exists).ok()
    .expect(Selector('a').withText('User Status').exists).notOk()
    .expect(Selector('a').withText('Log Out').exists).notOk()
    .expect(Selector('a').withText('Register').exists).ok()
    .expect(Selector('a').withText('Log In').exists).ok();
});

test('should display user info if user is logged in', async (t) => {
  // Register user
  await t
    .navigateTo(`${TEST_URL}/register`)
    .typeText('input[name="username"]', username)
    .typeText('input[name="email"]', email)
    .typeText('input[name="password"]', 'test')
    .click(Selector('input[type="submit"]'));

  // Assert '/status' is displayed properly
  await t
    .navigateTo(`${TEST_URL}/status`)
    .expect(Selector('li > strong').withText('User ID:').exists).ok()
    .expect(Selector('li > strong').withText('Email:').exists).ok()
    .expect(Selector('li').withText(email).exists).ok()
    .expect(Selector('li > strong').withText('Username:').exists).ok()
    .expect(Selector('li').withText(username).exists).ok()
    .expect(Selector('a').withText('User Status').exists).ok()
    .expect(Selector('a').withText('Log Out').exists).ok()
    .expect(Selector('a').withText('Register').exists).notOk()
    .expect(Selector('a').withText('Log In').exists).notOk();
});
