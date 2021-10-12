const e = require("express");
const { Activity, Country } = require("../db")


const addActivityToCountry = async (req, res) => {
    try {
        // obtenemos los valores que mandó del post
        const { name, difficulty, duration, season, countries } = req.body;
        // validaciones
        if (!name || name.length > 30 || !difficulty || Number.parseInt(difficulty) > 5 || Number.parseInt(difficulty) <= 0) {
            res.status(400).send("Valores incorrectos o incompletos")
            return
        }
        // busca si la actividad ya existe
        let activity = await Activity.findOne({
            where: { name }
        })
        //si no existe la creo
        if (!activity) {
            activity = await Activity.create({
                name, difficulty, duration, season
            })
        }
        //busco los paises
        const countriesDb = await Country.findAll(
            {
                where: { name: countries }
            }
        )
        // uso la actividad encontrada o creada y le agrego los paises
        activity.addCountries(countriesDb);
        return res.status(200).send("Activity created")
    }
    //capturo cualquier error desconocido que pueda pasar en todo lo anterior
    catch (e) {
        return res.status(400).json({ error: e, msg: "Creation Failed" })
    }
};




module.exports = {
    addActivityToCountry,
}
