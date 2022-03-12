/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import kansuji from 'kansuji-ts';
import Display from './Display';

type KazuGuessProps = unknown;

type KazuGuessState = {
    numGuesses: number,
    totalGuesses: number,
    numCorrect: number,
    mode: 1 | 0,
    guess: string,
    answer: string[],
    min: number,
    max: number,
    status: 'question' | 'answer' | 'correct' | 'incorrect'
}

export default class KazuGuess extends React.Component<KazuGuessProps, KazuGuessState> {
    constructor(props: KazuGuessProps) {
        super(props);
        this.state = {
            numGuesses: 0,
            totalGuesses: 0,
            numCorrect: 0,
            mode: 1,
            guess: '',
            answer: [''],
            min: 0,
            max: 100,
            status: 'question',
        };
    }

    private getNewAnswer() {
        const { max, min } = this.state;
        const num = Math.floor((Math.random() * (Math.abs(max - min)) + min));

        this.setState({
            answer: [num.toString(), kansuji(num)],
        });
    }

    private setMin(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            min: parseInt(event.target.value, 10),
        });
    }

    private setMax(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            max: parseInt(event.target.value, 10),
        });
    }

    private changeMode() {
        this.resetAnswer();

        const { mode } = this.state;

        this.resetGuess();

        this.setState({
            numGuesses: 0,
            mode: mode === 1 ? 0 : 1,
        });
    }

    private updateGuess(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            guess: event.target.value,
        });
    }

    private checkGuess() {
        const {
            guess, answer, mode, numGuesses, totalGuesses, numCorrect,
        } = this.state;

        if (guess === answer[mode]) {
            this.setState({
                status: 'correct',
                numCorrect: numCorrect + 1,
            });

            this.getNewAnswer();
        } else {
            this.setState({
                status: 'incorrect',
                numGuesses: numGuesses + 1,
            });
        }

        this.setState({
            totalGuesses: totalGuesses + 1,
        });

        setTimeout(() => {
            this.setState({
                status: 'question',
            });
            this.resetGuess();
        }, 1000);
    }

    private resetAnswer() {
        this.getNewAnswer();

        this.resetGuess();

        this.setState({
            status: 'question',
        });
    }

    private resetGuess() {
        this.setState({
            guess: '',
        });
    }

    public render() {
        const { totalGuesses, numCorrect, answer, status, mode, guess, min, max } = this.state;

        return (
            <div className="kazuGuess">
                <div className="minMax">
                    <div className="rangeContainer">
                        <div>Min</div>
                        <input type="number" value={min} onChange={this.setMin.bind(this)} />
                    </div>
                    <div className="rangeContainer">
                        <div>Max</div>
                        <input type="number" value={max} onChange={this.setMax.bind(this)} />
                    </div>
                </div>
                <div className="displayBox">
                    <Display answer={answer[1 - mode]} option={status} />
                </div>
                <div className="guessInput">
                    <input type="text" value={guess} onChange={this.updateGuess.bind(this)} />
                </div>
                <div>
                    <button type="button" onClick={this.changeMode.bind(this)}>Mode</button>
                    <button type="button" onClick={this.checkGuess.bind(this)}>Check</button>
                    <button type="button" onClick={this.resetAnswer.bind(this)}>New</button>
                </div>
                <div>
                    <span>
                        {`${numCorrect} / ${totalGuesses}`}
                        <br />
                    </span>
                </div>
            </div>
        );
    }
}
