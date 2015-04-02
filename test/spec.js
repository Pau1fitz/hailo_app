describe('hailoApp homepage', function() {

  beforeEach(function() {
    browser.get('http://localhost.hailoweb.com:3000/');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Paulo');
  });

  it('displays a PaulO logo', function() {
    expect(browser.isElementPresent(by.id("logo"))).toBe(true);
  });

   it('displays a map', function() {
    expect(browser.isElementPresent(by.id("map_canvas"))).toBe(true);
  });

   it('can display the time it will take before a taxi arrives', function(){
    expect(browser.isElementPresent(by.id('arrival_time'))).toBe(true);
  });

  it('can display an error message if no such location exists ', function(){
    expect(browser.isElementPresent(by.id('exist_false'))).toBe(true);
  });

  it('has a search box where user can enter text', function(){
    var searcher = element(by.css("input[placeholder='ENTER LOCATION']"));
    browser.wait(protractor.ExpectedConditions.presenceOf(searcher), 1000);
    searcher.sendKeys("London");
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    expect(searcher.getText()).toEqual("");
  });

});