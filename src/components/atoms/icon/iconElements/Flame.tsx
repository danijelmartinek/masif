import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { IconProps } from './../types';

const FlameIcon = (props: IconProps) => {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 16 25" fill={props.color}>
      <Path
        d="M10.595 24.779c-.04.482 2.008-1.372 2.927-2.831a9.646 9.646 0 001.358-3.604 9.446 9.446 0 00-1.56-6.894S10.806 8.03 10.1 7.724c.24.469.454.949.641 1.44.31.732.532 1.496.663 2.278.135.886.253 1.642-.06 2.528-.175.488-.521 1.453-.904 1.453a.335.335 0 01-.196-.096 2.773 2.773 0 01-.846-1.453c-.24-1.235-.81-4.412-.96-5.158A11.482 11.482 0 007.325 5.46a12.064 12.064 0 00-3.98-4.336C2.765.73 1.437-.09 1.362.008c0 .02.018.067.033.09.015.024 1.006 1.372 1.752 2.532.289.476.498.993.62 1.531.48 1.686.088 3.174-.183 4.162-.157.564-.274.814-2.602 5.612-.274.561-.286.582-.319.666a8.155 8.155 0 00-.44 5.124c.21.838.562 1.637 1.04 2.365 0 0 1.065 1.645 3.613 2.907.02.004.042.004.063 0a.13.13 0 00.096-.04c.03-.042 0-.103 0-.135a1.737 1.737 0 00-.198-.438 7.948 7.948 0 01-.524-.899c-.205-.337-.253-.764-.34-1.607-.101-.68-.133-1.366-.097-2.052.06-.622.253-1.162.635-2.197.633-1.717.961-2.168 1.322-3.47 0 0 .094-.599.301-1.363.056-.254.145-.5.265-.732.013.254 0 .509-.036.761-.024.648.139 1.07.47 2.014.265.753.506 1.511.768 2.264.415 1.203.626 1.808.653 2.008.154 1.186-.135 2.238.115 2.305.054.018.111-.026.144-.05.699-.508.726-.267 1.566-.918.481-.32.897-.724 1.225-1.191.157-.25.302-.561.38-.538.078.023.02.265 0 .442-.106.816.033.872-.036 1.874a7.8 7.8 0 01-.16 1.276c-.187.846-.882 2.302-.894 2.468z"
      />
    </Svg>
  )
};

FlameIcon.defaultProps = {
    size: 25,
    color: "#000000"
};

export default FlameIcon;