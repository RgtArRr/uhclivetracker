const PouchDB = require('pouchdb');

let db = new PouchDB('http://localhost:5984/uhclive');

let data = [
    {
        _id: '5a04be65-7d02-4c08-955c-d274c7bf8384',
        nickname: 'killercreeper_55',
        channel: 'killercreeper55_',
        teamcolor: '#ff0000',
    },
    {
        _id: '3c4e86be-57f4-4f45-8158-c6547211a498',
        nickname: 'elrichmc',
        channel: 'elrichmc',
        teamcolor: '#0016ef',
    },
];

db.destroy().then(function (response) {
    db = new PouchDB('http://localhost:5984/uhclive');
    data.forEach((d, i) => {
        d.show = false;
        d.health = 20;
        d.armor = 20;
        d.hotbar = [];
        d.isNether = false;
        d.X = 0;
        d.Z = 0;
        db.put(d).then(function (response) {
            // handle response
        }).catch(function (err) {
            console.log(err);
        });
    });
}).catch(function (err) {
    console.log(err);
});



