import { ProjectColorsType } from '/components/molecules/projectColorSelect/index.tsx';
import { ProjectIconType } from '/components/molecules/projectIconSelect/index.tsx';

const providedColors: ProjectColorsType[] = [
	{
		primary: '#7A008E',
		secondary: '#FF2EC4',
		selected: true
	},
	{
		primary: '#8E0000',
		secondary: '#FFC42E',
		selected: false
	},
	{
		primary: '#008E6C',
		secondary: '#2EFFCD',
		selected: false
    },
    {
		primary: '#50008E',
		secondary: '#FF792E',
		selected: false
    },
    {
		primary: '#8E004B',
		secondary: '#FF2E2E',
		selected: false
    },
    {
		primary: '#33008E',
		secondary: '#2ED9FF',
		selected: false
	}
];

const providedIcons: ProjectIconType[] = [
	{ type: 'hiking', selected: true },
	{ type: 'camp_fire', selected: false },
	{ type: 'camp_tent', selected: false },
	{ type: 'flame', selected: false }
];

export {
    providedColors,
    providedIcons
};