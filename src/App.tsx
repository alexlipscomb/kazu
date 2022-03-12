import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './App.css';
import SutenGuess from './SutenGuess';

function render() {
    ReactDOM.render(
        <SutenGuess />,
        document.getElementById('root'),
    );
}

render();
