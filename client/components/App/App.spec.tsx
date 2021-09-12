import { render } from '@testing-library/react';

import React from 'react';

import { App } from './App';

xit('<App />', () => {
  const result = render(<App />);

  expect(result.getByText('Locale Resource Editor')).toBeDefined();
});
