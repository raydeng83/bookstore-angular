import { StoreFrontPage } from './app.po';

describe('store-front App', function() {
  let page: StoreFrontPage;

  beforeEach(() => {
    page = new StoreFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
