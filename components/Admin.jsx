import React from 'react';
import PouchDB from 'pouchdb';
import { db_url, items } from '../config';
import Form from '@rjsf/core';

let db = new PouchDB(db_url);

const schema = {
    title: 'Player',
    type: 'object',
    required: ['X', 'Z', 'isNether', 'show', 'health', 'armor', 'absorption'],
    properties: {
        show: {type: 'boolean', title: 'Mostrar en la página', default: true},
        armor: {
            title: 'Armadura',
            type: 'integer',
            minimum: 0,
            maximum: 20,
        },
        health: {
            title: 'Corazones',
            type: 'integer',
            minimum: 0,
            maximum: 20,
        },
        absorption: {
            title: 'Corazones dorados',
            type: 'integer',
            default: 0,
            minimum: 0,
            maximum: 20,
        },
        hotbar: {
            type: 'array',
            title: 'HotBar',
            items: {
                type: 'string',
                default: 'empty',
                examples: items,
            },
        },
        isNether: {type: 'boolean', title: 'En el Nether', default: false},
        isDeath: {type: 'boolean', title: 'Esta muerto', default: false},
        X: {type: 'integer', title: 'Coord X', default: 0},
        Z: {type: 'integer', title: 'Coord Z', default: 0},
    },
};

const uiSchema = {
    health: {
        'ui:widget': 'range',
    },
    armor: {
        'ui:widget': 'range',
    },
    absorption: {
        'ui:widget': 'range',
    },
};

export default class Mapa extends React.Component {
    constructor (props) {
        super(props);
        this.ref = React.createRef();
        this.state = {select: '', data: []};
    }

    componentDidMount () {
        let self = this;
        let update = () => {
            db.allDocs({include_docs: true, descending: true}, function (err, doc) {
                let state = self.state;
                let temp = [];

                doc.rows.forEach((r) => {
                    temp.push(r.doc);
                });
                state.data = temp;
                self.setState(state);
            });
        };

        update();

        db.changes({
            since: 'now',
            live: true,
            include_docs: true,
        }).on('change', function (change) {
            console.log(1);
            update();
        });
    }

    handleSelectChange = (event) => {
        let self = this;
        let state = self.state;
        state.select = event.target.value === '0' ? null : event.target.value;
        self.setState(state);
    };
    onSubmit = (event) => {
        let data = event.formData;
        let _id = this.state.select;
        db.get(_id).then(function (doc) {
            data._rev = doc._rev;
            return db.put(data);
        }).then(function (response) {
            console.log('update');
        }).catch(function (err) {
            console.log(err);
        });
    };

    render () {
        return (
            <div className="formulario-admin">
                <div className="d-block">
                    <select key={'select'} value={this.state.select}
                            onChange={this.handleSelectChange}>
                        <option value="">-=Seleccionar=-</option>
                        {this.state.data.map((i, j) => {
                            return <option key={j} value={i._id}>{i.nickname}</option>;
                        })}
                    </select>
                </div>
                <div className={'formulario-datos'}>
                    <Form schema={schema} uiSchema={uiSchema}
                          onSubmit={this.onSubmit}
                          onError={(e) => {console.log(e);}}
                          formData={this.state.data.find((e) => {return e._id === this.state.select;})}
                          disabled={this.state.select === ''}/>
                </div>
            </div>
        );
    }
}
