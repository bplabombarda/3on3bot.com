import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';

require('./index.styl');

render(
    <Root />,
    document.getElementById('main')
);
