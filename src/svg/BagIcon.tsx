import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';


const BagIcon = (props: SvgProps) => (
  <Svg
    fill="#000000"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    id="bag"
    data-name="Flat Color"
    className="icon flat-color"
    {...props}
  >
    <Path
      id="primary"
      d="M19.07,8.85a2,2,0,0,0-2-1.85H6.93a2,2,0,0,0-2,1.85l-.84,11a2,2,0,0,0,.52,1.51A2,2,0,0,0,6.08,22H17.92a2,2,0,0,0,2-2.15Z"
      style={{
        fill: 'rgb(0, 130, 0)',
      }}
    />
    <Path
      id="secondary"
      d="M15,12a1,1,0,0,1-1-1V6a2,2,0,0,0-4,0v5a1,1,0,0,1-2,0V6a4,4,0,0,1,8,0v5A1,1,0,0,1,15,12Z"
      style={{
        fill: 'rgb(44, 169, 188)',
      }}
    />
  </Svg>
);
export default BagIcon;
