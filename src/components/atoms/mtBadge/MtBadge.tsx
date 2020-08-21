import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import Icon from '/components/atoms/icon/';

type Props = React.SVGProps<SVGSVGElement> & {
	size: number;
	primaryColor: string;
	secondaryColor: string;
	icon: string;
	iconColor: string;
};

const MtBadge = (props: Props) => {
	return (
		<Svg
			width={props.size}
			height={props.size}
			viewBox="0 0 48 48"
			fill="none"
		>
			<G clipPath="url(#prefix__clip0)">
				<G>
					<Path
						d="M4 15.102c0-1.602.88-3.082 2.31-3.883l15.38-8.618c1.43-.801 3.19-.801 4.62 0l15.38 8.618C43.12 12.02 44 13.5 44 15.102V32.34c0 1.601-.88 3.081-2.31 3.882l-15.38 8.619c-1.43.8-3.19.8-4.62 0L6.31 36.222C4.88 35.422 4 33.942 4 32.34V15.102z"
						fill={props.primaryColor}
					/>
				</G>
				<G>
					<Path
						d="M13 40.793c0-.99.827-1.793 1.848-1.793h18.305c1.02 0 1.847.803 1.847 1.793v3.414c0 .99-.827 1.793-1.847 1.793H14.848C13.828 46 13 45.197 13 44.207v-3.414z"
						fill={props.secondaryColor}
					/>
				</G>
			</G>
			<Defs>
				<ClipPath id="prefix__clip0">
					<Path fill="#fff" d="M0 0h48v48H0z" />
				</ClipPath>
			</Defs>
			<G transform="translate(9, 7)">
				<Icon
					type={props.icon}
					size={30}
					color={props.iconColor}
				></Icon>
			</G>
		</Svg>
	);
};

MtBadge.defaultProps = {
	size: 48,
	primaryColor: '#004A8E',
	secondaryColor: '#FF922E',
	icon: '',
	iconColor: '#ffffff'
};

export default MtBadge;
