import React, {useState, useEffect} from 'react';
import { Container, Header } from 'semantic-ui-react'
import {getCrosswalk, getNearbyPedestrians, getNearbyVehicles} from './api/crosswalks';


const CrosswalkDetailPage = ({match}) => {
    const {crosswalkID} = match.params;
    const [crosswalk, setCrosswalk] = useState();

    const fetchData = () => {
        const crosswalk_info_promise = getCrosswalk(crosswalkID);
        const nearby_pedestrians_promise = getNearbyPedestrians(crosswalkID);
        const nearby_vehicles_promise = getNearbyVehicles(crosswalkID);
        Promise.all([crosswalk_info_promise, nearby_pedestrians_promise, nearby_vehicles_promise])
        .then(([crosswalk, nearby_pedestrians, nearby_vehicles]) => {
            console.log("Details:")
            console.log(crosswalk);
            console.log(nearby_pedestrians);
            console.log(nearby_vehicles);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container text style={{marginTop: '7em'}}>
            <Header as="h1">Crosswalk Details</Header>

        </Container>
    )
}

export default CrosswalkDetailPage;