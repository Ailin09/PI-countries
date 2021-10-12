const { Country, Activity } = require("../db")

const getAllCountriesDb = async () => {  //me traigo de la db
    return await Country.findAll({
        attributes: ['id', 'name', 'image', 'continent', 'capital', 'subregion', 'area', "population"],
        include: Activity,
    });
}


const getAllCountries = async (req, res) => {

    try {
        const name = req.query.name
        const countriesTotal = await getAllCountriesDb();


        if (name) {
            let countryName = await countriesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            countryName.length ?
                res.status(200).send(countryName) :
                res.status(400).send("No está el país");
        } else {
            res.status(200).send(countriesTotal);
        }

    } catch (error) {
        res.status(500).send("Error al obtener todos los countries")
    }
}

const getAllCountryByIdDb = async (id) => {

    return await Country.findAll({
        attributes: ['id', 'name', 'image', 'continent', 'capital', 'subregion', 'area', "population"],
        include: Activity,
        where: {
            id, // id: id
        }
    });
}

const getCountryById = async (req, res) => {
    try {
        const { idPais } = req.params;
        if (idPais.length === 3) {
            const country = await getAllCountryByIdDb(idPais.toUpperCase())
            if (country.length) {
                res.status(200).json(country[0]);

            } else {
                res.status(400).send("No se encontró el país por id")
            }
        } else {
            res.status(400).send("El id de país deben ser 3 letras")
        }
    } catch (error) {
        res.status(500).send("Error al obtener el country por id")
    }

}



module.exports = {
    getAllCountries,
    getCountryById,
}
