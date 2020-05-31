import React, {useState, useEffect} from 'react';
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import { getPedestrians } from "./api/pedestrians";
import { getCrosswalks } from "./api/crosswalks";
import { getVehicles } from "./api/vehicles";
import { PedestrianMarker } from './PedestrianMarker';
import { CrosswalkMarker } from './CrosswalkMarker';
import { VehicleMarker } from './VehicleMarker';

const getPedestrianMarkers = (pedestrians) => {
  const newMarkers = []
  pedestrians.forEach(pedestrian => {
    const pedestrian_extra = {
      type: "pedestrian",
      id: pedestrian.id,
      latitude: pedestrian.latitude,
      longitude: pedestrian.longitude
    }
      newMarkers.push(pedestrian_extra)
  })
  return newMarkers;
}

const getVehiclesMarkers = (vehicles) => {
  const newMarkers = []
  vehicles.forEach(vehicle => {
    newMarkers.push({
      type: "vehicle",
      id: vehicle.id,
      latitude: vehicle.latitude,
      longitude: vehicle.longitude
    })
  })
  return newMarkers;
}

const getCrosswalkMarkers = (crosswalks) => {
  const newMarkers = []
  crosswalks.forEach(crosswalk => {
      newMarkers.push({
        type: "crosswalk",
        id: crosswalk.id,
        state: crosswalk.state,
        latitude: crosswalk.latitude,
        longitude: crosswalk.longitude
      })
  })
  return newMarkers;
}



const HomePage = () => {
    const [markers, setMarkers] = useState([]);
    const [viewport, setViewport] = useState({ center: [41.558435, -8.397978], zoom: 16 });

    const fetchData = () => {
      const pedestrians_promise = getPedestrians()
      const crosswalk_promise = getCrosswalks();
      const vehicles_promise = getVehicles()

      Promise.all([pedestrians_promise, crosswalk_promise, vehicles_promise ])
      .then(([pedestrians, crosswalks, vehicles]) => {
        console.log("Pedestrians:")
        console.dir(pedestrians)
        console.log("Vehicles:")
        console.dir(vehicles)
        console.log("Crosswalks: ")
        console.dir(crosswalks)
        const newPedestriansMarkers = getPedestrianMarkers(pedestrians);
        const newCrosswalkMarkers = getCrosswalkMarkers(crosswalks);
        const newVehiclesMarkers = getVehiclesMarkers(vehicles);
        setMarkers([...newPedestriansMarkers, ...newCrosswalkMarkers, ...newVehiclesMarkers]);
      })
      .catch(err => console.log(err));
    }

    useEffect(() => {
      const interval = setInterval(() => {
        fetchData();
      }, 1000)
      return () => clearInterval(interval);
    }, []);

    const handleMapClick = (event) => {
    };
    
    return (
      <div>
        <h1>SPWS</h1>
        <ul>
        {
        /*markers.map(({ type, latitude, longitude, id }) => {
          return (
            <li>{type} : {latitude} {longitude} {id}</li>
          );
        })
      */}
        </ul>
        <Map
            className="map"
            viewport={viewport}
            maxZoom={18}
            minZoom={5}
            onclick={handleMapClick}
        >
        <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            id="mapbox/streets-v11"
            tileSize={512}
            zoomOffset={-1}
            maxZoom={18}
            accessToken="pk.eyJ1IjoicnVpLWZvbnNlY2EiLCJhIjoiY2s4YTJpN3R2MDBscDNtbXhqeGM3emdndiJ9.3LJzQcbcLzQP1evTVWItOQ"
        />
        {
        markers.map((props) => {
          if(props['type'] === "pedestrian")
          {
            return (
              <PedestrianMarker {...props}/>
            )
          }
          else if(props['type'] === "crosswalk")
          {
            return (
              <CrosswalkMarker {...props}/>
            )
          }
          else if(props['type'] === "vehicle")
          {
            return (
              <VehicleMarker {...props} />
            );
          }
          
        })
        }
    </Map>
    </div>
    )
  }

export default HomePage