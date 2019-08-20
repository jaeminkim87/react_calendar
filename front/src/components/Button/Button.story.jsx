import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import './Button.scss';

storiesOf('Button', module)
  .add('save', () => (
    <Button type="save" />
  ))
  .add('delete', () => (
    <Button type="del" />
  ))
  .add('cancel', () => (
    <Button type="cancel" />
  ));
