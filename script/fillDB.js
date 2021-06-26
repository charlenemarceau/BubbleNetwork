const collections = require('../collections');
const mongoose = require('mongoose');


function make(type) {
    return new Promise((resolve, reject) => { //res = resolve, rej = reject
        console.log('make ' + type);
        collections[type].find({}, (err, models) => {
            if (err) {
                console.error('Cannot find ' + type + '. Aborting.');
                throw err;
            }

            console.log('now delete many');
            collections[type].deleteMany().then(() => {
                console.log(
                    'trying to fill ' + type + ' with data length = ' + data[type].length, 
                );

                // const chunks = [];
                // for (var i = 0; i < data[type].length; i += 50) {
                //     chunks.push(data[type].slice(i, i + 50));
                // }
                // if (chunks.length === 0) return res();
                // insertChunk(type, chunks, 0)
                // .then(() => {
                //     console.log('next type');
                //     return res();
                // })
                // .catch((err) => {
                //     console.error('Error append on add ' + type + ' -- err: ', err);
                //     return rej(err);
                // });
            });
        });
    });
}

console.log('fillDB starting in 2 second');
setTimeout(function() {
    make('user')
        .then(() => {
            console.log('end of the import, success');
            mongoose.disconnect().then(() => {
                process.exit();
            });
        })
        .catch((e) => {
            console.error('script failed', e);
        });
}, 2000);