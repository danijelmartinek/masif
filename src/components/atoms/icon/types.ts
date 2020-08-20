import * as React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    type?: string;
    size: number;
    color: string;
    text?: string;
    flagColor?: string;
    textColor?: string;
    opacity?: number;
};