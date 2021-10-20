const e = require("express");
const { Activity, Country } = require("../db")


const addActivityToCountry = async (req, res) => {
    try {

        const { name, difficulty, duration, season, countries } = req.body;
        // validaciones
        if (!name || name.length > 30 || !difficulty || Number.parseInt(difficulty) > 5 || Number.parseInt(difficulty) <= 0) {
            res.status(400).send("Valores incorrectos o incompletos")
            return
        }

        let activity = await Activity.findOne({
            where: { name }
        })

        if (!activity) {
            activity = await Activity.create({
                name, difficulty, duration, season
            })
        }

        const countriesDb = await Country.findAll(
            {
                where: { name: countries }
            }
        )

        activity.addCountries(countriesDb);
        return res.status(200).send("Activity created")
    }

    catch (e) {
        return res.status(400).json({ error: e, msg: "Creation Failed" })
    }
};




module.exports = {
    addActivityToCountry,
}
