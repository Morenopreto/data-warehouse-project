const express = require('express');
let router = express.Router();
const { validacionjwt, response500 } = require('../middelwares/middelwares')
const sequelize = require('../seq-conexion.js');

// CONTACTOS
// GET /contactos – JWT
// POST / contactos – JWT
// PATCH / contactos / {contactos} - JWT
// DELETE / contactos /{contactos} – JWT


router.get('/', validacionjwt, async (req, res) => {
    const { user_id } = req.infoToken;
    try {
        // const data = await sequelize.query('SELECT * FROM contacts WHERE active = 1 and user_id = ?',
        const data = await sequelize.query('SELECT contacts.name, contacts.surname, contacts.position, contacts.mail, contacts.interest, cities.city_name AS city, countries.country_name AS country, regions.region_name AS regions, companies.company_name AS company FROM contacts INNER JOIN cities ON contacts.city_id = cities.city_id INNER JOIN countries ON countries.country_id = cities.country_id  INNER JOIN regions ON countries.region_id = regions.region_id INNER JOIN companies ON companies.company_id = contacts.company_id WHERE contacts.active = 1 and user_id = ?',
            {
                replacements: [user_id],
                type: sequelize.QueryTypes.SELECT
            })
        const response = {
            "request info":
            {
                'code': 200,
                'description': 'success!',
                'date': new Date()
            }
            ,
            "data": data
        }
        res.status(200).json(response)
    }
    catch (error) {
        console.log(error)
        res.status(500).json(response500)
    }

})

router.post('/', validacionjwt, async (req, res) => {
    const { name, surname, position, mail, interest, company_id, city_id } = req.body;

    if (!name || !surname || !position || !mail || !interest || !company_id || !city_id) {
        const response = {
            "request info": [
                {
                    'code': 400,
                    'description': 'name, surname, position, mail, interest, company_id, city_id cant be undefined',
                    'date': new Date()
                }
            ]
        }
        res.status(400).json(response);
    } else {
        try {
            await sequelize.query('INSERT INTO contacts (name, surname, position, mail, interest, company_id, city_id, active) VALUES (?,?,?,?,?,?)', {
                replacements: [name, surname, position, mail, interest, company_id, city_id, 0],
                type: sequelize.QueryTypes.INSERT
            })
            const response = {
                "request info": [
                    {
                        'code': 200,
                        'description': 'new contact added correctly!',
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
//HASTA ACA INFO CORRECTA, NOSE SI ENDPOINTS CORRECTOS! REVISAR LOGICA

router.patch('/:contact_id', validacionjwt, async (req, res) => {
    const { name, surname, position, mail, interest, company_id, city_id } = req.body;
    const { contact_id } = req.params;

    try {
        let contactCheck = await sequelize.query('SELECT * FROM contacts WHERE contact_id = ?',
            {
                replacements: [contact_id],
                type: sequelize.QueryTypes.SELECT
            })
        if (!!contactCheck.length) {
            if (name) {
                await sequelize.query('UPDATE `contacts` SET name = ? WHERE contact_id = ?',
                    {
                        replacements: [name, contact_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (surname) {
                await sequelize.query('UPDATE `contacts` SET surname = ? WHERE contact_id = ?',
                    {
                        replacements: [surname, contact_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (position) {
                await sequelize.query('UPDATE `contacts` SET position = ? WHERE contact_id = ?',
                    {
                        replacements: [position, contact_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (mail) {
                await sequelize.query('UPDATE `contacts` SET mail = ? WHERE contact_id = ?',
                    {
                        replacements: [mail, contact_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (interest) {
                await sequelize.query('UPDATE `contacts` SET interest = ? WHERE contact_id = ?',
                    {
                        replacements: [interest, contact_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (company_id) {
                await sequelize.query('UPDATE `contacts` SET company_id = ? WHERE contact_id = ?',
                    {
                        replacements: [company_id, contact_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (city_id) {
                await sequelize.query('UPDATE `contacts` SET city_id = ? WHERE contact_id = ?',
                    {
                        replacements: [city_id, contact_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }


            const response = {
                "request info": [
                    {
                        'code': 200,
                        'description': `contact_id ${contact_id} modified correctly!`,
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
                        'description': `contact_id ${contact_id} does not exist`,
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

router.delete('/:contact_id', validacionjwt, async (req, res) => {
    const { eliminado } = req.query
    let eliminadoBool = JSON.parse(eliminado.toLowerCase());
    const { contact_id } = req.params;

    if (eliminadoBool) {
        try {
            let contactCheck = await sequelize.query('SELECT * FROM contacts WHERE contact_id = ?',
                {
                    replacements: [contact_id],
                    type: sequelize.QueryTypes.SELECT
                })
            if (!!contactCheck.length) {
                await sequelize.query('UPDATE `contacts` SET active = ? WHERE contact_id = ?',
                    {
                        replacements: [0, contact_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
                const response = {
                    "request info": [
                        {
                            'code': 200,
                            'description': `contact_id: ${contact_id} is now inactive.`,
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
                            'description': `contact_id: ${contact_id} does not exist.`,
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
        const response = {
            "request info": [
                {
                    'code': 400,
                    'description': `'eliminado' parameter must be boolean.`,
                    'date': new Date()
                }
            ]
        }
        res.status(400).json(response)
    }

})
module.exports = router;