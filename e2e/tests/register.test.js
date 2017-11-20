import { Selector } from 'testcafe';
import * as randomstring from 'randomstring';

const { TEST_URL } = process.env;
const username = randomstring.generate();
const email = `${username}@test.com`;

fixture('/register').page(`${TEST_URL}/register`);

test('should display the registration form', async (t) => {
  await t
    .navigateTo(`${TEST_URL}/register`)
    .expect(Selector('H1').withText('Register').exists).ok()
    .expect(Selector('form').exists).ok();
});

test('should allow a user to register', async (t) => {
  // Register user
  await t
    .navigateTo(`${TEST_URL}/register`)
    .typeText('input[name="username"]', username)
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

