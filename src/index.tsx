import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppProvider } from './App.provider';

ReactDOM.render(<AppProvider/>, document.getElementById('root'));


