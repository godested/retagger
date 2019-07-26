import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Tagger } from '../Tagger';

it('renders without crashing', () => {
  const div = window.document.createElement('div');

  render(<Tagger.div.className />, div);
  unmountComponentAtNode(div);
});
