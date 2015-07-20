'use strict';

import _ from 'lodash';

elementSuite('hence-comp-ui-card', 'unit/index', ()=> {
  //suite('attributes', ()=> {
  test('should have a polymer class', (done)=> {
    // The karma-polymer-test adds some extra function calls to Mocha to work
    // around the timing issues of setting Polymer attributes. Set the attributes in
    // the `this.set` callback then check them in the `this.then` callback
    this.set((element)=> {
    }).then((element)=> {
      assert.equal(element.is, 'hence-comp-ui-card');
      done();
    });
  });

  test('should set a title', (done)=> {
    this.set((element)=> {
      element.title = 'Test test';
    }).then((element)=> {
      assert.equal(element.title, 'Test test');
      done();
    });
  });

  test('should be able to enable displaying it\'s options', (done) => {
    this.set((element)=> {
      element.eventToggleOptions();
    }).then((element)=> {
      assert.equal(element.displayOptions, true);
      done();
    });
  });
  //});
});
