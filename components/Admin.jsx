import React from 'react';
import PouchDB from 'pouchdb';
import { db_url, items } from '../config';
import Form from './Form';

let db = new PouchDB(db_url);

export default class Admin extends React.Component {
    constructor (props) {
        super(props);
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

    onSubmit = (formData) => {
        let _id = this.state.select;
        db.get(_id).then(function (doc) {
            formData._rev = doc._rev;
            return db.put(formData);
        }).then(function () {
            console.log('update');
        }).catch(function (err) {
            console.log(err);
        });
    };

    render () {
        return (
            <div className="row">
                <div className="col-md-3">
                    <select key={'select'} value={this.state.select}
                            onChange={this.handleSelectChange}>
                        <option value="">-=Seleccionar=-</option>
                        {this.state.data.map((i, j) => {
                            return <option key={j} value={i._id}>{i.nickname}</option>;
                        })}
                    </select>
                    <Form onSubmit={this.onSubmit} disabled={this.state.select === ''}
                          formData={this.state.data.find((e) => {return e._id === this.state.select;})}/>
                </div>
            </div>
        );
    }
}
