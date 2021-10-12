const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getAllCountries, getCountryById } = require("./CountriesController")
const { addActivityToCountry } = require("./ActivitiesController")

const router = Router();


router.get("/countries", getAllCountries);
router.get("/countries/:idPais", getCountryById);
router.post("/activity", addActivityToCountry);

module.exports = router;



