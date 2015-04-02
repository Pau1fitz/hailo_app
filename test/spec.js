describe('hailoApp homepage', function() {

  beforeEach(function() {
    browser.get('http://localhost.hailoweb.com:3000/');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Paulo-App');
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

  it('has a search box the user can enter text into', function(){
    var searcher = element(by.css("input[placeholder='ENTER LOCATION']"));
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(searcher), 1000)
    searcher.sendKeys("London");
    expect(searcher.getText()).toEqual("")
  });

  it('has a link to download the app', function(){
    expect(element(by.id('driver')).getAttribute('href')).toMatch('http://localhost.hailoweb.com:3000/');
    element(by.id('drivers')).click();
    browser.wait(function() {
    return browser.driver.getCurrentUrl().then(function(url) {
      return url.match('http://localhost.hailoweb.com:3000/');
    });
  }, 50, 'page should navigate to download');
  });

});