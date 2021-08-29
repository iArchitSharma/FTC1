import React, {useEffect} from 'react'
import Map from "./MapContainer/Map.js"

export default function Index({script}) {
    useEffect(() => {
        console.log(script)
        if(script)
        script.parentNode.removeChild(script)
    }, [])

    return (
        <div>
            <Map />
        </div>
    )
}
