import { Selector } from 'testcafe';
import * as randomstring from 'randomstring';

const { TEST_URL } = process.env;
const username = randomstring.generate();
const email = `${username}@test.com`;

fixture('/login').page(`${TEST_URL}/login`);

test('should display the sign in form', async (t) => {
  await t
    .navigateTo(`${TEST_URL}/login`)
    .expect(Selector('H1').withText('Login').exists).ok()
    .expect(Selector('form').exists).ok();
});

test('should allow a user to sign in', async (t) => {
  // Register user
  await t
    .navigateTo(`${TEST_URL}/register`)
    .typeText('input[name="username"]', username)
    .typeText('input[name="email"]', email)
    .typeText('input[name="password"]', 'test')
    .click(Selector('input[type="submit"]'));

  // Log a user out
  await t
    .click(Selector('a').withText('Account'));
  await t
    .click(Selector('a').withText('Log Out'));

  // Log a user in
  await t
    .navigateTo(`${TEST_URL}/login`)
    .typeText('input[name="email"]', email)
    .typeText('input[name="password"]', 'test')
    .click(Selector('input[type="submit"]'));

  // Assert user is redirected to '/'
  // Assert '/' is displayed properly
  await t
    .expect(Selector('H1').withText('Metagenomes, Visualized').exists).ok()
    .expect(Selector('a').withText('User Status').exists).ok()
    .expect(Selector('a').withText('Log Out').exists).ok()
    .expect(Selector('a').withText('Register').exists).notOk()
    .expect(Selector('a').withText('Log In').exists).notOk();
});

test('should allow a user to sign in', async (t) => {
  // Register user
  await t
    .navigateTo(`${TEST_URL}/register`)
    .typeText('input[name="username"]', username)
    .typeText('input[name="email"]', email)
    .typeText('input[name="password"]', 'test')
    .click(Selector('input[type="submit"]'));

  // Log a user out
  await t
    .click(Selector('a').withText('Account'));
  await t
    .click(Selector('a').withText('Log Out'));

  // Log a user in
  await t
    .navigateTo(`${TEST_URL}/login`)
    .typeText('input[name="email"]', email)
    .typeText('input[name="password"]', 'test')
    .click(Selector('input[type="submit"]'));

  // Assert user is redirected to '/'
  // Assert '/' is displayed properly
  await t
    .expect(Selector('H1').withText('Metagenomes, Visualized').exists).ok()
    .expect(Selector('a').withText('User Status').exists).ok()
    .expect(Selector('a').withText('Log Out').exists).ok()
    .expect(Selector('a').withText('Register').exists).notOk()
    .expect(Selector('a').withText('Log In').exists).notOk();

  // Log a user out
  await t
    .click(Selector('a').withText('Account'));
  await t
    .click(Selector('a').withText('Log Out'));

  // Assert '/logout' is displayed properly
  await t
    .expect(Selector('p').withText('You are now logged out').exists).ok()
    .expect(Selector('a').withText('User Status').exists).notOk()
    .expect(Selector('a').withText('Log Out').exists).notOk()
    .expect(Selector('a').withText('Register').exists).ok()
    .expect(Selector('a').withText('Log In').exists).ok();
});
