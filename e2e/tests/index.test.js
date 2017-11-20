import { Selector } from 'testcafe';

const { TEST_URL } = process.env;


fixture('/').page(`${TEST_URL}/`);

test('users should be able to view the \'/\' page', async (t) => {
  await t
    .navigateTo(TEST_URL)
    .expect(Selector('H1').withText('Metagenomes, Visualized').exists).ok();
});
