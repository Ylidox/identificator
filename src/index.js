import React from 'react';
import ReactDom from 'react-dom/client';

import './styles/index.scss'

import { SystemInformation } from './components/SystemInformation';

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(<SystemInformation/>)