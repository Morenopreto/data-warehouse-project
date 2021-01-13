const express = require('express');
let router = express.Router();
const { validacionjwt, response500 } = require('../middelwares/middelwares')
const sequelize = require('../seq-conexion.js');

// REGIONES
// GET /regiones – JWT OK 
// POST / regiones – JWT  OK
// PATCH / regiones /{region_id} - JWT OK 
// DELETE / regiones /{region_id} – JWT  OK



router.get('/', validacionjwt, async (req, res) => {

    try {
        const data = await sequelize.query('SELECT * FROM regions WHERE active = 1',
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

    const { region_name } = req.body;

    if (!region_name) {
        const response = {
            "request info": [
                {
                    'code': 400,
                    'description': 'region_name cant be undefined',
                    'date': new Date()
                }
            ]
        }
        res.status(400).json(response);
    } else {
        try {
            await sequelize.query('INSERT INTO regions (region_name, active) VALUES (?,?)', {
                replacements: [region_name, 0],
                type: sequelize.QueryTypes.INSERT
            })
            const response = {
                "request info": [
                    {
                        'code': 200,
                        'description': 'new region added correctly!',
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

router.patch('/:region_id', validacionjwt, async (req, res) => {
    const { region_name } = req.body;
    const { region_id } = req.params;

    try {
        let companyCheck = await sequelize.query('SELECT * FROM regions WHERE region_id = ?',
            {
                replacements: [region_id],
                type: sequelize.QueryTypes.SELECT
            })
        if (!!companyCheck.length) {
            if (region_name) {
                await sequelize.query('UPDATE `regions` SET region_name = ? WHERE region_id = ?',
                    {
                        replacements: [region_name, region_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
            }
            const response = {
                "request info": [
                    {
                        'code': 200,
                        'description': `region_id ${region_id} modified correctly!`,
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
                        'description': `region_id ${region_id} does not exist`,
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

router.delete('/:region_id', validacionjwt, async (req, res) => {
    const { eliminado } = req.query
    let eliminadoBool = JSON.parse(eliminado.toLowerCase());
    const { region_id } = req.params;

    if (eliminadoBool) {
        try {
            let companyCheck = await sequelize.query('SELECT * FROM regions WHERE region_id = ?',
                {
                    replacements: [region_id],
                    type: sequelize.QueryTypes.SELECT
                })
            if (!!companyCheck.length) {
                await sequelize.query('UPDATE `regions` SET active = ? WHERE region_id = ?',
                    {
                        replacements: [0, region_id],
                        type: sequelize.QueryTypes.UPDATE
                    })
                const response = {
                    "request info": [
                        {
                            'code': 200,
                            'description': `region_id: ${region_id} is now inactive.`,
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
                            'description': `region_id: ${region_id} does not exist.`,
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