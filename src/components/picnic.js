import React, { useRef, useEffect } from "react"
import { useState, useLayoutEffect } from "react";

function useDims(ref, isSvg = false) {
  const [dim, setDim] = useState({
    height: 0,
    width: 0,
    top: 0,
    left: 0
  });

  useLayoutEffect(() => {
    if (ref && ref.current) {
      if (isSvg) {
        const { height, width, x, y } = ref.current.getBBox();
        setDim({
          height,
          width,
          top: y,
          left: x
        });
      } else {
        setDim({
          height: ref.current.offsetHeight,
          width: ref.current.offsetWidth,
          top: ref.current.offsetTop,
          left: ref.current.offsetLeft
        });
      }
    }
  }, [ref, isSvg]);

  return dim;
};

const style = {
  fillRule: "nonzero",
  stroke: "#000",
  strokeWidth: "8px",
}



// const randomPointsOnPolygon = (polygon, count, bbox) => {
// console.log(Area.getBbox())
// return d3.range(count).map(() => {
//   var point = turf.randomPoint(1, { bbox: bbox });
//   if (turf.inside(point.features[0], polygon) === true) {
//     return point.features[0];
//   } else {
//     return randomPointsOnPolygon(polygon, 1, bbox)[0];
//   }
// });
// }

// randomPointsOnPolygon()
const Points = () => {
  // randomPointsOnPolygon(nissPolygon, niss[nat] / oneDotForXPeople)
  return ('test')
}


const Picnic = ({ fillColor, amount }) => {
  const myRef = useRef(null)

  useEffect(() => {
    const polybbox = myRef.current.getBBox()
    console.log(polybbox)
  }, [myRef]);





  return (

    <polygon id="picnic" points="2345 1255, 2093 1482, 2264 1726, 2376 1661, 2556 1468, 2345 1255" style={style} ref={myRef} fill={fillColor} />



  );
}

export default Picnic