import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { IconProps } from './types';

//---- listed icons

import Hiking from './iconElements/Hiking';
import CampTent from './iconElements/Camp_tent';
import CampFire from './iconElements/Camp_fire';
import Flame from './iconElements/Flame';
import Flag from './iconElements/Flag';
import TaskCheck from './iconElements/Task_check';

//---- types

type IconListType = {
	[key: string]: FunctionComponent<IconProps>;
};

//---- icons object

const IconList: IconListType = {
	hiking: Hiking,
	camp_tent: CampTent,
	camp_fire: CampFire,
	flame: Flame,
	flag: Flag,
	task_check: TaskCheck
};

//---- component

const IconElement = (props: IconProps) => {
	if (props.type) {
		const SelectedIcon = IconList[props.type];
		return (
			<SelectedIcon
				size={props.size}
				color={props.color}
				text={props.text}
				flagColor={props.flagColor}
				textColor={props.textColor}
				opacity={props.opacity}
			></SelectedIcon>
		);
	} else {
		return <View></View>;
	}
};

//---- default props

IconElement.defaultProps = {
	type: ''
};

//----

export default IconElement;
