import React, {useState, useCallback, useRef, useEffect} from "react";
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

let userAlerted = 0

let LocationCenter = null

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        LocationCenter = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      }
    )
  }, [])

  if(!isLoaded) return (
    <LoadingContainer>
      <LoadingAnimation>
        <BallBeat color = {"#123abc"} loading = {true}/> 
      </LoadingAnimation>
    </LoadingContainer>
  ) 

  return (
    <MapStyle>

      {(alert && (userAlerted < 2)) && 
        <Alert message = "Now, you could click anywhere on the map twice and place a trash can for reference. If you wish to disable this, click 'STOP' button for double tap zoom "
        onBackdropClickHandler = {() => setAlert(false)}
        />
      }

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <AddTrashCan onClick = {() => {
        setCanAddLocation(!canAddLocation) 
        if(!canAddLocation) {
          setAlert(true)
          userAlerted++
        }
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
                scaledSize: new window.google.maps.Size(30, 30)
              }}
            />
        ))}
        {/* <InfoWindow position = {mapCenter}>
          <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcD0BOSqFd2L7SDszSkFuRydCJdVd0ARumtAlIGl1QbhpRHOchESIzOwUKeGBo45c8EzM&usqp=CAU" width = "35px" height = "35px" />
        </InfoWindow> */}

        <Marker position = {LocationCenter} icon = {{url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcD0BOSqFd2L7SDszSkFuRydCJdVd0ARumtAlIGl1QbhpRHOchESIzOwUKeGBo45c8EzM&usqp=CAU", 
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
          scaledSize: new window.google.maps.Size(30, 30)
        }}>
        </Marker>


        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                Trash Can Placed <img src = "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/garbage_can.png" width = "25px" height = "25px" />
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