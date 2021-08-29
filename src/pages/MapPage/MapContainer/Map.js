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
        <Alert message = "Now, you could click anywhere on the map and place a trash can for reference. If you wish to disable this, click 'STOP' button for double tap zoom "
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
                url: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAADt7e2NjY2enp5ISEjQ0NDCwsL8/Pzc3NxmZmYvLy+Dg4NYWFiSkpLf3985OTl9fX309PTl5eUkJCSlpaXJyclCQkKurq5eXl6+vr5sbGx4eHjW1taysrIaGhpOTk4SEhILCwtNzewDAAAEMElEQVR4nO2d2VriQBBGCSCbgBFFkVXn/R9ydEYcUhUIXUuqHf9z21+SOlk7lU5XpwMAAAAAAAD4xqzvyyKBx8myGx1yCt37FLsjr8PouK9lJPL7oBxHx34VT1K/D3rR0V9BTyP4fhgX0QJNTHSC72R+x9moBYsi66PYNxAsbqMtLjC2ECyKabTHeZIe8hd4iBY5h+o5ccok2uQcr1aGud5PH8wEi3m0Sz1TO8Mi2qUeQ8FiHS1Tx8rS8Dnapo5bFubTtYsutmzZO89QZQxYkClPNdad3boFKobFOEtZesf2z8grUCld+Tn6B3aOL50CFTOnEb6lLc/uUwefOOWwQ5h4DEbKc8Cdtfo6YsmdpOvYn2caX/K98I7to6w6pzy89KwZ20lZZaXYE1vQJ+Enun2cYvhtQtKvZCvZmwcqZmmy+1kesrSOU84bjU30fsc7DTvrQKXw7IXsNjijq9kYByqGRSbMswzZnsokdcrPLukHlgNdUd80UMruhUXuzS/pgqWkn26WGmwHwSUbHXIqg1RBw9RgOyQ/oHhPM3NgCMP8gSEM8weGP9Dw2/Xa0vMmJgNH2kMyRIUnXzJmIvuQ0z2BXZeLbqss6Df0+WkAFh+qFtTQYJ1J0Eyc+es/S1VYb6AJGKqBoTswVANDd2CoBobuwFANDN2BoRoYugNDNTB0B4ZqYOhODobLyeyTSb8ugbnffLXP6wY7DbfH9pcp/5Mh3nD0WGnmCtU/27hC9QdbNso73pAMomVD28h3EPadgQ5qo+3xhk3tN6SdDl+kw4zpCKD8DOmVSH8ZoaP76D83dAoJGKqBIQxhCEMY6oEhDGEIQxjqgSEMYQhDGOqBIQxhCEMY6oEhDGEIQxjqgSEMYQhDGOqBIQxhCEMY6oEhDGEIQxjqgSEMYQhDGOqBIQxhCEMY6oEhDGEIQxjqgSEMYQjDDAzfGtppwWc6pwKtDpjfnAokAlYdcF9tv6HttFJrw/ojZm+pTHxR8ulbqnOX8LlPqnU+WcmoDAw7w970k17tFPCDr/ZpbVW88fyrfcl3UA6GvsBQDQzdgaEaGLoDQzUwdAeGamDoDgzV/P+G4dWQaJZDUgH4Isyw7YLStP6yeWn5ETVMrr+rhNZ7prk4PdRQVCBeDqtPLK39fR46w+rBfAsXmVNDi1JrVeiVzmf6dYVu3WEHr+g2SvttnIeVKhRUGm+Cl+30LV5fgVcJXzlshW2k6O8G7VBTyZ5+FLCAllgM5dlBsDOOtjrF4yTtdMporRNcBDvraK1/eHU36EfOOOwf93/ZRYsd8bkKP9g0b7wNXG6kn9AOfgwez8IjvG8RgP170ym0CkUA3p3FfXMIvvScBcOPYhvd/YfH5jjcaOmltN8ciQ8bryc9YzQ/BPhteX0hT+5W05eb1pht+23n9gAAAAAAAAAAAADa5TfIkmD0BW4uvwAAAABJRU5ErkJggg==`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30)
              }}
            />
        ))}

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