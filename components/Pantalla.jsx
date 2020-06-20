import React from 'react';
import Players from './Players';
import Clock from './Clock';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';

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
                <div className={'col-md-3'}>
                    <div className="page-header mc">
                        <Clock/>
                    </div>
                    <div className="list-group sidebar">
                        <Players onPlayerClick={this.onPlayerClick}/>
                    </div>
                </div>
                <div className={'col-md-9  col-md-offset-3 text-center'}>
                    {(this.state.channel !== ''
                        ? <ReactTwitchEmbedVideo height={window.innerHeight - 20} width={'100%'}
                                                 channel={this.state.channel}/>
                        : <div className='seleccion-player'
                               style={{height: window.innerHeight - 20, color: 'white'}}>Seleccione un jugador</div>)}
                </div>
            </div>
        );
    }
}
