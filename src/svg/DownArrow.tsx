import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const DownArrow: React.FC<SvgProps> = props => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M12 22L20 14h-5v-8h-6v8H4l8 8z" fill="green" />
  </Svg>
);

export default DownArrow;
