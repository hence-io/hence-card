'use strict';

import HenceCard from './hence-card';
import docReady from 'doc-ready';

// Some common defaults
let options = [
  {
    label: 'Test',
    action: (model, e)=> {
      alert('this is my option!');
    }
  }
];

let callToAction = {
  label: 'Sign Up Now!',
  align: 'right', // left/center/right
  action: (data, model, e)=> {
    console.log('call to action', [this, data, model, e]);
    alert(`Successful submission with: ${data.input.value}`);
  },
  input: {
    label: 'Enter your email here:',
    type: 'text',
    placeholder: 'Email',
    value: ''
  }
};

// Ensure we're waiting for the document to actually be loaded before interacting with it.
docReady(()=> {
  // Location to bind preview components too. Use this to ensure the style guide will display these too.
  let componentPreviewBox = document.getElementById('component-previews');

  // Spawn various states of the component to preview them side by side
  HenceCard.appendElementTo({
    title: 'Padded example w/ options',
    padded: true,
    options: options,
    image: 'http://placehold.it/350x50'
  }, componentPreviewBox);
  HenceCard.appendElementTo({
    title: 'Example w/ options pre-opened',
    displayOptions: true,
    options: options
  }, componentPreviewBox);
  HenceCard.appendElementTo({
    title: 'Example w/ call to action',
    callToAction: callToAction
  }, componentPreviewBox);
  HenceCard.appendElementTo({
    title: 'Kitchen Sink',
    displayOptions: true,
    options: options,
    callToAction: callToAction
  }, componentPreviewBox);
});
