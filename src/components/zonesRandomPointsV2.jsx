import React, { useEffect, useState } from 'react';

import Slider, { Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from "styled-components"
import * as d3Array from 'd3-array'
import { scaleLinear } from 'd3-scale'

import camData from "../../content/oneyearfourcamsbyday.json"
import densityPeakPerDay from "../../content/density_day.json"

import weatherData from "../../content/schiphol_weather.json"

import Picnic from "./Map/ZonesWithDots/picnic"
import Water from "./Map/ZonesWithDots/water"
import Fitness from './Map/ZonesWithDots/fitness'
import Gate from "./Map/ZonesWithDots/gate"
import BarChart from './BarChart';
import MtMap from './Map/Map';

const weatherDataDates = weatherData.map(el => el.date.substring(0, 10))
const weatherDataAverageTemp = weatherData.map(el => el.TG / 10)


const minDensity = d3Array.min(Object.values(densityPeakPerDay).map(el => el))
const maxDensity = d3Array.max(Object.values(densityPeakPerDay).map(el => el.SwimmingArea))


const waterMin = d3Array.min(Object.values(camData.content.water))
const waterMax = d3Array.max(Object.values(camData.content.water))
const picnicMin = d3Array.min(Object.values(camData.content.picnic))
const picnicMax = d3Array.max(Object.values(camData.content.picnic))
const gateMin = d3Array.min(Object.values(camData.content.gate))
const gateMax = d3Array.max(Object.values(camData.content.gate))
const fitnessMin = d3Array.min(Object.values(camData.content.fitness))
const fitnessMax = d3Array.max(Object.values(camData.content.fitness))
const temperatureMin = d3Array.min(weatherDataAverageTemp)
const temperatureMax = d3Array.max(weatherDataAverageTemp)




const extents = {
  water: { min: waterMin, max: waterMax, range: waterMax - waterMin },
  gate: { min: gateMin, max: gateMax, range: gateMax - gateMin },
  picnic: { min: picnicMin, max: picnicMax, range: picnicMax - picnicMin },
  fitness: { min: fitnessMin, max: fitnessMax, range: fitnessMax - fitnessMin },
  temperature: { min: temperatureMin, max: temperatureMax, range: temperatureMax - temperatureMin },

}

// const densityCats = {
//     0 : "#ffffb2"
//         "#fecc5c","#fd8d3c","#e31a1c"]

// }

let myData = [0, 1, 2, 3, 4];

// let quantileScale = scaleQuantile()
//   .domain(myData)
//   .range(['#ffffb2"', '#fecc5c', '#fd8d3c', "#e31a1c"]);

// let thresholdScale = scaleThreshold()
//   .domain([1, 2, 3])
//   .range(['#ffffb2"', '#fecc5c', '#fd8d3c', "#e31a1c"]);



const sliderStyle = {
  // width: '85vw',
  marginTop: 'auto', marginBottom: 'auto'
};


const tempColors = scaleLinear()
  .domain([extents.temperature.min, 10, extents.temperature.max])
  .range(['blue', '#222222', 'orange']);

const temperatureColors = weatherDataAverageTemp.map(t => {

  return tempColors(t)
})


const totalAmountOfVisitors = weatherDataDates.map((el, idx) => {
  const picnicAmount = camData.content.picnic[el] === undefined ? 10 : camData.content.picnic[el]
  const fitnessAmount = camData.content.fitness[el] === undefined ? 10 : camData.content.fitness[el]
  const waterAmount = camData.content.water[el] === undefined ? 10 : camData.content.water[el]
  const gateAmount = camData.content.gate[el] === undefined ? 10 : camData.content.gate[el]
  return Math.round(
    picnicAmount +
    waterAmount +
    fitnessAmount +
    gateAmount
  )


})


const Button = styled.div`
z-index:100;
  border-radius: 3px;
  padding: 0.5rem .5rem;
  margin: 0.5rem 0rem 0.5rem 1rem;
  min-width: 40px;
  height: 24px;
  background: darkblue;
  color: white;
  cursor: pointer;
align-self: flex-end;
justify-content: center;
text-align: center;

`
const Row = styled.div`
        display: flex;
        margin:0px;
`

const Column = styled.div`
        display: flex;
        max-height: 95vh;
        height: 15vh;
        flex-direction: column;
`

const Metrics = styled.h2`
  margin:0px;
`


const MetricLabel = styled.h6`
  margin:0px;
`

const VerticalNeedle = styled.div`
  display: block;
  width:1px;
  height: 15vh;
 margin: auto;
 margin-top: -15vh;
  background-color:white;
`

const ZonesRandomPoints = () => {

  const [dateIndex, setDateIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  let picnicAmount = camData.content.picnic[weatherDataDates[dateIndex]]
  let waterAmount = camData.content.water[weatherDataDates[dateIndex]]
  let fitnessAmount = camData.content.fitness[weatherDataDates[dateIndex]]
  let gateAmount = camData.content.gate[weatherDataDates[dateIndex]]

  let picnicDensity = densityPeakPerDay[weatherDataDates[dateIndex]]['Picnic']
  let waterDensity = densityPeakPerDay[weatherDataDates[dateIndex]]['SwimmingArea']
  let fitnessDensity = densityPeakPerDay[weatherDataDates[dateIndex]]['Fitness']
  let gateDensity = densityPeakPerDay[weatherDataDates[dateIndex]]['Terrace']

  useEffect(() => {
    if (dateIndex === weatherDataDates.length - 1) clearInterval(intervalId)
  }, [dateIndex, intervalId]);


  const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (

      <Handle value={value} {...restProps} >
        <VerticalNeedle />
      </Handle>

    );
  };

  const playSlider = () => {
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
      </Row>

      <Row style={{ height: '65vh' }}>
        <MtMap>
          <Picnic amount={picnicAmount} />
          <Water amount={waterAmount} />
          <Fitness amount={fitnessAmount} />
          <Gate amount={gateAmount} />
        </MtMap>
      </Row>

      <Row style={{ justifyContent: "space-evenly" }}>
        <Column style={{ alignItems: 'center' }}>
          <MetricLabel>temperature</MetricLabel>
          <Metrics>
            {weatherDataAverageTemp[dateIndex]}°C
          </Metrics>
        </Column>
        <Column style={{ alignItems: 'center', width: '200px' }}>
          <MetricLabel>date</MetricLabel>
          <Row >
            <Metrics style={{ width: '40px' }}>{weatherDataDates[dateIndex].substring(8, 11)}-</Metrics>
            <Metrics style={{ width: '40px' }}>{weatherDataDates[dateIndex].substring(5, 7)}-</Metrics>
            <Metrics>{weatherDataDates[dateIndex].substring(0, 4)}</Metrics>
          </Row>
        </Column>
        <Column style={{ alignItems: 'center' }} >
          <MetricLabel>visitors</MetricLabel>
          <Metrics>
            {totalAmountOfVisitors[dateIndex]}
          </Metrics>
        </Column>
      </Row>

      <Row>

        <Column style={{
          "WebkitTouchCallout": "none",
          "WebkitUserSelect": "none",
          "KhtmlUserSelect": "none",
          "MozUserSelect": "none",
          "MsUserSelect": "none",
          "UserSelect": "none",
          "WebkitTapHighlightColor": "rgba(0,0,0,0)"
        }}>
          <Row style={sliderStyle}>
            <BarChart data={totalAmountOfVisitors} dateIndex={dateIndex} height="200" width="4000" />
          </Row>
          <Row style={sliderStyle}>

            <svg height="10" width="100%">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  {temperatureColors.map((color, idx) => {
                    return (<stop key={idx} offset={idx / (temperatureColors.length - 1)} style={{ "stopColor": color, "stopOpacity": 1 }} />)
                  })}
                </linearGradient>
              </defs>
              <rect width="100%" height="15" fill="url('#grad1')" />
            </svg>
          </Row>
          <Row style={{ ...sliderStyle, marginTop: "30px" }}>
            <Slider
              min={0}
              max={weatherDataDates.length - 1}
              included={false}
              onChange={value => setDateIndex(value)}
              value={dateIndex}
              railStyle={{ backgroundColor: 'darkgrey', height: 2 }}
              handleStyle={{
                borderColor: 'darkgrey',
                height: 28,
                width: 28,
                marginLeft: 0,
                marginTop: -13,
                backgroundColor: 'black',
              }}
              handle={handle}
            />

          </Row>

        </Column>
        <Button onClick={playSlider}>
          {isPlaying ? '⏸' : "▶"}
        </Button>
      </Row >


    </Column >
  )
}
export default ZonesRandomPoints



