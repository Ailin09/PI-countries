const axios = require("axios");
const { Country } = require("../db");


const getApiInfo = async () => { //api
    const apiUrl = await axios.get("https://restcountries.com/v2/all")
    const apiInfo = await apiUrl.data.map(e => {

        return {
            name: e.name,
            id: e.id,
            capital: e.capital,
            continent: e.region,
            area: e.area,
            subregion: e.subregion,
            population: e.population,
            image: e.flags.png,
        }
    })
    await Country.destroy({
        where: {
            // refrescamos
        }
    });
    await Country.bulkCreate(apiInfo);
}

module.exports = {
    getApiInfo
}