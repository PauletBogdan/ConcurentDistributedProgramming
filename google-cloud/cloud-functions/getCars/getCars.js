const { Datastore } = require("@google-cloud/datastore");

const projectId = 'arctic-signer-313913'
const keyFilename = 'arctic-signer-313913-ef0b1dc38936.json'

const datastore = new Datastore({ projectId, keyFilename });

const kind = 'Car';

const getCars = async () => {
  const query = datastore.createQuery(kind)
  return datastore.runQuery(query);
};

exports.getCars = (req, res) => {
  const [entities] = await getCars();
  return res.json(entities);
};