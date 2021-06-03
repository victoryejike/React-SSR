import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';

hydrate(<App data='Ejike' />, document.getElementById('root'))