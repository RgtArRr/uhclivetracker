import React from 'react';
import { start } from '../config';

export default class Clock extends React.Component {
    constructor (props) {
        super(props);
        this.state = {time: ''};
    }

    componentDidMount () {
        let self = this;
        console.log('setup clock');
        setInterval(() => {
            let state = this.state;
            let now = new Date();
            let diff = now - start;
            state.time = '';
            if (diff < 0) {
                state.time = 'Tiempo estimado: ';
                diff *= -1;
            }

            let seconds = Math.floor(diff / 1000),
                hours = Math.floor(seconds / 3600);
            seconds -= hours * 3600;
            let minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;

            if (hours < 10) {hours = '0' + hours;}
            if (minutes < 10) {minutes = '0' + minutes;}
            if (seconds < 10) {seconds = '0' + seconds;}
            state.time += hours + ':' + minutes + ':' + seconds;

            self.setState(state);
        }, 1000);
    }

    render () {
        let text = `UHC Live 2: ${this.state.time}`;
        return <h2>{text}</h2>;
    }
}
