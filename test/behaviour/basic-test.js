var component = document.querySelector('hence-card');

suite('<hence-card>', function () {

  test('default title is set', function () {
    assert.equal(component.title, 'Lorem ipsum dolor sit amet');
  });

  test('toggle menu', function () {
    component.eventToggleOptions();
    assert.equal(component.displayOptions, true);
    component.eventToggleOptions();
    assert.equal(component.displayOptions, false);
  });
});
