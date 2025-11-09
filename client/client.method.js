const client = require('./client');
exports.sendMessage = async (data) => { const res = await client.post('/avis/add', data); return res.data; };
exports.createArticle = async (data) => { const res = await client.post('/articles/add', data); return res.data; };
exports.createUser = async (data) => { const res = await client.post('/users/add', data); return res.data; };
