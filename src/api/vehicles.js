const API_LAYER_ADDRESS = "http://localhost:3001/"
export const getVehicles = () => {
    console.log("Getting vehicles: ")
    return fetch(API_LAYER_ADDRESS + "vehicles", 
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
}

export const createVehicle = (latitude, longitude) => {
    console.log("Creating vehicle: ")
    console.log("Lat: " + latitude + " Long: " + longitude);
    const json = JSON.stringify({latitude: latitude, longitude: longitude});
    console.log(json)
    return fetch(API_LAYER_ADDRESS + "vehicle", 
    {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: json
    }).then((response) => response.json())
}