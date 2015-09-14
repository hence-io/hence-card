'use strict';

import HenceCard from './hence-card';
import docReady from 'doc-ready';
import _sample from 'lodash/collection/sample';
import _clone from 'lodash/lang/cloneDeep';
import fake from 'faker';

// Some common defaults
let description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur assumenda commodi' +
  ' cumque dolorem eaque eligendi id illum magnam nemo neque praesentium quam quas, saepe sequi soluta, tempore totam, voluptate?';

let action = (label = true)=> {
  return {
    label: label ? fake.commerce.product() : '',
    icon: _sample(['apple', 'android', 'facebook', 'google', 'github', 'linux', 'rebel', 'steam', 'windows  ']),
    action: (model, e)=> {
      alert('this is my option!');
    }
  };
};

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
    title: 'Padded example w/ actions',
    subtitle: 'Padded example w/ actions',
    actions: [action()],
    image: 'http://lorempixel.com/350/100/nature'
  }, componentPreviewBox);

  HenceCard.appendElementTo({
    title: 'Padded example w/ actions',
    subtitle: 'Padded example w/ actions',
    actions: [action(false), action(false)],
    image: 'http://lorempixel.com/350/100/nature',
    description: description
  }, componentPreviewBox);

  HenceCard.appendElementTo({
    title: 'Example w/ actions & avatar',
    subtitle: 'Example w/ actions',
    actions: [action(), action(), action()],
    actionsCentered: true,
    image: 'http://lorempixel.com/350/100/nature',
    avatar: 'http://lorempixel.com/100/100/people',
    description: description
  }, componentPreviewBox);

  HenceCard.appendElementTo({
    title: 'Example w/ actions & avatar centered',
    subtitle: 'Example w/ actions',
    actions: [action(false), action(false), action(false), action(false)],
    image: 'http://lorempixel.com/350/100/nature',
    avatar: 'http://lorempixel.com/100/100/people',
    avatarPosition: 'center'
  }, componentPreviewBox);

  HenceCard.appendElementTo({
    title: 'Example w/ actions pre-opened, background image',
    displayOptions: true,
    image: 'http://lorempixel.com/350/100/nature',
    imagePosition: 'background',
    actions: [action(), action(), action(), action(), action()]
  }, componentPreviewBox);

  HenceCard.appendElementTo({
    title: 'Kitchen Sink',
    displayOptions: true,
    actions: [action(false), action(false), action(false), action(false), action(false), action(false)]
  }, componentPreviewBox);
});
