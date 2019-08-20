import { configure } from '@storybook/react';

function loadStories() {
  require('../front/src/components/Button/Button.story');
  // You can require as many stories as you need.
}

configure(loadStories, module);