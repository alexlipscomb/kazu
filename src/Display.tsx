import * as React from 'react';

type DisplayProps = {
    answer: string,
    option : 'question' | 'answer' | 'correct' | 'incorrect'
}

export default function Display(props: DisplayProps) {
    let displayMessage;
    const { answer, option } = props;

    switch (option) {
    case 'question': {
        displayMessage = <div className="question">{answer}</div>;
        break;
    }
    case 'answer': {
        displayMessage = <div className="answer">{answer}</div>;
        break;
    }
    case 'correct': {
        displayMessage = <div className="correct">Correct!</div>;
        break;
    }
    case 'incorrect': {
        displayMessage = <div className="incorrect">Incorrect!</div>;
        break;
    }
    default: {
        displayMessage = <div className="question">{answer}</div>;
        break;
    }
    }

    return (
        <div className="displayContainer">
            {displayMessage}
        </div>
    );
}
