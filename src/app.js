const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/public', require('./routes/public'));
app.use('/api', require('./routes/private'));
/*
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the default API route',
}));
app.post('*', (req, res) => res.status(200).send({
    message: 'Welcome to the default API route',
}));
app.put('*', (req, res) => res.status(200).send({
    message: 'Welcome to the default API route',
}));
app.delete('*', (req, res) => res.status(200).send({
    message: 'Welcome to the default API route',
}));*/

app.listen(3000);
