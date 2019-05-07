import * as React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  GoogleMapProps
} from "react-google-maps";

export interface Props {
    latitude: number;
    longitude: number;
}

class GoogleMapComponent extends React.Component<Props & GoogleMapProps> {
    render() {
        const {latitude, longitude} = this.props;

        return (
            <GoogleMap 
                defaultZoom={8} 
                defaultCenter={{ lat: latitude, lng: longitude }}
                options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false
                }}
            >
                <Marker position={{ lat: latitude, lng: longitude }} />
            </GoogleMap>
        );
    }
}



export default compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyB6GoMRBUcO4QK3QvkdCltZUXL1B1uboiM&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%`}} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(GoogleMapComponent as any) as unknown as React.ComponentClass<Props>;
