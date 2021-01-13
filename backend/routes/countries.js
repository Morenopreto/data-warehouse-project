const express = require('express');
let router = express.Router();
const { validacionjwt, response500 } = require('../middelwares/middelwares')
const sequelize = require('../seq-conexion.js');

// PAISES
// GET /paises – JWT  OK
// POST / paises – JWT OK
// PATCH / paises /{ paises _id} - JWT OK 
// DELETE / paises /{ paises _id} – JWT  OK


router.get('/', validacionjwt, async (req, res) => {

    try {
        const data = await sequelize.query('SELECT * FROM countries WHERE active = 1',
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

    const { country_name, region_id } = req.body;

    if (!country_name || !region_id) {
        const response = {
            "request info": [
                {
                    'code': 400,
                    'description': 'country_name and region_id cant be undefined',
                    'date': new Date()
                }
            ]
        }
        res.status(400).json(response);
    } else {
        try {
            const regionCheck = await sequelize.query('SELECT * FROM regions WHERE active = 1', {
                type: sequelize.QueryTypes.SELECT
            })
            if (!!regionCheck.length) {
                await sequelize.query('INSERT INTO countries (country_name,region_id, active) VALUES (?,?)', {
                    replacements: [country_name, region_id, 0],
                    type: sequelize.QueryTypes.INSERT
                })
                const response = {
                    "request info": [
                        {
                            'code': 200,
                            'description': 'new country added correctly!',
                            'date': new Date()
                        }
                    ]
                }
                res.status(200).json(response)
            } else {
                const response = {
                    "request info": [
                        {
                            'code': 400,
                            'description': `Region_id does not exist or is inactive`,
                            'date': new Date()
                        }
                    ]
                }
                res.status(400).json(response)
            }

        } catch (error) {
            res.status(500).json(response500)
        }
    }
})

router.patch('/:country_id', validacionjwt, async (req, res) => {
    const { country_name, region_id } = req.body;
    const { country_id } = req.params;
    let regionCheck;
    try {
        if (region_id) {
            regionCheck = await sequelize.query('SELECT * FROM regions WHERE active = 1 AND region_id = ?', {
                replacements: [region_id],
                type: sequelize.QueryTypes.SELECT
            })

        }
        let countryCheck = await sequelize.query('SELECT * FROM countries WHERE country_id = ?',
            {
                replacements: [country_id],
                type: sequelize.QueryTypes.SELECT
            })
        if (!!countryCheck.length) {
            if (country_name) {
                await sequelize.query('UPDATE `countries` SET country_name = ? WHERE country_id = ?',
                    {
                        replacements: [country_name, country_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (!!regionCheck.length) {
                if (region_id) {
                    await sequelize.query('UPDATE `countries` SET region_id = ? WHERE country_id = ?',
                        {
                            replacements: [region_id, country_id],
                            type: sequelize.QueryTypes.UPDATE
                        })
                }
            } else {
                const response = {
                    "request info": [
                        {
                            'code': 400,
                            'description': `region_id ${region_id} does not exist or is inactive`,
                            'date': new Date()
                        }
                    ]
                }
                res.status(400).json(response)
            }

            const response = {
                "request info": [
                    {
                        'code': 200,
                        'description': `country_id ${country_id} modified correctly!`,
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
                        'description': `country_id ${country_id} does not exist`,
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

router.delete('/:country_id', validacionjwt, async (req, res) => {
    const { eliminado } = req.query
    let eliminadoBool = JSON.parse(eliminado.toLowerCase());
    const { country_id } = req.params;

    if (eliminadoBool) {
        try {
            let companyCheck = await sequelize.query('SELECT * FROM countries WHERE country_id = ?',
                {
                    replacements: [country_id],
                    type: sequelize.QueryTypes.SELECT
                })
            if (!!companyCheck.length) {
                await sequelize.query('UPDATE `countries` SET active = ? WHERE country_id = ?',
                    {
                        replacements: [0, country_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
                const response = {
                    "request info": [
                        {
                            'code': 200,
                            'description': `country_id: ${country_id} is now inactive.`,
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
                            'description': `country_id: ${country_id} does not exist.`,
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