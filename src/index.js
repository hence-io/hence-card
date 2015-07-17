'use strict';

import HenceCompUiCard from './hence-comp-ui-card';

let options = [
  {
    label: 'Test',
    action: ()=> {
      alert('this is my option!');
    }
  }
];

let callToAction = {
  label: 'My Action',
  action: ()=> {
    alert('woohoo!');
  }
};

HenceCompUiCard.appendElementTo();
HenceCompUiCard.appendElementTo({
  title:'Padded example w/ options',
  padded: true,
  options: options
});
HenceCompUiCard.appendElementTo({
  title:'Example w/ options pre-opened',
  displayOptions: true,
  options: options
});
HenceCompUiCard.appendElementTo({
  title:'Example w/ call to action',
  callToAction: callToAction
});
HenceCompUiCard.appendElementTo({
  title:'Kitchen Sink',
  displayOptions: true,
  options: options,
  callToAction: callToAction
});

export * from './hence-comp-ui-card';
