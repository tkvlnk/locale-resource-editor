import { RenderResult, render } from '@testing-library/react';
import React from 'react';

import { App } from './App';

export class AppDriver {
  private renderResult!: RenderResult;

  created() {
    this.renderResult = render(<App />);
  }

  when = {
    filesWithContentsSelected: () => {}
  };
}
