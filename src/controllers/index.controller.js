const { Pool } = require('pg');
import {dev} from '../config/db.config'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = new Pool(dev);

const signIn = async (req, res) => {
    const body = req.body;
    if(!body) {
        return res.sendStatus(403);
    }

    const { email, password } = req.body;
    if(!email) {
        return res.sendStatus(403);
    }
    if(!password) {
        return res.sendStatus(403);
    }

    const response = await pool.query('SELECT * from users ur where ur.email = $1', [email]);
    if(response.rows.length === 0){
        return res.status(401).json({body: 'Correo o contraseña incorrectos'});
    }

    const user = response.rows[0];
    var passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, body: 'Correo o contraseña incorrectos', token: null });

    const token = jwt.sign({id: user.id}, 'my_secret_key',{expiresIn: 86400});
    res.status(200).json({auth: true, token: token});

  };

const createUsers = async (req, res) => {
    const { name, email, password, phone } = req.body;

    if(!email){
        return res.status(400).json({body: 'El correo electronico es requerido'});
    }

    if(!password){
        return res.status(400).json({body: 'La contraseña es requerida'});
    }

    if(!phone){
        return res.status(400).json({body: 'El telefono es requerido'});
    }

    if(!name){
        return res.status(400).json({body: 'El nombre es requerido'});
    }

    const responseEmail = await pool.query('SELECT * from users ur where ur.email = $1', [email])
    const responsePhone = await pool.query('SELECT * from users ur where ur.phone = $1', [phone])

    if(responseEmail.rows.length > 0){
        return res.status(400).json({body: 'El correo electronico ya existente'});
    }

    if(responsePhone.rows.length > 0){
        return res.status(400).json({body: 'El telefono ya existe'});
    }

    var hashedPassword = bcrypt.hashSync(password, 8);

    await pool.query('INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4)', [name, email, hashedPassword, phone]);
    res.status(200).json({body: 'Usuario fue creado con exito'});

  };

const getUsers = async (req, res) => {
    const idUser = req.user.id;
    const response =  await pool.query('select id, email as correo,name as nombre_usuario,phone as telefono_usuario from users sr where sr.id=$1 ', [idUser]);
    res.status(200).json(response.rows[0]);
  };

module.exports = {
    getUsers, 
    createUsers,
    signIn,
};