import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const UpArrow: React.FC<SvgProps> = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M12 2L4 10h5v8h6v-8h5L12 2z"
      fill="red"
    />
  </Svg>
);

export default UpArrow;
