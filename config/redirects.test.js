import redirects from './redirects';

console.log(redirects);
describe('config/redirects', () => {
  test('renders all curren redirects', () => {
    expect(redirects).toMatchSnapshot();
  });
});
