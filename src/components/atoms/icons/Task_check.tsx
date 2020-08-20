import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

type IconProps = React.SVGProps<SVGSVGElement> & {
    size: number;
    color: string;
    opacity: number;
};

const TasksCheckIcon = (props: IconProps) => {
  return (
    <Svg {...props} width={props.size} height={props.size} viewBox="0 0 23 23" fill="none">
      <Circle opacity={props.opacity} cx={11.5} cy={11.5} r={11.5} fill={props.color} />
      <Path d="M6 11.4l4.098 3.6L17 6" stroke={props.color} strokeWidth={2} />
    </Svg>
  )
};

TasksCheckIcon.defaultProps = {
    size: 25,
    color: "#ffffff",
    opacity: 0.3
};

export default TasksCheckIcon;
