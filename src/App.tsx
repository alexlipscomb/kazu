import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './App.css';
import KazuGuess from './KazuGuess';

function render() {
    ReactDOM.render(
        <KazuGuess />,
        document.getElementById('root'),
    );
}

render();
