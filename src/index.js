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
    padded: true,
    title: 'Padded example w/ options',
    subtitle: 'Padded example w/ options',
    options: options,
    image: 'http://lorempixel.com/350/100/nature'
  }, componentPreviewBox);
  HenceCard.appendElementTo({
    title: 'Padded example w/ options',
    subtitle: 'Padded example w/ options',
    options: options,
    image: 'http://lorempixel.com/350/100/nature'
  }, componentPreviewBox);
  HenceCard.appendElementTo({
    title: 'Example w/ options & avatar',
    subtitle: 'Example w/ options',
    options: options,
    image: 'http://lorempixel.com/350/100/nature',
    avatar: 'http://lorempixel.com/100/100/people'
  }, componentPreviewBox);
  HenceCard.appendElementTo({
    title: 'Example w/ options & avatar centered',
    subtitle: 'Example w/ options',
    options: options,
    image: 'http://lorempixel.com/350/100/nature',
    avatar: 'http://lorempixel.com/100/100/people',
    avatarPosition: 'center'
  }, componentPreviewBox);
  HenceCard.appendElementTo({
    title: 'Example w/ options pre-opened, background image',
    displayOptions: true,
    image: 'http://lorempixel.com/350/100/nature',
    imagePosition: 'background',
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
