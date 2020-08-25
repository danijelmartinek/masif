import { ProjectColorsType } from '/components/molecules/projectColorSelect/index.tsx';
import { ProjectIconType } from '/components/molecules/projectIconSelect/index.tsx';

const providedColors: ProjectColorsType[] = [
	{
		primary: 'red',
		secondary: 'purple',
		selected: true
	},
	{
		primary: 'orange',
		secondary: 'blue',
		selected: false
	},
	{
		primary: 'cyan',
		secondary: 'pink',
		selected: false
	}
];

const providedIcons: ProjectIconType[] = [
	{ type: 'hiking', selected: true },
	{ type: 'camp_fire', selected: false },
	{ type: 'camp_tent', selected: false },
	{ type: 'close', selected: false }
];

export {
    providedColors,
    providedIcons
};