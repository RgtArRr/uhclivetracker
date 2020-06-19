import React from 'react';
import Players from './Players';
import Clock from './Clock';
import PouchDB from 'pouchdb';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';

import { db_url, start } from '../config';

export default class Pantalla extends React.Component {
    constructor (props) {
        super(props);
        this.state = {channel: ''};
    }

    componentDidMount () {
    }

    onPlayerClick = (data) => {
        this.setState({channel: data.channel});
    };

    render () {
        return (
            <div className={'row'}>
                <div className={'col-md-3 sidebar'}>
                    <div className="page-header mc">
                        <Clock/>
                    </div>
                    <div className="list-group">
                        <Players onPlayerClick={this.onPlayerClick}/>
                    </div>
                </div>
                <div className={'col-md-9  col-md-offset-3'}>
                    {(this.state.channel !== ''
                        ? <ReactTwitchEmbedVideo height={window.innerHeight - 20} width={'100%'}
                                                 channel={this.state.channel}/>
                        : <div style={{height: window.innerHeight - 20, color: 'white'}}>Seleccione un player</div>)}
                </div>
            </div>
        );
    }
}
