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
            let health_golden = data.absorption;
            let armor_empty = (10 - Math.round(armor / 2));
            let health_empty = (10 - Math.round(health / 2));

            let helmet = data.armor_inventory.find((e) => {return e.slot === 'helmet';});
            let chestplate = data.armor_inventory.find((e) => {return e.slot === 'chestplate';});
            let leggings = data.armor_inventory.find((e) => {return e.slot === 'leggings';});
            let boots = data.armor_inventory.find((e) => {return e.slot === 'boots';});
            return (
                <div className="panel panel-default" key={'player' + j}
                     onDoubleClick={() => {this.props.onPlayerClick(data);}}>
                    <div className={'panel-heading '}>{data.nickname}
                        <span className={'isnether'}
                              title={data.isNether ? 'Esta en el nether' : 'Esta en el overworld'}>
                            <img src={`static/gui/${data.isNether ? 'nether' : 'overworld'}.png`} alt=""/>
                        </span>
                    </div>
                    <div className="panel-body">
                        <img style={{float: 'left', paddingRight: '5px'}} src={`${skin_url}/${data._id}?scale=2`}
                             alt=""/>
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
                        {new Array(Math.round(health_golden / 2)).fill(0).map((i, j) => {
                            health_golden = health_golden - 2;
                            return <img key={'health_golden' + j} alt={'healt_golden'} className={'stats'}
                                        src={`static/gui/heart_golden_${health_golden < 0 ? 'half' : 'full'}.png`}/>;
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

                        <div className="slotSpace">
                            <div className="slot" onClick={() => this.armorClick('helmet')}>
                                <div className="item" title={helmet ? helmet.desc : ''}>
                                    <img src={`static/item/${helmet ? helmet.name : 'empty_armor_slot_helmet'}.png`}
                                         alt={'item'}/>
                                </div>
                            </div>
                            <div className="slot" onClick={() => this.armorClick('chestplate')}>
                                <div className="item" title={chestplate ? chestplate.desc : ''}>
                                    <img alt={'item'}
                                         src={`static/item/${chestplate
                                             ? chestplate.name
                                             : 'empty_armor_slot_chestplate'}.png`}/>
                                </div>
                            </div>
                            <div className="slot" onClick={() => this.armorClick('leggings')}>
                                <div className="item" title={leggings ? leggings.desc : ''}>
                                    <img src={`static/item/${leggings
                                        ? leggings.name
                                        : 'empty_armor_slot_leggings'}.png`}
                                         alt={'item'}/>
                                </div>
                            </div>
                            <div className="slot" onClick={() => this.armorClick('boots')}>
                                <div className="item" title={boots ? boots.desc : ''}>
                                    <img src={`static/item/${boots ? boots.name : 'empty_armor_slot_boots'}.png`}
                                         alt={'item'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <div className="inventory">
                            <div className="slotSpace">
                                {new Array(9).fill(0).map((i, j) => {
                                    let slot = data.hotbar.find((e) => {return e.slot === j;});
                                    return (
                                        <div className="slot" key={j} onClick={() => this.hotbarClick(j)}>
                                            {slot ?
                                                <div className="item" title={slot.desc}>
                                                    <img src={`static/item/${slot.name}.png`} alt={'item'}/>
                                                    {Number(slot.amount) > 1 ?
                                                        <div className="number">{slot.amount}</div> : ''}
                                                </div>
                                                : ''}
                                        </div>);
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }) : '');
    }
}
