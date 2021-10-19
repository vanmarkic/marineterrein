import React, { useState } from 'react';
import Slider, { Range, Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';

import styled from "styled-components"
import GlobalStyle from "../styles/GlobalStyle"

import * as d3Array from 'd3-array'


import { schemeBlues as scheme, interpolateBlues } from 'd3-scale-chromatic'


import Picnic from "./picnic.js"
import Water from "./water.js"
import Fitness from './fitness.js'
import Gate from "./gate.js"

import data from "../../content/oneyearfourcamsbyday.json"


const waterMin = d3Array.min(Object.values(data.content.water))
const waterMax = d3Array.max(Object.values(data.content.water))
const picnicMin = d3Array.min(Object.values(data.content.picnic))
const picnicMax = d3Array.max(Object.values(data.content.picnic))
const gateMin = d3Array.min(Object.values(data.content.gate))
const gateMax = d3Array.max(Object.values(data.content.gate))
const fitnessMin = d3Array.min(Object.values(data.content.fitness))
const fitnessMax = d3Array.max(Object.values(data.content.fitness))

const extents = {
  water: { min: waterMin, max: waterMax, range: waterMax - waterMin },
  gate: { min: gateMin, max: gateMax, range: gateMax - gateMin },
  picnic: { min: picnicMin, max: picnicMax, range: picnicMax - picnicMin },
  fitness: { min: fitnessMin, max: fitnessMax, range: fitnessMax - fitnessMin },
}

const sliderStyle = { width: '100%', marginTop: 'auto', marginBottom: 'auto', maxWidth: '75vh' };

const getRatio = (key, amount) => amount / extents[key].range

const getColor = (key, amount) => {
  const ratio = getRatio(key, amount)
  return interpolateBlues(ratio)
}

const Button = styled.p`
z-index:100;
  border-radius: 3px;
  padding: 0.5rem .5rem;
  margin: 0.5rem 1rem;
  width: auto;
  background: darkblue;
  color: white;
  cursor: pointer;

`
const Row = styled.div`
        display: flex;
        margin: 0;

        
`

const Column = styled.div`
        display: flex;
        max-height: 95vh;
        flex-direction: column;
       

`
const AmountsContainer = styled.div`
        max-width: 250px;
        min-width: 250px;
`

const Thermometer = styled.div`
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        color: white;
justify-content: center;
align-items: center;
font-size: 1em;
font-weight: 700;
 margin:15px;
background: rgb(11,11,11);
background: linear-gradient(180deg, rgba(11,11,11,1) 0%, rgba(89,89,89,1) 100%);
`

const Bar = styled.div`
  width: ${props => props.ratio * 100}%;
  background-color: darkblue;
  height: 20px;

`


const randomPointsOnPolygon = (polygon, count, bbox) => {
  // bbox = bbox || turf.bbox(polygon);
  // return d3.range(count).map(() => {
  //   var point = turf.randomPoint(1, { bbox: bbox });
  //   if (turf.inside(point.features[0], polygon) === true) {
  //     return point.features[0];
  //   } else {
  //     return randomPointsOnPolygon(polygon, 1, bbox)[0];
  //   }
  // });
}


const ZonesRandomPoints = () => {

  const [dateIndex, setDateIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  let picnicAmount = data.content.picnic[Object.keys(data.content.picnic)[dateIndex]]
  let waterAmount = data.content.water[Object.keys(data.content.water)[dateIndex]]
  let fitnessAmount = data.content.fitness[Object.keys(data.content.fitness)[dateIndex]]
  let gateAmount = data.content.gate[Object.keys(data.content.gate)[dateIndex]]


  const playSlider = () => {
    console.log('test')
    if (isPlaying && intervalId) {
      clearInterval(intervalId)
      setIsPlaying(false)
      return
    }
    let intervalIds = setInterval(() => setDateIndex(dateIndex => dateIndex + 1), 200)
    setIntervalId(intervalIds)
    setIsPlaying(true)
  }



  return (

    <Column>
      <Row style={{ justifyContent: 'flex-end' }}>
        <Thermometer>
          30°C
        </Thermometer>
      </Row>


      <Row style={{ height: '65vh' }}>

        <svg width="100%" height="60vh" viewBox="840 0 2160 2160" version={1.1} xmlns="http://www.w3.org/2000/svg" style={{ position: "relative" }}>
          <Picnic fillColor={getColor("picnic", picnicAmount)} amount={picnicAmount} />
          <text fontSize="30px" fontFamily="Arial, Helvetica, sans-serif" x="2330" y="1500">{Math.floor(picnicAmount)}</text>
          <Water fillColor={getColor("water", waterAmount)} amount={waterAmount} />
          <text fontSize="30px" fontFamily="Arial, Helvetica, sans-serif" x="1700" y="1200">{Math.floor(waterAmount)}</text>
          <Fitness fillColor={getColor("fitness", fitnessAmount)} amount={fitnessAmount} />
          <text fontSize="30px" fontFamily="Arial, Helvetica, sans-serif" x="1800" y="400">{Math.floor(fitnessAmount)}</text>
          <Gate fillColor={getColor("gate", gateAmount)} amount={gateAmount} />
          <text fontSize="30px" fontFamily="Arial, Helvetica, sans-serif" x="2300" y="1000">{Math.floor(gateAmount)}</text>
        </svg>
      </Row>
     
      <Row>
    
        <h3>{Object.keys(data.content.picnic)[dateIndex]}</h3>

      </Row>

      <Row>
        <Row style={sliderStyle}>
          <Slider

            min={0}
            max={Object.keys(data.content.picnic).length - 1}
            included={false}
            onChange={value => setDateIndex(value)}
            value={dateIndex}
            railStyle={{ backgroundColor: 'blue', height: 10 }}
            handleStyle={{
              borderColor: 'blue',
              height: 28,
              width: 28,
              marginLeft: 0,
              marginTop: -9,
              backgroundColor: 'black',
            }}
          />
        </Row>
        <Button onClick={playSlider}>
          {isPlaying ? "pause" : "play"}
        </Button>
      </Row>


    </Column>
  )
}
export default ZonesRandomPoints