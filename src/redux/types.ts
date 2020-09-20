import { Action } from 'redux';
import {
	ThemeType,
	SelectedTheme,
	ProjectThemeOptionsType
} from '/styles/types';

export interface ProjectTaskType {
	_id: string;
	text: string;
	priority: string;
	checked: boolean;
	createdAt: number;
	updatedAt: number;
}

export interface SessionSegmentType {
	sessionSegmentStartTime: string;
	sessionSegmentTime: number;
	sessionSegmentEndTime: string;
}

export interface PauseSegmentType {
	pauseSegmentStartTime: string;
	pauseSegmentTime: number;
	pauseSegmentEndTime: string;
}

export interface ProjectActivityType {
	startTime: string;
	endTime: string;
	totalActivityTime: number;
	totalActivityPauseTime: number;
    activityDate: string;
    sessionSegments?: SessionSegmentType[];
	pauseSegments?: PauseSegmentType[];
}

export interface ProjectSessionType {
    _id: string;
	activeTime: number;
	pauseTime: number;
	totalSessionTime: number;
	startTime: string;
	endTime: string;
	sessionSegments: SessionSegmentType[];
    pauseSegments: PauseSegmentType[];
    createdAt: Date;
    updatedAt: Date;
    
    activityDate?: string;
}

export interface ProjectType {
	_id: string;
	name: string;
	projectThemeOptions: ProjectThemeOptionsType;
	tasks: ProjectTaskType[];
	sessions: ProjectSessionType[];
	createdAt: Date;
	updatedAt: Date;
}

export interface StoreStateType {
	OPTIONS: object;
	THEME_OPTIONS: ThemeType;
	DEFAULT_THEME: SelectedTheme;

	ALL_PROJECTS?: ProjectType[];
	SELECTED_PROJECT: string;
	SELECTED_ACTIVITY_INDEX: number;
}

export interface ActionType extends Action {
	type: string;
	[name: string]: any;
}
