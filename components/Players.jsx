import React from 'react';
import { db_url, skin_url } from '../config';
import PouchDB from 'pouchdb';

export default class Players extends React.Component {
    constructor (props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount () {
        console.log('setup db');
        let self = this;
        let db = new PouchDB(db_url);
        let update = () => {
            db.allDocs({include_docs: true, descending: true}, function (err, doc) {
                let state = self.state;
                let temp = [];
                if (doc) {
                    doc.rows.forEach((r) => {
                        temp.push(r.doc);
                    });
                    state.data = temp;
                    self.setState(state);
                }
            });
        };

        update();

        db.changes({
            since: 'now',
            live: true,
            include_docs: true,
        }).on('change', function () {
            update();
        });
    }

    render () {
        return (this.state.data.length > 0 ? this.state.data.map((i, j) => {
            let data = i;
            if (!data.hotbar) {
                data.hotbar = new Array(9).fill('empty');
            } else {
                if (data.hotbar.length < 9) {
                    data.hotbar = data.hotbar.concat(new Array(9 - data.hotbar.length).fill('empty'));
                }
            }
            let armor = data.armor;
            let health = data.health;
            let armor_empty = (10 - Math.round(armor / 2));
            let health_empty = (10 - Math.round(health / 2));
            return (
                <div className="panel panel-default" key={'player' + j}
                     onDoubleClick={() => {this.props.onPlayerClick(data);}}>
                    <div className={'panel-heading '}>{data.nickname}
                        <span className={'nether'}>En el Nether</span>
                    </div>
                    <div className="panel-body">
                        <img style={{float: 'left'}} src={`${skin_url}/${data.nickname}/80`} alt=""/>
                        {new Array(Math.round(armor / 2)).fill(0).map((i, j) => {
                            armor = armor - 2;
                            return <img key={'armor_' + j} alt={'armor'} className={'stats'}
                                        src={`static/gui/armor_${armor < 0 ? 'half' : 'full'}.png`}/>;
                        })}
                        {new Array(armor_empty).fill(0).map((i, j) => {
                            return <img key={'armor_empty' + j} alt={'armor'} className={'stats'}
                                        src={`static/gui/armor_empty.png`}/>;
                        })}
                        <br/>
                        {new Array(Math.round(health / 2)).fill(0).map((i, j) => {
                            health = health - 2;
                            return <img key={'health_' + j} alt={'health'} className={'stats'}
                                        src={`static/gui/hardcore_heart_${health < 0 ? 'half' : 'full'}.png`}/>;
                        })}
                        {new Array(health_empty).fill(0).map((i, j) => {
                            return <img key={'health_empty' + j} alt={'healt'} className={'stats'}
                                        src={`static/gui/hardcore_heart_empty.png`}/>;
                        })}

                    </div>
                    <div className="panel-footer">
                        <div className="inventory">
                            <div className="slotSpace">
                                {data.hotbar.map((i, j) => {
                                    return <div className="slot" key={j}>
                                        {i !== 'empty' ?
                                            <div className="item">
                                                <img src={`static/item/${i}.png`} alt={'item'}/>
                                            </div>
                                            : ''}
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }) : '');
    }
}
