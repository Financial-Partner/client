import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const RightTriangle: React.FC<SvgProps> = props => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M4 2L20 12L4 22V2Z" fill="black" />
  </Svg>
);

export default RightTriangle;
