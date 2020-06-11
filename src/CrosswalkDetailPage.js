import React, {useState, useEffect} from 'react';
import { Container, Header } from 'semantic-ui-react'
import {getCrosswalk, getNearbyPedestrians, getNearbyVehicles, updateCrosswalk} from './api/crosswalks';
import { Form, Radio, Segment } from 'semantic-ui-react'

const CrosswalkDetailPage = ({match}) => {
    const {crosswalkID} = match.params;
    const [crosswalk, setCrosswalk] = useState();

    const fetchData = () => {
        const crosswalk_info_promise = getCrosswalk(crosswalkID);
        const nearby_pedestrians_promise = getNearbyPedestrians(crosswalkID);
        const nearby_vehicles_promise = getNearbyVehicles(crosswalkID);
        Promise.all([crosswalk_info_promise, nearby_pedestrians_promise, nearby_vehicles_promise])
        .then(([crosswalk_details, nearby_pedestrians, nearby_vehicles]) => {
            console.log("Details:")
            // Remove repeated pedestrians/vehicles
            if(nearby_pedestrians.pedestrians !== undefined)
            {
                nearby_pedestrians.pedestrians = nearby_pedestrians.pedestrians.filter((item, index) => {
                    return nearby_pedestrians.pedestrians.findIndex(i => {
                        return i.pedestrian_id === item.pedestrian_id;
                    }) === index;
                });
            }
            if(nearby_vehicles.vehicles !== undefined)
            {
                nearby_vehicles.vehicles = nearby_vehicles.vehicles.filter((item, index) => {
                    return nearby_vehicles.vehicles.findIndex(i => {
                        return i.vehicle_id === item.vehicle_id;
                    }) === index;
                });
            }
            console.log(crosswalk_details);
            setCrosswalk({...crosswalk_details, 
                "nearby_pedestrians":nearby_pedestrians.pedestrians.map(i => i.pedestrian_id),
                "nearby_vehicles":nearby_vehicles.vehicles.map(i => i.vehicle_id)});
            console.log(nearby_vehicles);
        })
    }

    const onUpdateCrosswalk = (state) => {
        return updateCrosswalk(crosswalkID, state).then((crosswalk) => {
          console.log("Crosswalk updated with success:")
          console.log(crosswalk);
        }).catch(err => console.log(err.message))
      }
    
      const handleStateChange = (event, {value}) => {
        setCrosswalk({ ...crosswalk, state: value });
      };
    
      const handleCreate = (event) => {
        event.preventDefault();
    
        onUpdateCrosswalk(
            crosswalk.state,
        ).then(() => {
            window.location.assign("/");
        });
      };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container text style={{marginTop: '7em'}}>
            <Header as="h1">Crosswalk Details</Header>
            {crosswalk && (
            <Container fluid>
            <Header as="h2" block>Nearby Pedestrians</Header>
            <Segment.Group raised>
                {crosswalk.nearby_pedestrians.map((nearby_pedestrian) => {
                    return (<Segment>Pedestrian {nearby_pedestrian}</Segment>)
                })}
            </Segment.Group>
            <Header as="h2" block>Nearby Vehicles</Header>
            <Segment.Group raised>
                {crosswalk.nearby_vehicles.map((nearby_vehicle) => {
                    return (<Segment>Vehicle {nearby_vehicle}</Segment>)
                })}
            </Segment.Group>
            <Header as="h2" block>Update State</Header>
            <Segment>
            <Form onSubmit={handleCreate}>
                <label>Crosswalks State</label>
                <Form.Field>
                    <Radio
                    label='OFF'
                    name='radioGroup'
                    value='OFF'
                    checked={crosswalk.state === 'OFF'}
                    onChange={handleStateChange}
                />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='ON'
                        name='radioGroup'
                        value='ON'
                        checked={crosswalk.state === 'ON'}
                        onChange={handleStateChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Intermittent'
                        name='radioGroup'
                        value='INT'
                        checked={crosswalk.state === 'INT'}
                        onChange={handleStateChange}
                    />
                </Form.Field>
                <button type="submit">Update</button>
            </Form>
            </Segment>
        </Container>
        )}
        </Container>
    )
}

export default CrosswalkDetailPage;