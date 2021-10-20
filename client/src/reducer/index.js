

const initialState = {
    countries: [],
    allCountries: [],
    allActivities: [],
    country: [],
    activities: [],
    details: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_COUNTRIES":

            const activities = [];
            action.payload.forEach(country => {
                country.activities.forEach(activity => {
                    const activityFound = activities.find(a => a.name === activity.name)
                    if (!activityFound) activities.push(activity);
                });
                country.activities.push(activities)
            })
            return {
                ...state,
                countries: action.payload, // manda todo lo q te mande GET_COUNTRIES a mi array countries
                allCountries: action.payload,
                allActivities: activities // listado de actividades 
            }
        case 'GET_NAME_COUNTRIES':
            return {
                ...state,
                countries: action.payload
            }
        case 'GET_COUNTRY_DETAILS':
            return {
                ...state,
                details: action.payload,
            };
        case 'POST_ACTIVITY':
            return {
                ...state,
            }
        case "FILTER_BY_CONTINENT":
            const allCountries = state.allCountries
            //filtramos todos los paises segun el filtro de continente
            const continentFound = action.payload.continent === "All" ? allCountries : allCountries.filter(e => e.continent === action.payload.continent);
            //sobre esos paises ya filtrados por continentes aplico el filtro de actividades si es que hay alguno seleccionado
            const countriesWithActivities =
                action.payload.season === "All"
                    ? continentFound
                    : continentFound.filter((country) => { // se ejecuta para cada uno de los paises 
                        //buscar los paises que tengan actividades y alguna de ellas sean de la temporada
                        let hasActivityForTheSeason = false // que no está incluido en el filtro
                        if (country.activities.length) {
                            hasActivityForTheSeason = (country.activities.find(activity => activity.season === action.payload.season)) !== undefined // se incluye
                        }
                        return hasActivityForTheSeason
                    });

            return {
                ...state,
                countries: countriesWithActivities
            }

        case "FILTER_BY_ALPHABET":
            let sortedArray = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: sortedArray
            };
        case 'FILTER_BY_POPULATION':
            let sortedPopulation = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (b.population > a.population) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (b.population > a.population) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: sortedPopulation
            };
        case "RESET_DETAIL":
            return {
                ...state,
                details: []
            }

        default:
            return state;
    }
}

export default rootReducer;