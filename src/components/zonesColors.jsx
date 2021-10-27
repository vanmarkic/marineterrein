import React, { useEffect, useState } from 'react';

import Slider, { Range, Handle, SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from "styled-components"
import * as d3Array from 'd3-array'
import { schemeYlOrRd as scheme, interpolateYlOrRd } from 'd3-scale-chromatic'
import { scaleLinear, scaleQuantile, scaleThreshold } from 'd3-scale'

import GlobalStyle from "../styles/GlobalStyle"
import camData from "../../content/oneyearfourcamsbyday.json"
import densityPeakPerDay from "../../content/density_day.json"

import weatherData from "../../content/schiphol_weather.json"

import Picnic from "./ZonesWithColor/picnic"
import Water from "./ZonesWithColor/water"
import Fitness from './ZonesWithColor/fitness'
import Gate from "./ZonesWithColor/gate"
import BarChart from './BarChart';
import { newFunction } from './newFunction';

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


let myData = [0, 1, 2, 3, 4];

let quantileScale = scaleQuantile()
  .domain(myData)
  .range(['#ffffb2"', '#fecc5c', '#fd8d3c', "#e31a1c"]);

let thresholdScale = scaleThreshold()
  .domain([0, 1, 2, 3, 4])
  .range(['white', "#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"]);



const sliderStyle = {
  // width: '85vw',
  marginTop: 'auto', marginBottom: 'auto'
};

// const getRatio = (key, amount) => amount / extents[key].range

// const getColor = (key, density) => {
//   // const ratio = getRatio(key, amount)
//   // return interpolateYlOrRd(ratio)
// // TODO create 4 discrete values/colors based on differents densities
//   // ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"]

//    return 
// }

const tempColors = scaleLinear()
  .domain([extents.temperature.min, 10, extents.temperature.max])
  .range(['cyan', 'white', 'red']);

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
        flex-direction: column;
       

`
const AmountsContainer = styled.div`
        max-width: 250px;
        min-width: 250px;
`

const Thermometer = styled.div`
        width: 60px;
        height: 60px;
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


const Metrics = styled.h2`
  margin:0px;
`

const Bar = styled.div`
  width: ${props => props.ratio * 100}%;
  background-color: darkblue;
  height: 20px;

`
const VerticalNeedle = styled.div`
  display: block;
  width: ·1px;
  height: 150px;
  background-color: black;
`


const ZonesColors = () => {

  const [dateIndex, setDateIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  let picnicAmount = camData.content.picnic[weatherDataDates[dateIndex]]
  let waterAmount = camData.content.water[weatherDataDates[dateIndex]]
  let fitnessAmount = camData.content.fitness[weatherDataDates[dateIndex]]
  let gateAmount = camData.content.gate[weatherDataDates[dateIndex]]

  let picnicDensity = densityPeakPerDay[weatherDataDates[dateIndex]] &&
    densityPeakPerDay[weatherDataDates[dateIndex]]['Picnic'] != ''
    ?
    parseFloat(densityPeakPerDay[weatherDataDates[dateIndex]]['Picnic'])
    : 'no measure'
  let waterDensity = densityPeakPerDay[weatherDataDates[dateIndex]] &&
    densityPeakPerDay[weatherDataDates[dateIndex]]['SwimmingArea'] != ''
    ?
    parseFloat(densityPeakPerDay[weatherDataDates[dateIndex]]['SwimmingArea'])
    : 'no measure'
  let fitnessDensity = densityPeakPerDay[weatherDataDates[dateIndex]] &&
    densityPeakPerDay[weatherDataDates[dateIndex]]['Fitness'] != ''
    ?
    parseFloat(densityPeakPerDay[weatherDataDates[dateIndex]]['Fitness'])
    : 'no measure'
  let gateDensity = densityPeakPerDay[weatherDataDates[dateIndex]] &&
    densityPeakPerDay[weatherDataDates[dateIndex]]['Terrace'] != ''
    ?
    parseFloat(densityPeakPerDay[weatherDataDates[dateIndex]]['Terrace'])
    : 'no measure'

  useEffect(() => {
    if (dateIndex === weatherDataDates.length - 1) clearInterval(intervalId)
  }, [dateIndex]);

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

        <svg width="100%" height="60vh" viewBox="1400 0 2160 2160" version={1.1} xmlns="http://www.w3.org/2000/svg" style={{ position: "relative" }}>
          {newFunction()}
          <Picnic fillColor={thresholdScale(picnicDensity)} amount={picnicDensity} />
          <text fontSize="30px" fontFamily="Arial, Helvetica, sans-serif" x="2330" y="1500">{picnicDensity}</text>
          <Water fillColor={thresholdScale(waterDensity)} amount={waterDensity} />
          <text fontSize="30px" fontFamily="Arial, Helvetica, sans-serif" x="1700" y="1200">{waterDensity}</text>
          <Fitness fillColor={thresholdScale(fitnessDensity)} amount={fitnessDensity} />
          <text fontSize="30px" fontFamily="Arial, Helvetica, sans-serif" x="1800" y="400">{fitnessDensity}</text>
          <Gate fillColor={thresholdScale(gateDensity)} amount={gateDensity} />
          <text fontSize="30px" fontFamily="Arial, Helvetica, sans-serif" x="2300" y="1000">{gateDensity}</text>
        </svg>

      </Row>

      <Row style={{ justifyContent: "space-evenly" }}>


        <Column style={{ alignItems: 'center' }}>
          <div>temperature</div>
          <Metrics>

            {weatherDataAverageTemp[dateIndex]}°C
          </Metrics>
        </Column>
        <Column style={{ alignItems: 'center', width: '200px' }}>
          <div>date</div>
          <Row >
            <Metrics style={{ width: '40px' }}>{weatherDataDates[dateIndex].substring(8, 11)}-</Metrics>
            <Metrics style={{ width: '40px' }}>{weatherDataDates[dateIndex].substring(5, 7)}-</Metrics>
            <Metrics>{weatherDataDates[dateIndex].substring(0, 4)}</Metrics>
          </Row>
        </Column>

        <Column style={{ alignItems: 'center' }} >
          <div>visitors</div>
          <Metrics>
            {totalAmountOfVisitors[dateIndex]}
          </Metrics>
        </Column>

      </Row>

      <Row
      // style={{ maxWidth: '95vw' }}
      >
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

            <BarChart data={totalAmountOfVisitors} height="100" width="4000" />
          </Row>
          <Row style={sliderStyle}>


            <svg height="15" width="100%">
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
              marks={{ 20: 'test', 40: 'it works' }}
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
              dotStyle={{backgroundColor: 'black'}}
            />

          </Row>

        </Column>
        <Button onClick={playSlider}>
          {isPlaying ? "pause" : "play"}
        </Button>
      </Row >


    </Column >
  )
}
export default ZonesColors


