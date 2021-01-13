const { jwt, tokenKey } = require('../jwt.js');
const sequelize = require('../seq-conexion.js');
const response500 = {
    "errors": [
        {
            'code': 500,
            'description': 'Internal Server error',
            'date': new Date()
        }
    ], "data": [
        {
            "isAuthenticated":false
        }
    ]
};
//CHEQUEAR MIDDELWARESS QUE SON LOS DE DELILAH RESTO!!! RESPONSES MEJORADAS
function validacionExistencia(req, res, next) {
    (async () => {
        let table = `usuarios`;
        let param = `usuario`;
        let usuarios = await sequelize.query(`SELECT * FROM ${table} WHERE ${param} = '${req.body.usuario}'`, { type: sequelize.QueryTypes.SELECT })
        if (!!usuarios.length) {
            let response = {
                'code': 403,
                'Description': 'username already exists',
                'date': new Date()
            }
            res.status(403).json(response)
        } else {
            next();
        }
    })()

}
function validacionjwt(req, res, next) {
    console.log('valido jwt')
    try {
        const token = req.headers.authorization.split(' ')[1];

        const verificarToken = jwt.verify(token, tokenKey);

        if (verificarToken) {
            req.infoToken = verificarToken;
            console.log('validacionJWT next!')
            return next();
        } else {
            let response = {
                "errors": [
                    {
                        'code': 401,
                        'description': 'Incorrect access token',
                        'date': new Date()
                    }
                ]
            }
            res.status(401).send(response)
        }
    } catch (error) {
        console.log(error);

        let response = {
            "errors": [
                {
                    'code': 500,
                    'description': 'Internal server error',
                    'date': new Date()
                }
            ]

        }
        res.status(500).send(response)
    }
    

}

function validacionAdmin(req, res, next) {
    console.log('valido admin')
    if (req.infoToken == undefined) {
        let response = {
            'code': 400,
            'description': 'You must log in to continue',
            'date': new Date()
        }
        res.status(400).send(response)
    } else {
        const token = req.headers.authorization.split(' ')[1];
        const verificado = jwt.verify(token, tokenKey);

        if (verificado.admin !== 1) {
            let response = {
                'code': 401,
                'description': 'User does not have admin permissions',
                'date': new Date()
            }
            res.status(400).json(response);
        } else {
            console.log('paso el middelware')
            next();
        }
    }


}

module.exports = { validacionAdmin, validacionExistencia, validacionjwt,response500 };
