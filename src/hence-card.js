'use strict';
/**
 * @module hence-card
 */

import Hence from 'hence-component-framework';
import _defaults from 'lodash/object/defaultsDeep';

/**
 * HenceCard Component
 * @constructor
 */
let HenceCard = Hence.Ui({
  is: 'hence-card',
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  properties: {
    padded: Boolean,
    // Avatar
    avatar: String,
    avatarPosition: {
      type: String,
      value: 'top'
    },
    avatarShape: {
      type: String,
      value: 'circle'
    },
    displayAvatarTop: Boolean,
    displayAvatarCentered: Boolean,
    // Image
    image: String,
    imagePosition: {
      type: String,
      value: 'top'
    },
    displayImageTop: Boolean,
    displayImageCentered: Boolean,
    displayImageBackground: Boolean,
    // Content
    title: String,
    subtitle: String,
    description: String,
    tagLine: String,
    displayIntroTitle: {
      type: Boolean,
      computed: '_displayIntroTitle(displayAvatarCentered, displayImageTop)'
    },
    displayTitleCentered: {
      type: Boolean,
      computed: '_displayTitleCentered(avatar, title)'
    },
    displayIntroTitles: {
      type: Boolean,
      computed: '_displayIntroTitles(displayAvatarTop, displayIntroTitle, subtitle)'
    },
    // Actions
    actions: Array,
    actionsPosition: {
      type: String,
      value: 'bottom'
    },
    displayActionsCentered: Boolean,
    displayActionsBottom: Boolean,
    displayActionsSeparator: Boolean,
    source: String
  },

  /*********************************************************************************************************************
   * Computed
   ********************************************************************************************************************/
    _displayIntroTitle(displayAvatarCentered, displayImageTop) {
    return displayAvatarCentered || !displayImageTop;
  },
   _displayTitleCentered(avatar, title) {
    return !avatar && title;
  },
  _displayIntroTitles(displayAvatarTop, displayIntroTitle, subtitle) {
    return !displayAvatarTop && (displayIntroTitle || subtitle);
  },

  /*********************************************************************************************************************
   * Observers
   ********************************************************************************************************************/
  observers: [
    '_padded(padded)',
    '_avatarShape(avatarShape)',
    '_displayActionsSeparator(displayActionsSeparator)',
    '_displayDescription(description)',
    '_displayLineItem(tagLine)',
    '_displayAvatar(avatar, avatarPosition)',
    '_displayImage(image, imagePosition)',
    '_displayImageBackground(displayImageBackground)',
    '_displayActions(actions, actionsPosition)',
    '_prepareActions(actions.*)',
    '_displaySource(source)'
  ],

  _padded(padded) {
    // If flagged as padded, as the style class for it
    this.toggleClass('padded', padded);
  },

  _avatarShape(avatarShape) {
    let selectors = ['avatarTop', 'avatarCentered'];

    selectors.forEach(selector => {
      this.toggleClass('circle', avatarShape === 'circle', this.$[selector]);
    });
  },

  _displayActionsSeparator(displayActionsSeparator) {
    // If flagged as padded, as the style class for it
    this.toggleClass('bordered', displayActionsSeparator, this.$.actions);
  },

  _displayDescription(description) {
    let {$} = this;

    if (description instanceof HTMLElement) {
      $.description.appendChild(description);
    } else if(description) {
      $.description.innerHTML = description;
    }
  },

  _displaySource(source) {
    let {$} = this;

    if (source instanceof HTMLElement) {
      $.source.appendChild(source);
    } else if(source) {
      $.source.innerHTML = source;
    }
  },

  _displayLineItem(tagLine) {
    let {$} = this;

    if (tagLine instanceof HTMLElement) {
      $.tagLine.appendChild(tagLine);
    } else if(tagLine) {
      $.tagLine.innerHTML = tagLine;
    }
  },

  _displayAvatar(img, position) {
    if (img) {
      let [pos, alignment] = String(position || '').split(/-/);

      this.set('displayAvatarTop', pos === 'top');
      this.set('displayAvatarCentered', pos === 'center');

      if (alignment === 'right') {
        this.$$('#avatarTopColumn').classList.add('float-right');
      }
    }
  },

  _displayImage(img, position) {
    if (img) {
      let [pos, alignment] = String(position || '').split(/-/);

      this.set('displayImageTop', pos === 'top');
      this.set('displayImageCentered', pos === 'center');
      this.set('displayImageBackground', pos === 'background');
    }
  },

  _displayImageBackground(displayImageBackground){
    this.toggleClass('background-tile', displayImageBackground);
    this.style.backgroundImage = displayImageBackground ? `url('${this.image}')` : '';
    this.updateStyles();
  },

  _displayActions(actions, position) {
    if (actions && position) {
      let [pos, separator] = String(position || '').split(/-/);

      this.set('displayActionsCentered', pos === 'center');
      this.set('displayActionsBottom', pos === 'bottom' || !this.displayActionsCentered);
      this.set('displayActionsSeparator', separator === 'separator');
    }
  },

  _prepareActions(actions) {
    if (actions && actions.value) {
      actions.value.forEach(action=> {
        if (action.icon) {
          action.iconClass += ` fa-${action.icon} `;
        }
        if (action.float) {
          action.class += ` float-${action.float} `;
        }
      });

      this.$.actions.classList.add('padded');
      this.$.actionsCentered.classList.add('padded');
    }
  },

  /*********************************************************************************************************************
   * Event Listeners & Hooks
   ********************************************************************************************************************/

  'hook.action': Hence.hook('action'),

  /*********************************************************************************************************************
   * Element DOM Hooks
   ********************************************************************************************************************/

    attached() {
    let {$,$$} = this;

    //console.log('dist content',Polymer.dom($$('content')).getDistributedNodes());
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  behaviors: []
});

export default HenceCard;
