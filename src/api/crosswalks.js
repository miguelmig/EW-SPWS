const API_LAYER_ADDRESS = "http://localhost:3001/"

export const createCrosswalk = (state, latitude, longitude) => {
    console.log("Creating crosswalk: ")
    console.log("State: " + state + " Lat: " + latitude + " Long: " + longitude);
    const json = JSON.stringify({state: state, latitude: latitude, longitude: longitude});
    console.log(json)
    return fetch(API_LAYER_ADDRESS + "crosswalk", 
    {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: json
    }).then((response) => response.json())
}

export const getCrosswalks = () => {
    console.log("Getting crosswalks: ")
    return fetch(API_LAYER_ADDRESS + "crosswalks", 
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
}

export const getCrosswalk = (id) => {
    console.log("Getting crosswalk: " + id)
    return fetch(API_LAYER_ADDRESS + "crosswalk/" + id, 
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    }).then((response) => response.json())
}

export const updateCrosswalk = (id, state) => {
    console.log("Updating crosswalk: " + id)
    console.log("State: " + state);
    const json = JSON.stringify({id: id, state: state});
    return fetch(API_LAYER_ADDRESS + "crosswalk/" + id, 
    {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: json
    }).then((response) => response.json())
}

export const getNearbyPedestrians = (id) => {
    console.log("Getting crosswalk nearby pedestrians: " + id)
    return fetch(API_LAYER_ADDRESS + "crosswalk/" + id + "/nearby_pedestrians", 
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    }).then((response) => response.json())
}

export const getNearbyVehicles = (id) => {
    console.log("Getting crosswalk nearby vehicles: " + id)
    return fetch(API_LAYER_ADDRESS + "crosswalk/" + id + "/nearby_vehicles", 
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    }).then((response) => response.json())
}
