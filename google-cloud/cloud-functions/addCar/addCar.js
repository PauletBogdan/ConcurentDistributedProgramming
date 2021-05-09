const { Datastore } = require("@google-cloud/datastore");
const uuid = require('uuid');

const projectId = 'theta-totem-313112'
const keyFilename = 'theta-totem-313112-401e637712a9.json'

const datastore = new Datastore({ projectId, keyFilename });

const kind = 'Car';

exports.addCar = (req, res) => {
  const { name, manufacturer } = req.query
  const id = uuid.v4();
  const key = datastore.key([kind, id]);
  const data = { id, name, manufacturer }
  const car = { key, data };

  datastore
    .save(car)
    .then(() => {
      console.log(`Saved ${car.key.name}: ${car.data.manufacturer}`);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
};