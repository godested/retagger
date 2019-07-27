import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Retagger } from '../src/Retagger';

it('renders without crashing', () => {
  const div = window.document.createElement('div');

  render(<Retagger.div.className />, div);
  unmountComponentAtNode(div);
});
