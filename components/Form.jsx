import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/bundle/react-input-range.css';
import { items } from '../config';

export default class Form extends React.Component {
    constructor (props) {
        super(props);
        this.state = {hotbar_slot: {slot: null, name: '', amount: '', desc: ''}, data: {}};
    }

    componentDidMount () {
        console.log('init form');
    }

    componentWillReceiveProps (nextProps) {
        this.state.data = nextProps.formData;
        this.setState(this.state);
    }

    hotbarClick = (slot) => {
        let state = this.state;
        state.hotbar_slot.slot = slot;
        let temp = this.state.data.hotbar.find((e) => {return e.slot == slot;});
        console.log(temp);
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
        let found = false;
        let data = {
            slot: this.state.hotbar_slot.slot,
            name: this.state.hotbar_slot.name,
            amount: this.state.hotbar_slot.amount,
            desc: this.state.hotbar_slot.desc,
        };
        let temp = this.state.data.hotbar.map((i, j) => {
            if (i.slot === this.state.hotbar_slot.slot) {
                found = true;
                i = data;
            }
            return i;
        });
        if (!found) {
            temp.push(data);
        }
        this.state.data.hotbar = temp;
        this.state.hotbar_slot = {slot: null, name: '', amount: '', desc: ''};
        this.setState(this.state);
    };

    render () {
        let data = this.props.formData;
        if (data === undefined) {
            return '';
        }
        let hotbar = this.state.data.hotbar;
        return (
            <form>
                <datalist id="items">
                    {items.map((item, key) =>
                        <option key={key} value={item}/>,
                    )}
                </datalist>
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
                                       placeholder={'comentario'}
                                       onChange={(e) => {
                                           this.state.hotbar_slot.desc = e.target.value;
                                           this.setState(this.state);
                                       }}/>,
                                <button onClick={this.savehotbar}>Guardar item</button>,
                            ]
                            : ''}
                    </div>
                </div>
            </form>
        );
    }
}
