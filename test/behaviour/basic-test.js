var component = document.querySelector('hence-card');

suite('<hence-card>', function () {

  test('says hello', function () {
    assert.equal(component.greeting, 'test greeting');
  });

  test('says hello', function () {
    assert.equal(component.sayHello(), 'hence-card says, Hello World!');

    var greetings = component.sayHello('greetings Earthlings');
    assert.equal(greetings, 'hence-card says, greetings Earthlings');
  });
});