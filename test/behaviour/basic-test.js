var component = document.querySelector('hence-comp-ui-card');

suite('<hence-comp-ui-card>', function () {

  test('says hello', function () {
    assert.equal(component.greeting, 'test greeting');
  });

  test('says hello', function () {
    assert.equal(component.sayHello(), 'hence-comp-ui-card says, Hello World!');

    var greetings = component.sayHello('greetings Earthlings');
    assert.equal(greetings, 'hence-comp-ui-card says, greetings Earthlings');
  });
});