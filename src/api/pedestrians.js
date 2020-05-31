const API_LAYER_ADDRESS = "http://localhost:3001/"
export const getPedestrians = () => {
    console.log("Getting pedestrians: ")
    return fetch(API_LAYER_ADDRESS + "pedestrians", 
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
}

export const createPedestrian = (latitude, longitude) => {
    console.log("Creating pedestrian: ")
    console.log("Lat: " + latitude + " Long: " + longitude);
    const json = JSON.stringify({latitude: latitude, longitude: longitude});
    console.log(json)
    return fetch(API_LAYER_ADDRESS + "pedestrian", 
    {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: json
    }).then((response) => response.json())
}