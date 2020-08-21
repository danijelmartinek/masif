import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { IconProps } from './../types';

const HamburgerIcon = (props: IconProps) => {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 48 48" fill={props.color}>
      <Path
        d="M10 13.297c0-.716.57-1.297 1.273-1.297h25.454c.703 0 1.273.58 1.273 1.297v1.946c0 .717-.57 1.298-1.273 1.298H11.273c-.703 0-1.273-.581-1.273-1.298v-1.946zM10 23.027c0-.716.57-1.297 1.273-1.297H29.09c.703 0 1.273.58 1.273 1.297v1.946c0 .716-.57 1.297-1.273 1.297H11.273c-.703 0-1.273-.58-1.273-1.297v-1.946zM10 32.757c0-.717.57-1.297 1.273-1.297h25.454c.703 0 1.273.58 1.273 1.297v1.946c0 .716-.57 1.297-1.273 1.297H11.273C10.57 36 10 35.42 10 34.703v-1.946z"
      />
    </Svg>
  )
};

HamburgerIcon.defaultProps = {
    size: 25,
    color: "#000000"
};

export default HamburgerIcon;