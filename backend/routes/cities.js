const express = require('express');
let router = express.Router();
const { validacionjwt, response500 } = require('../middelwares/middelwares');
const sequelize = require('../seq-conexion.js');


// CIUDADES
// GET /ciudades – JWT OK 
// POST /ciudades – JWT  OK
// PATCH /ciudades /{ciudad_id} - JWT OK 
// DELETE /regiones /{ciudad_id} – JWT OK

router.get('/', validacionjwt, async (req, res) => {

    try {
        const data = await sequelize.query('SELECT * FROM cities WHERE active = 1',
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

    const { city_name, country_id } = req.body;

    if (!city_name || !country_id) {
        const response = {
            "request info": [
                {
                    'code': 400,
                    'description': 'city_name and country_id cant be undefined',
                    'date': new Date()
                }
            ]
        }
        res.status(400).json(response);
    } else {
        try {
            const countryCheck = await sequelize.query('SELECT * FROM countries WHERE active = 1', {
                type: sequelize.QueryTypes.SELECT
            })
            if (!!countryCheck.length) {
                await sequelize.query('INSERT INTO cities (city_name,country_id, active) VALUES (?,?)', {
                    replacements: [city_name, country_id, 0],
                    type: sequelize.QueryTypes.INSERT
                })
                const response = {
                    "request info": [
                        {
                            'code': 200,
                            'description': 'new city added correctly!',
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
                            'description': `country_id does not exist or is inactive`,
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

router.patch('/:city_id', validacionjwt, async (req, res) => {
    const { city_name, country_id } = req.body;
    const { city_id } = req.params;
    let countryCheck;
    try {
        if (country_id) {
            countryCheck = await sequelize.query('SELECT * FROM countries WHERE active = 1 AND country_id = ? ', {
                replacements: [country_id],
                type: sequelize.QueryTypes.SELECT
            })

        }
        let cityCheck = await sequelize.query('SELECT * FROM cities WHERE city_id = ?',
            {
                replacements: [city_id],
                type: sequelize.QueryTypes.SELECT
            })
        if (!!cityCheck.length) {
            if (city_name) {
                await sequelize.query('UPDATE `cities` SET city_name = ? WHERE city_id = ?',
                    {
                        replacements: [city_name, city_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            if (!!countryCheck.length) {
                if (country_id) {
                    await sequelize.query('UPDATE `cities` SET country_id = ? WHERE city_id = ?',
                        {
                            replacements: [country_id, city_id],
                            type: sequelize.QueryTypes.UPDATE
                        })
                }
            } else {
                const response = {
                    "request info": [
                        {
                            'code': 400,
                            'description': `country_id ${country_id} does not exist or is inactive`,
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
                        'description': `city_id ${city_id} modified correctly!`,
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

router.delete('/:city_id', validacionjwt, async (req, res) => {
    const { eliminado } = req.query
    let eliminadoBool = JSON.parse(eliminado.toLowerCase());
    const { city_id } = req.params;

    if (eliminadoBool) {
        try {
            let companyCheck = await sequelize.query('SELECT * FROM cities WHERE city_id = ?',
                {
                    replacements: [city_id],
                    type: sequelize.QueryTypes.SELECT
                })
            if (!!companyCheck.length) {
                await sequelize.query('UPDATE `cities` SET active = ? WHERE city_id = ?',
                    {
                        replacements: [0, city_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
                const response = {
                    "request info": [
                        {
                            'code': 200,
                            'description': `city_id: ${city_id} is now inactive.`,
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
                            'description': `city_id: ${city_id} does not exist.`,
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