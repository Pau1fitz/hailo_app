describe('hailoApp homepage', function() {

  beforeEach(function() {
    browser.get('http://localhost.hailoweb.com:3000/');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Hailo-App');
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

  it('can do this', function(){
    var searcher = element(by.tagName("ui-gmap-search-box"));
    searcher.sendKeys("Location");
    searcher.submit();
  });

});