import Component from '../../src/index';

describe('ES6 component Tests - hence-comp-ui-card', () => {
  let component;

  beforeEach(() => {
    component = new Component();
  });

  afterEach(() => {

  });

  it('should have the default greeting property set', () => {
    expect(component.properties.greeting.value).to.equal('Hello!');
  });

  it('should sayHello', () => {
    expect(component.sayHello()).to.equal('hence-comp-ui-card says, Hello World!');
  });

  it('should have a polymer config', () => {
    expect(component.polymerOptions().is).to.equal('hence-comp-ui-card');
  });
});
