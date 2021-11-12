import React from 'react'
import MapMT from './svgmap'
import Picnic from "./ZonesWithDots/picnic"
import Water from "./ZonesWithDots/water"
import Fitness from './ZonesWithDots/fitness'
import Gate from "./ZonesWithDots/gate"

const MtMap = ({children}) => {
  return (
    <svg width="100%" height="45vh" viewBox="0 0 1000 1000" version={1.1} xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", margin: "auto" }}>
      <MapMT />
      {children}
    </svg>
  )
}

export default MtMap
