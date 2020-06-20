import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/bundle/react-input-range.css';
import { items } from '../config';

export default class Form extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hotbar_slot: {slot: null, name: '', amount: '', desc: ''},
            armor_slot: {slot: null, name: '', amount: '', desc: ''},
            data: {},
        };
    }

    componentDidMount () {
        console.log('init form');
    }

    componentWillReceiveProps (nextProps) {
        this.state.data = nextProps.formData;
        this.setState(this.state);
    }

    armorClick = (slot) => {
        let state = this.state;
        state.armor_slot.slot = slot;
        let temp = this.state.data.armor_inventory.find((e) => {return e.slot === slot;});
        if (temp) {
            state.armor_slot.name = temp.name;
            state.armor_slot.desc = temp.desc;
        } else {
            state.armor_slot.name = '';
            state.armor_slot.desc = '';
        }
        this.setState(state);
    };

    savearmor = (e) => {
        e.preventDefault();
        let data = {
            slot: this.state.armor_slot.slot,
            name: this.state.armor_slot.name,
            desc: this.state.armor_slot.desc,
        };
        let slot = this.state.data.armor_inventory.findIndex((ele) => {return ele.slot === data.slot;});
        if (slot !== -1) {
            if (data.name !== '') {
                this.state.data.armor_inventory[slot] = data;
            } else {
                this.state.data.armor_inventory.splice(slot, 1);
            }
        } else {
            if (data.name !== '') {
                this.state.data.armor_inventory.push(data);
            }
        }
        this.state.armor_slot = {slot: null, name: '', desc: ''};
        this.setState(this.state);
    };

    hotbarClick = (slot) => {
        let state = this.state;
        state.hotbar_slot.slot = slot;
        let temp = this.state.data.hotbar.find((e) => {return e.slot == slot;});
        if (temp) {
            state.hotbar_slot.name = temp.name;
            state.hotbar_slot.amount = temp.amount;
            state.hotbar_slot.desc = temp.desc;
        } else {
            state.hotbar_slot.name = '';
            state.hotbar_slot.amount = '';
            state.hotbar_slot.desc = '';
        }
        this.setState(state);
    };

    savehotbar = (e) => {
        e.preventDefault();
        let data = {
            slot: this.state.hotbar_slot.slot,
            name: this.state.hotbar_slot.name,
            amount: this.state.hotbar_slot.amount,
            desc: this.state.hotbar_slot.desc,
        };
        let slot = this.state.data.hotbar.findIndex((ele) => {return ele.slot === data.slot;});
        if (slot !== -1) {
            if (data.name !== '') {
                this.state.data.hotbar[slot] = data;
            } else {
                this.state.data.hotbar.splice(slot, 1);
            }
        } else {
            if (data.name !== '') {
                this.state.data.hotbar.push(data);
            }
        }
        this.state.hotbar_slot = {slot: null, name: '', amount: '', desc: ''};
        this.setState(this.state);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.data);
    };

    render () {
        let data = this.props.formData;
        if (data === undefined) {
            return '';
        }
        let hotbar = this.state.data.hotbar;
        let helmet = this.state.data.armor_inventory.find((e) => {return e.slot === 'helmet';});
        let chestplate = this.state.data.armor_inventory.find((e) => {return e.slot === 'chestplate';});
        let leggings = this.state.data.armor_inventory.find((e) => {return e.slot === 'leggings';});
        let boots = this.state.data.armor_inventory.find((e) => {return e.slot === 'boots';});

        return (
            <form>
                <datalist id="items">
                    {items.map((item, key) =>
                        <option key={key} value={item}/>,
                    )}
                </datalist>
                <datalist id="helmet">
                    <option value="empty_armor_slot_helmet"/>
                    <option value="leather_helmet"/>
                    <option value="chainmail_helmet"/>
                    <option value="iron_helmet"/>
                    <option value="golden_helmet"/>
                    <option value="diamond_helmet"/>
                </datalist>
                <datalist id="chestplate">
                    <option value="empty_armor_slot_chestplate"/>
                    <option value="leather_chestplate"/>
                    <option value="chainmail_chestplate"/>
                    <option value="iron_chestplate"/>
                    <option value="golden_chestplate"/>
                    <option value="diamond_chestplate"/>
                </datalist>
                <datalist id="leggings">
                    <option value="empty_armor_slot_leggings"/>
                    <option value="leather_leggings"/>
                    <option value="chainmail_leggings"/>
                    <option value="iron_leggings"/>
                    <option value="golden_leggings"/>
                    <option value="diamond_leggings"/>
                </datalist>
                <datalist id="boots">
                    <option value="empty_armor_slot_boots"/>
                    <option value="leather_boots"/>
                    <option value="chainmail_boots"/>
                    <option value="iron_boots"/>
                    <option value="golden_boots"/>
                    <option value="diamond_boots"/>
                </datalist>
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={this.state.data.isNether}
                            onChange={(e) => {
                                this.state.data.isNether = e.target.checked;
                                this.setState(this.state);
                            }}/> En el nether
                    </label>
                </div>
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={this.state.data.isDeath}
                            onChange={(e) => {
                                this.state.data.isDeath = e.target.checked;
                                this.setState(this.state);
                            }}/> Ha Muerto
                    </label>
                </div>
                <div className="form-group">
                    <label>Armadura</label>
                    <InputRange
                        maxValue={20}
                        minValue={0}
                        value={this.state.data.armor}
                        onChange={(value) => {
                            this.state.data.armor = value;
                            this.setState(this.state);
                        }}/>
                </div>
                <div className="form-group">
                    <label>Corazones</label>
                    <InputRange
                        maxValue={20}
                        minValue={0}
                        value={this.state.data.health}
                        onChange={(value) => {
                            this.state.data.health = value;
                            this.setState(this.state);
                        }}/>
                </div>
                <div className="form-group">
                    <label>Corazones dorados</label>
                    <InputRange
                        maxValue={20}
                        minValue={0}
                        value={this.state.data.absorption}
                        onChange={(value) => {
                            this.state.data.absorption = value;
                            this.setState(this.state);
                        }}/>
                </div>
                <div className="form-group">
                    <label>Hotbar <small>Se muestra para los objetos importantes</small></label>
                    <div className="panel-footer">
                        <div className="inventory">
                            <div className="slotSpace">
                                {new Array(9).fill(0).map((i, j) => {
                                    let slot = hotbar.find((e) => {return e.slot === j;});
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
                    <div>
                        {this.state.hotbar_slot.slot !== null ?
                            [
                                <input type="text" className="form-control" list="items"
                                       value={this.state.hotbar_slot.name}
                                       placeholder={'nombre del item'}
                                       onChange={(e) => {
                                           this.state.hotbar_slot.name = e.target.value;
                                           this.setState(this.state);
                                       }}/>,
                                <input type="number" className="form-control"
                                       value={this.state.hotbar_slot.amount}
                                       placeholder={'cantidad, dejar vacio si es solo 1'}
                                       onChange={(e) => {
                                           this.state.hotbar_slot.amount = e.target.value;
                                           this.setState(this.state);
                                       }}/>,
                                <input type="text" className="form-control"
                                       value={this.state.hotbar_slot.desc}
                                       placeholder={'comentario/encantamientos'}
                                       onChange={(e) => {
                                           this.state.hotbar_slot.desc = e.target.value;
                                           this.setState(this.state);
                                       }}/>,
                                <button className="btn btn-info" onClick={this.savehotbar}>Guardar item</button>,
                            ]
                            : ''}
                    </div>
                </div>
                <div className="form-group">
                    <label>Armadura</label>
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
                                <img src={`static/item/${leggings ? leggings.name : 'empty_armor_slot_leggings'}.png`}
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
                    <div>
                        {this.state.armor_slot.slot !== null ?
                            [
                                <input type="text" className="form-control" list={this.state.armor_slot.slot}
                                       value={this.state.armor_slot.name}
                                       placeholder={'nombre del item'}
                                       onChange={(e) => {
                                           this.state.armor_slot.name = e.target.value;
                                           this.setState(this.state);
                                       }}/>,
                                <input type="text" className="form-control"
                                       value={this.state.armor_slot.desc}
                                       placeholder={'comentario/encantamientos'}
                                       onChange={(e) => {
                                           this.state.armor_slot.desc = e.target.value;
                                           this.setState(this.state);
                                       }}/>,
                                <button className="btn btn-info" onClick={this.savearmor}>Guardar item</button>,
                            ]
                            : ''}
                    </div>
                </div>
                <button className="btn btn-default" onClick={this.handleSubmit}>Guardar</button>
            </form>
        );
    }
}
