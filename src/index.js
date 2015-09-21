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
    icon: _sample(['apple', 'android', 'facebook', 'google', 'github', 'linux', 'rebel', 'steam', 'windows', '']),
    float: _sample(['', 'left', 'right']),
    action: (model, e)=> {
      alert('this is my option!');
    }
  };
};

let image = 'http://lorempixel.com/250/150/nature';
let avatar = 'http://lorempixel.com/100/100/people';

// Ensure we're waiting for the document to actually be loaded before interacting with it.
docReady(()=> {
  // Location to bind preview components too. Use this to ensure the style guide will display these too.
  let componentPreviewBox = document.getElementById('component-previews');

  // Spawn various states of the component to preview them side by side
  HenceCard.appendElementTo({
    padded: true,
    title: 'Padded example w/ an action',
    subtitle: 'Padded example w/ an action',
    actions: [action()],
    image
  }, componentPreviewBox);

  HenceCard.appendElementTo({
    title: 'Example w/ actions, middle image',
    subtitle: 'Example w/ actions, middle image',
    actions: [action(false), action(false)],
    image,
    imagePosition: 'center',
    description
  }, componentPreviewBox);


  HenceCard.appendElementTo({
    title: 'Example w/ actions & avatar',
    subtitle: 'Example w/ actions',
    actions: [action(), action(), action()],
    actionsCentered: true,
    image,
    avatar,
    description,
    avatarShape: _sample(['square', 'circle'])
  }, componentPreviewBox);

  HenceCard.appendElementTo({
    title: 'Example w/ actions & avatar centered',
    subtitle: 'Example w/ actions',
    actions: [action(), action(), action()],
    image,
    avatar,
    avatarPosition: 'center',
    avatarShape: _sample(['square', 'circle'])
  }, componentPreviewBox);

  HenceCard.appendElementTo({
    title: 'Example w/ actions pre-opened, background image',
    displayOptions: true,
    image,
    imagePosition: 'background',
    actions: [action(), action(), action()],
    description
  }, componentPreviewBox);

  HenceCard.appendElementTo({
    title: 'Example w/ actions pre-opened, background image',
    displayOptions: true,
    image,
    imagePosition: 'background',
    avatar,
    avatarShape: _sample(['square', 'circle']),
    actions: [action(), action(), action()],
    description
  }, componentPreviewBox);

  HenceCard.appendElementTo({
    title: 'Icon Filled Actions',
    displayOptions: true,
    actions: [action(false), action(false), action(false), action(false), action(false), action(false)],
    description
  }, componentPreviewBox);
});
