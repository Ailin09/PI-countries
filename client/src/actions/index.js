import axios from "axios";
//conexion
export function getCountries() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data
        })
    }
}



export const getNameCountries = (name) => {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: 'GET_NAME_COUNTRIES',
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
};

export const getCountryDetails = (id) => {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/countries/${id}`);
            console.log(json.data)
            return dispatch({
                type: 'GET_COUNTRY_DETAILS',
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const postActivity = (payload) => {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/activity', payload);
            return response;
        } catch (e) {
            console.error(e);
        }
    };
};
export function filterCountriesByContinent(payload) {
    return {
        type: "FILTER_BY_CONTINENT",
        payload
    }

}


export const filterByAlphabet = (payload) => {
    return {
        type: 'FILTER_BY_ALPHABET',
        payload,
    };
};

export const filterByPopulation = (payload) => {
    return {
        type: 'FILTER_BY_POPULATION',
        payload,
    };
};


export const resetDetail = () => {
    return {
        type: "RESET_DETAIL",
    }
}