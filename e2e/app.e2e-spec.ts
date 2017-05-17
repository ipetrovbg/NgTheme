import { NgThemePage } from './app.po';

describe('ng-theme App', () => {
  let page: NgThemePage;

  beforeEach(() => {
    page = new NgThemePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
