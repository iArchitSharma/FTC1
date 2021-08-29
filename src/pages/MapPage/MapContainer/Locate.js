import React from "react"
import {LocateButton} from "./styles"

function Locate({panTo}) {
    return (
      <LocateButton
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img src = "https://cdn4.iconfinder.com/data/icons/map1/502/Untitled-9-512.png" width = "25px" height = "25px" alt = "hACKATHON oVER Lmao"/>

      </LocateButton>
    );
  }
  
export default Locate;