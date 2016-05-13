import React from 'react'
import ReactDOM from 'react-dom'

require('./assets/css/main.scss');

//Components
import Slider from './components/Slider.js';

ReactDOM.render((
  <Slider />
), document.getElementById('slider'));
