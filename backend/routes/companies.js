const express = require('express');
let router = express.Router();
const { validacionjwt, response500 } = require('../middelwares/middelwares')
const sequelize = require('../seq-conexion.js');

// COMPAÑIAS
// GET /compañias – JWT  OK
// POST / compañias – JWT  OK
// PATCH / compañias /{compañia_id} - JWT OK 
// DELETE / compañias /{compañia_id} – JWT OK




router.get('/', validacionjwt, async (req, res) => {

    try {
        const data = await sequelize.query('SELECT * FROM companies WHERE active = 1',
            { type: sequelize.QueryTypes.SELECT })
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
    }
    catch (error) {
        console.log(error)
        res.status(500).json(response500)
    }

})

router.post('/', validacionjwt, async (req, res) => {
    const { company_name, company_address, mail, phone, city_id } = req.body;

    if (!company_name || !company_address || !mail || !phone || !city_id) {
        const response = {
            "request info": [
                {
                    'code': 400,
                    'description': 'company_name, company_address, mail, phone, city_id cant be undefined',
                    'date': new Date()
                }
            ]
        }
        res.status(400).json(response);
    } else {
        try {
            await sequelize.query('INSERT INTO companies (company_name, company_address, mail, phone, city_id, active) VALUES (?,?,?,?,?,?)', {
                replacements: [company_name, company_address, mail, phone, city_id, 0],
                type: sequelize.QueryTypes.INSERT
            })
            const response = {
                "request info": [
                    {
                        'code': 200,
                        'description': 'new company added correctly!',
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

router.patch('/:company_id', validacionjwt, async (req, res) => {
    const { company_name, company_address, mail, phone, city_id } = req.body;
    const { company_id } = req.params;

    try {
        let companyCheck = await sequelize.query('SELECT * FROM companies WHERE company_id = ?',
            {
                replacements: [company_id],
                type: sequelize.QueryTypes.SELECT
            })
        if (!!companyCheck.length) {
            if (company_name) {
                await sequelize.query('UPDATE `companies` SET company_name = ? WHERE company_id = ?',
                    {
                        replacements: [company_name, company_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (company_address) {
                await sequelize.query('UPDATE `companies` SET company_address = ? WHERE company_id = ?',
                    {
                        replacements: [company_address, company_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (mail) {
                await sequelize.query('UPDATE `companies` SET mail = ? WHERE company_id = ?',
                    {
                        replacements: [mail, company_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (phone) {
                await sequelize.query('UPDATE `companies` SET phone = ? WHERE company_id = ?',
                    {
                        replacements: [phone, company_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (city_id) {
                await sequelize.query('UPDATE `companies` SET city_id = ? WHERE company_id = ?',
                    {
                        replacements: [city_id, company_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }

            const response = {
                "request info": [
                    {
                        'code': 200,
                        'description': `company_id ${company_id} modified correctly!`,
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
                        'description': `company_id ${company_id} does not exist`,
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

router.delete('/:company_id', validacionjwt, async (req, res) => {
    const { eliminado } = req.query
    let eliminadoBool = JSON.parse(eliminado.toLowerCase());
    const { company_id } = req.params;

    if (eliminadoBool) {
        try {
            let companyCheck = await sequelize.query('SELECT * FROM companies WHERE company_id = ?',
                {
                    replacements: [company_id],
                    type: sequelize.QueryTypes.SELECT
                })
            if (!!companyCheck.length) {
                await sequelize.query('UPDATE `companies` SET active = ? WHERE company_id = ?',
                    {
                        replacements: [0, company_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
                const response = {
                    "request info": [
                        {
                            'code': 200,
                            'description': `company_id: ${company_id} is now inactive.`,
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
                            'description': `company_id: ${company_id} does not exist.`,
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