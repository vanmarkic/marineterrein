import React, { useEffect, useState } from "react";

import Slider, { Range, Handle, SliderTooltip } from "rc-slider";
// import 'rc-slider/assets/index.css';

import styled from "styled-components";
import * as d3Array from "d3-array";
// import { schemeYlOrRd as scheme, interpolateYlOrRd } from 'd3-scale-chromatic'
import { scaleLinear, scaleQuantile, scaleThreshold } from "d3-scale";

// import XS from "../images/0-10.png"
// import S from "../images/10-20.png"
// import M from "../images/20-30.png"
// import L from "../images/30-40.png"

import breakpoint from "../styles/globalStyle";

import camData from "../../content/oneyearfourcamsbyday.json";
import densityPeakPerDay from "../../content/density_day.json";

import weatherData from "../../content/schiphol_weather.json";

import remarkableDates from "./remarkableDates";

import Picnic from "./Map/ZonesWithDots/picnic";
import Water from "./Map/ZonesWithDots/water";
import Fitness from "./Map/ZonesWithDots/fitness";
import Gate from "./Map/ZonesWithDots/gate";
import BarChart from "./BarChart";
import MtMap from "./Map/Map";

const weatherDataDates = weatherData.map((el) => el.date.substring(0, 10));
const weatherDataAverageTemp = weatherData.map((el) => el.TG / 10);

const minDensity = d3Array.min(
  Object.values(densityPeakPerDay).map((el) => el)
);
const maxDensity = d3Array.max(
  Object.values(densityPeakPerDay).map((el) => el.SwimmingArea)
);

const markPoints = {};

remarkableDates.forEach((el, idx) => {
  markPoints[weatherDataDates.indexOf(el.date)] = {
    style: {
      display: "none",
    },
    label: el.title,
    undertitle: el.undertitle,
    link: el.link,
    date: el.date,
  };
});

const temperatureMin = d3Array.min(weatherDataAverageTemp);
const temperatureMax = d3Array.max(weatherDataAverageTemp);

const tempColors = scaleLinear()
  .domain([temperatureMin, 10, temperatureMax])
  .range(["cyan", "white", "red"]);

const temperatureColors = weatherDataAverageTemp.map((t) => {
  return tempColors(t);
});

const totalAmountOfVisitors = weatherDataDates.map((el, idx) => {
  const picnicAmount =
    camData.content.picnic[el] === undefined ? 10 : camData.content.picnic[el];
  const fitnessAmount =
    camData.content.fitness[el] === undefined
      ? 10
      : camData.content.fitness[el];
  const waterAmount =
    camData.content.water[el] === undefined ? 10 : camData.content.water[el];
  const gateAmount =
    camData.content.gate[el] === undefined ? 10 : camData.content.gate[el];
  return Math.round(picnicAmount + waterAmount + fitnessAmount + gateAmount);
});

const sliderStyle = {
  marginTop: "auto",
  marginBottom: "auto",
};

const Button = styled.div`
  display: none;
  @media only screen and ${breakpoint.device.sm} {
    z-index: 100;
    border-radius: 3px;
    padding: 0.5rem 0.5rem;
    margin: 0.5rem 0rem 0.5rem 1rem;
    min-width: 40px;
    height: 24px;
    background: darkblue;
    color: white;
    cursor: pointer;
    align-self: flex-end;
    justify-content: center;
    text-align: center;
  }
`;
const Row = styled.div`
  display: flex;
  margin: 0px;
`;

const Wrapper = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;

  display: flex;
  flex-direction: column;
  @media only screen and ${breakpoint.device.xs} {
    height: 85vh;
    justify-content: space-between;
    width: 85vw;
    margin: auto;
    div#map {
      order: 1;
      height: 50vh !important;
    }
    div#colors {
      order: 2;
    }
    div#infos {
      height: 100px;
      order: 3;
      width: 300px;
    }
  }
  @media only screen and ${breakpoint.device.sm} {
    justify-content: space-between;
    padding: 20px;
    div#map {
      order: 2;
      justify-content: flex-end;
      width: 50%;
    }
    div#colors {
      order: 1;
      width: 25%;
    }
    div#infos {
      order: 3;
      width: 220px;
      align-self: end;
    }
  }
  @media only screen and ${breakpoint.device.lg} {
    justify-content: space-around;
    padding: 20px;
    padding: 100px, 0px;
  }
`;
const TopComponent = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
  }
  @media only screen and ${breakpoint.device.sm} {
    flex-direction: row;
  }
  @media only screen and ${breakpoint.device.lg} {
    flex-direction: row;
    justify-content: space-around;
    width: 95vw;
  }
`;
const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: row;
    max-width: 95vw;
    margin: auto;
  }
  @media only screen and ${breakpoint.device.sm} {
    flex-direction: column;
    margin: 50px 10px;
  }
  /* @media only screen and ${breakpoint.device.lg} {
    flex-direction: column;
    margin: 20px 0px;
  } */
`;

const Legend = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
    align-items: center;
    margin: 0px 10px;
    font-size: 12px;
  }
  @media only screen and ${breakpoint.device.sm} {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: flex;
    flex-direction: row;
    margin: 10px 0px;
    width: 20vw;
    justify-content: space-between;
  }
`;

const Metrics = styled.h2`
  margin: 0px;
  @media only screen and ${breakpoint.device.xs} {
    font-size: 16px;
  }
  @media only screen and ${breakpoint.device.sm} {
    font-size: 24px;
  }
`;
const DataLayers = styled.div`
  display: none;
  @media only screen and ${breakpoint.device.sm} {
    display: block;
  }
`;
const DataLabel = styled.div`
  display: none;
  font-size: 10px;
  @media only screen and ${breakpoint.device.sm} {
    display: block;
    width: 30px;
    margin-right: 10px;
  }
`;

// const Bar = styled.div`
//   width: ${props => props.ratio * 100}%;
//   background-color: darkblue;
//   height: 20px;
// `

const VerticalNeedle = styled.div`
  display: none;

  @media only screen and ${breakpoint.device.sm} {
    display: block;
    width: 1px;
    height: 10vh;
    background-color: white;
    margin: auto;
    margin-top: -10vh;
  }
`;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Handle value={value} {...restProps}>
      <VerticalNeedle />
    </Handle>
  );
};

const TempStrip = () => {
  return (
    <svg height="10" width="100%">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          {temperatureColors.map((color, idx) => {
            return (
              <stop
                key={idx}
                offset={idx / (temperatureColors.length - 1)}
                style={{
                  stopColor: color,
                  stopOpacity: 1,
                }}
              />
            );
          })}
        </linearGradient>
      </defs>
      <rect width="100%" height="15" fill="url('#grad1')" />
    </svg>
  );
};

const ZonesColors = () => {
  const [dateIndex, setDateIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const getDensity = (areaName) => {
    return densityPeakPerDay[weatherDataDates[dateIndex]] &&
      densityPeakPerDay[weatherDataDates[dateIndex]][areaName] != ""
      ? Math.round(
          parseFloat(densityPeakPerDay[weatherDataDates[dateIndex]][areaName])
        ) * 3
      : undefined;
  };

  useEffect(() => {
    if (dateIndex === weatherDataDates.length - 1) clearInterval(intervalId);
  }, [dateIndex]);

  useEffect(() => {
    playSlider();
  });

  const playSlider = () => {
    if (isPlaying && intervalId) {
      clearInterval(intervalId);
      setIsPlaying(false);
      return;
    }
    let intervalIds = setInterval(
      () => setDateIndex((dateIndex) => dateIndex + 1),
      200
    );
    setIntervalId(intervalIds);
    setIsPlaying(true);
  };

  const stopSlider = () => {
    if (isPlaying && intervalId) {
      clearInterval(intervalId);
      setIsPlaying(false);
      return;
    }
  };

  return (
    <Wrapper>
      <TopComponent>
        <LegendWrapper
          id="colors"
          style={{
            justifyContent: "center",
            alignItems: "end",
            minWidth: "100px",
            margin: "15px auto",
          }}
        >
          <Legend style={{ color: "lightblue" }}>Water</Legend>
          <Legend style={{ color: "red" }}>Gate</Legend>
          <Legend style={{ color: "white" }}>Fitnesstuin</Legend>
          <Legend style={{ color: "yellow" }}>Picnic</Legend>
        </LegendWrapper>

        <Row id="map">
          <MtMap>
            <Picnic amount={getDensity("Picnic")} />
            <Water amount={getDensity("SwimmingArea")} />
            <Fitness amount={getDensity("Fitness")} />
            <Gate amount={getDensity("Terrace")} />
          </MtMap>
        </Row>

        <LegendWrapper
          id="infos"
          style={{
            flexDirection: "column",
            justifyContent: "end",
            width: "220px",
            maxWidth: "300px",
            margin: "15px auto",
          }}
        >
          {markPoints[dateIndex] && (
            <>
              <Metrics>
                <a href={markPoints[dateIndex].link}>
                  {markPoints[dateIndex].label}
                </a>
              </Metrics>
              <Legend>{markPoints[dateIndex].undertitle}</Legend>
            </>
          )}
        </LegendWrapper>
      </TopComponent>

      <Row style={{ justifyContent: "space-evenly", width: "100%" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>temperature</div>
          <Metrics>{weatherDataAverageTemp[dateIndex]}°C</Metrics>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            width: "200px",
          }}
        >
          <div>date</div>
          <Row>
            <Metrics style={{ width: "40px" }}>
              {weatherDataDates[dateIndex].substring(8, 11)}-
            </Metrics>
            <Metrics style={{ width: "40px" }}>
              {weatherDataDates[dateIndex].substring(5, 7)}-
            </Metrics>
            <Metrics>{weatherDataDates[dateIndex].substring(0, 4)}</Metrics>
          </Row>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>visitors</div>
          <Metrics>{totalAmountOfVisitors[dateIndex]}</Metrics>
        </div>
      </Row>

      <Row>
        <div
          style={{
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            KhtmlUserSelect: "none",
            MozUserSelect: "none",
            MsUserSelect: "none",
            UserSelect: "none",
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
            display: "flex",
            flexDirection: "column",
            width: "80vw",
          }}
        >
          <DataLayers>
            <Row style={sliderStyle}>
              <DataLabel>Crowd</DataLabel>
              <BarChart
                data={totalAmountOfVisitors}
                height="100"
                width="4000"
              />
            </Row>
            <Row style={sliderStyle}>
              <DataLabel>Temp</DataLabel>
              <TempStrip />
            </Row>
          </DataLayers>

          <Row
            onClick={stopSlider}
            style={{ ...sliderStyle, marginTop: "30px" }}
          >
            <DataLabel></DataLabel>
            <Slider
              marks={markPoints}
              min={0}
              max={weatherDataDates.length - 1}
              included={false}
              onChange={(value) => setDateIndex(value)}
              value={dateIndex}
              railStyle={{ backgroundColor: "darkgrey", height: 2 }}
              handleStyle={{
                borderColor: "darkgrey",
                height: 28,
                width: 28,
                marginLeft: 0,
                marginTop: -13,
                backgroundColor: "rgba(0,0,0,0)",
              }}
              dotStyle={{
                borderColor: "black",
                backgroundColor: "white",
                height: "20px",
                width: "20px",
                marginLeft: "-10px",
                bottom: "-7px",
              }}
              handle={handle}
            />
          </Row>
        </div>
        <Button onClick={playSlider}>{isPlaying ? "pause" : "play"}</Button>
      </Row>
    </Wrapper>
  );
};
export default ZonesColors;
