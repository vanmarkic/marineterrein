import * as React from "react"

import ZonesColors from '../components/zonesColors'
import ZonesRandomPoints from '../components/zonesRandomPoints'

import "../styles/index.css"


// markup
const IndexPage = () => {

  return (
    <div style={{ maxWidth: "90vw",maxHeight: "95vh"  , margin: `auto`, position: `relative` }}>
      {/* <ZonesColors /> */}
      <ZonesRandomPoints />
    </div>
  );
}

export default IndexPage