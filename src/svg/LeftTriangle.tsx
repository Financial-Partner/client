import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const LeftTriangle: React.FC<SvgProps> = props => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M20 2L4 12L20 22V2Z" fill="black" />
  </Svg>
);

export default LeftTriangle;
