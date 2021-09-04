import './index.scss';
import React from 'react';
import { render } from 'react-dom';

import { App } from './components/App/App';

const root = document.createElement('div');
root.id = 'root';

document.body.prepend(root);

render(<App />, root);
