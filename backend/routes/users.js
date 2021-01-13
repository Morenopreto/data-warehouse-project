
const express = require('express');
let router = express.Router();
const { jwt, tokenKey } = require('../jwt.js');
const { validacionAdmin, validacionjwt, response500 } = require('../middelwares/middelwares')
const sequelize = require('../seq-conexion.js');


// API
// USUARIOS
// GET /usuarios – JWT - Administradores OK
// POST /usuarios – JWT - Administradores OK
// PATCH /usuarios/{usuario_id} - JWT - Administradores OK
// DELETE /usuarios/{usuario_id} – JWT – Administradores OK
// POST /users/login OK


// CREATE NEW USERS
router.post('/', validacionjwt, validacionAdmin, async (req, res) => {
    // router.post('/', async (req, res) => {
    const { name, surname, mail, pass, admin, phone } = req.body;


    if (!name || !surname || !mail || !pass || !admin || !phone) {
        const response = {
            "request info": [
                {
                    'code': 400,
                    'description': 'name, surname, mail, pass, admin, phone cant be undefined',
                    'date': new Date()
                }
            ]
        }
        res.status(400).json(response);
    } else {
        try {
            await sequelize.query('INSERT INTO companies (name, surname, mail, pass, admin, phone, active) VALUES (?,?,?,?,?,?)', {
                replacements: [name, surname, mail, pass, admin, phone, 0],
                type: sequelize.QueryTypes.INSERT
            })
            const response = {
                "request info": [
                    {
                        'code': 200,
                        'description': 'new user added correctly!',
                        'date': new Date()
                    }
                ]
            }
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(response500)
        }
    }
})

// BRING ALL USERS
router.get('/', validacionjwt, validacionAdmin, async (req, res) => {
    try {
        const data = await sequelize.query('SELECT * FROM users WHERE  active = 1', {
            type: sequelize.QueryTypes.SELECT
        })
        const response = {
            "request info": [
                {
                    'code': 200,
                    'description': 'success!',
                    'date': new Date()
                }
            ],
            "data": data
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(response500)
    }
})
router.get('/', validacionjwt, validacionAdmin, async (req, res) => {
    try {
        const data = await sequelize.query('SELECT * FROM users WHERE  active = 1', {
            type: sequelize.QueryTypes.SELECT
        })
        const response = {
            "request info": [
                {
                    'code': 200,
                    'description': 'success!',
                    'date': new Date()
                }
            ],
            "data": data
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(response500)
    }
})
// //LOG IN
router.post('/login', async (req, res) => {
    const { pass, mail } = req.body

    try {
        const [data] = await sequelize.query(`SELECT * FROM users WHERE mail = ?`,
            {
                replacements: [mail],
                type: sequelize.QueryTypes.SELECT
            });
        if (data?.active == 0) {
            const response = {
                "errors": [
                    {
                        'code': 403,
                        'description': 'User is inactive',
                        'date': new Date()
                    }
                ]
            }
            res.status(403).json(response)
        } else {

            if (data?.mail === mail && data?.pass == pass) {
                let cifrado = {
                    'user_id': data.user_id,
                    'name': data.name,
                    'surname': data.surname,
                    'mail': data.mail,
                    'admin': data.admin,
                    'active': true

                }
                req.infoToken = jwt.sign(cifrado, tokenKey, { expiresIn: '1h' })
                const response = {
                    "request info":
                    {
                        'code': 200,
                        'description': 'success!',
                        'date': new Date()
                    }
                    ,
                    "data": {
                        "user_fullName": `${data.name} ${data.surname}`,
                        "admin": (data.admin) ? data.admin : data.admin,
                        "token": req.infoToken,
                        "isAuthenticated": true
                    }

                }
                res.status(200).json(response)
            } else {
                const response = {
                    "errors":
                    {
                        'code': 401,
                        'description': 'Incorrect Username or Pass',
                        'date': new Date()
                    }
                    , "data":
                    {
                        "isAuthenticated": false
                    }

                }
                res.status(401).json(response)
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(response500)
    }

})

router.patch('/:user_id', validacionjwt, validacionAdmin, async (req, res) => {
    const { name, surname, mail, pass, admin, phone } = req.body;
    const { user_id } = req.params;

    try {
        let chequeoUser = await sequelize.query('SELECT * FROM users WHERE user_id = ?',
            {
                replacements: [user_id],
                type: sequelize.QueryTypes.SELECT
            })
        if (!!chequeoUser.length) {
            if (name) {
                await sequelize.query('UPDATE `users` SET name = ? WHERE user_id = ?',
                    {
                        replacements: [name, user_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (surname) {
                await sequelize.query('UPDATE `users` SET surname = ? WHERE user_id = ?',
                    {
                        replacements: [surname, user_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (mail) {
                await sequelize.query('UPDATE `users` SET mail = ? WHERE user_id = ?',
                    {
                        replacements: [mail, user_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (pass) {
                await sequelize.query('UPDATE `users` SET pass = ? WHERE user_id = ?',
                    {
                        replacements: [pass, user_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (admin) {
                await sequelize.query('UPDATE `users` SET admin = ? WHERE user_id = ?',
                    {
                        replacements: [admin, user_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (phone) {
                await sequelize.query('UPDATE `users` SET phone = ? WHERE user_id = ?',
                    {
                        replacements: [phone, user_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            const response = {
                "request info": [
                    {
                        'code': 200,
                        'description': `user_id ${user_id} modified correctly!`,
                        'date': new Date()
                    }
                ]
            }
            res.status(200).json(response)
        }
        else {
            const response = {
                "request info": [
                    {
                        'code': 400,
                        'description': `user_id ${user_id} does not exist!`,
                        'date': new Date()
                    }
                ]
            }
            res.status(400).json(response)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(response500);
    }
})

router.delete('/:user_id', validacionjwt, validacionAdmin, async (req, res) => {

    const { eliminado } = req.query
    let eliminadoBool = JSON.parse(eliminado.toLowerCase());
    const { user_id } = req.params;

    if (eliminadoBool) {
        try {
            let chequeoUser = await sequelize.query('SELECT * FROM users WHERE user_id = ?',
                {
                    replacements: [user_id],
                    type: sequelize.QueryTypes.SELECT
                })
            if (!!chequeoUser.length) {
                await sequelize.query('UPDATE `users` SET active = ? WHERE user_id = ?',
                    {
                        replacements: [0, user_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
                const response = {
                    "request info": [
                        {
                            'code': 200,
                            'description': `user_id: ${user_id} is now inactive.`,
                            'date': new Date()
                        }
                    ]
                }
                res.status(200).json(response)
            }
            else {
                const response = {
                    "request info": [
                        {
                            'code': 400,
                            'description': `user_id: ${user_id} does not exist.`,
                            'date': new Date()
                        }
                    ]
                }
                res.status(400).json(response)
            }
        } catch (error) {
            res.status(500).send(response500);
        }

    }
    else {
        res.status(500).json('Parametro esperado eliminado=true');
    }
})
module.exports = router;
