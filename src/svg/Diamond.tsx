import * as React from 'react';
import Svg, { Polygon, G, SvgProps } from 'react-native-svg';

const Diamond = (props: SvgProps) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    style={{
      enableBackground: 'new 0 0 512 512',
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Polygon
      style={{
        fill: '#FFE182',
      }}
      points="360.129,172.138 256,472.276 512,172.138 "
    />
    <G>
      <Polygon
        style={{
          fill: '#FFCD73',
        }}
        points="105.931,39.724 0,172.138 151.871,172.138  "
      />
      <Polygon
        style={{
          fill: '#FFCD73',
        }}
        points="360.129,172.138 512,172.138 406.069,39.724  "
      />
      <Polygon
        style={{
          fill: '#FFCD73',
        }}
        points="360.129,172.138 256,39.724 151.871,172.138  "
      />
    </G>
    <Polygon
      style={{
        fill: '#FFAA64',
      }}
      points="256,39.724 105.931,39.724 151.871,172.138 "
    />
    <Polygon
      style={{
        fill: '#FFE182',
      }}
      points="406.069,39.724 256,39.724 360.129,172.138 "
    />
    <Polygon
      style={{
        fill: '#FFAA64',
      }}
      points="151.871,172.138 256,472.276 360.129,172.138 "
    />
    <Polygon
      style={{
        fill: '#FF8C5A',
      }}
      points="0,172.138 256,472.276 151.871,172.138 "
    />
  </Svg>
);
export default Diamond;
