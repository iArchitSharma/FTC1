import React, {useState, useCallback, useRef} from "react";
import { BallBeat } from 'react-pure-loaders';
import { formatRelative } from "date-fns";
import {LoadingAnimation, LoadingContainer, AddTrashCan, MapStyle} from "./styles.js"
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Locate from "./Locate.js";
import Search from "./Search.js";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import Alert from "../../Alert"

const mapCenter = {
  lat: 43.6532,
  lng: -79.3832,
}

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

let userAlerted = false

export default function Map() {
  const {isLoaded} = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, libraries: ["places"]})
  const [tcMarkers, setTcMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [canAddLocation, setCanAddLocation] = useState(false)
  const [alert, setAlert] = useState(false)

  const onMapClick =  event => {
    if(!canAddLocation) return
    setTcMarkers(cur => [...cur, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ])
  }

  const mapRef = useRef()
  const onMapLoad = useCallback(x =>  mapRef.current = x, [])

  const panTo = useCallback(({lat,lng}) => { 
      mapRef.current.panTo({ lat, lng })
      mapRef.current.setZoom(16)
  }, [])


  if(!isLoaded) return (
    <LoadingContainer>
      <LoadingAnimation>
        <BallBeat color = {"#123abc"} loading = {true}/> 
      </LoadingAnimation>
    </LoadingContainer>
  ) 

  if(alert) {
    return (
      <Alert message = "Now, you could click anywhere on the map twice and place a trash can for reference. If you wish disable this, click 'STOP' button for double tap zoom "
      onBackdropClickHandler = {() => setAlert(false)}
      />
    )
  }

  return (
    <MapStyle>

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <AddTrashCan onClick = {() => {
        setCanAddLocation(!canAddLocation) 
        setAlert(true)
      } } >
        {canAddLocation ?
          <div> <i class="fas fa-minus-circle"></i> &nbsp; Stop </div> :
          <div> <i class="fas fa-user-plus"></i> &nbsp; Add trash can</div>  
        }
      </AddTrashCan>

      <GoogleMap
        zoom={12}
        mapContainerStyle={mapContainerStyle}
        center= {mapCenter}
        onClick={onMapClick}
        onLoad={onMapLoad}
        options={mapOptions}
      >

        <Locate panTo = {panTo} />
        <Search panTo = {panTo} />

        {tcMarkers.map((mark, index) => (
            <Marker
              key={"marker" + index}
              position={{ lat: mark.lat, lng: mark.lng }}
              onClick={() => {
                setSelected(mark);
              }}
              icon={{
                url: `/bear.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                Trash Placed <img src = "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/garbage_can.png" width = "25px" height = "25px" />
              </h2>
              <p> {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </MapStyle>
  );
}

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};