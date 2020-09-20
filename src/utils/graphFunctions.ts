// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 

import moment from 'moment';
import { ProjectSessionType, ProjectActivityType, SessionSegmentType, PauseSegmentType } from '/redux/types';
import { MtGraphPointType } from '/components/atoms/mtGraph/types';

const isCurrentDay = (date: string): boolean => {
    return moment(date).startOf('day').toISOString() === moment().startOf('day').toISOString()
} 

// Accepts the array and key
const groupBy = (array: any, key: string) => {
	// Return the end result
	return array.reduce((result: any, currentValue: any) => {
		// If an array already present for key, push it to the array. Else create an array and push the object
		(result[currentValue[key]] = result[currentValue[key]] || []).push(
			currentValue
		);
		// Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
		return result;
	}, {}); // empty object is the initial value for result object
};





const accumulateSessions = (sessions: ProjectSessionType[] = []): ProjectActivityType[] => {
    const groupedSessions: ProjectSessionType[][] = Object.values(groupBy(sessions.map((sess: ProjectSessionType) => {
        sess.activityDate = moment(sess.startTime).startOf('day').toISOString();

        return sess;
    }), 'activityDate'))

    return groupedSessions.map((groupedSess: ProjectSessionType[]): ProjectActivityType => {
        if(isCurrentDay(groupedSess[0].activityDate? groupedSess[0].activityDate : '')) {
            return {
                startTime: '',
                endTime: '',
                totalActivityTime: 0,
                totalActivityPauseTime: 0,
                activityDate: '',
                sessionSegments: [],
                pauseSegments: []
            };
        } else {

            let tempSession: ProjectActivityType = {
                startTime: groupedSess[0].startTime,
                endTime: groupedSess[groupedSess.length - 1].endTime,
                totalActivityTime: groupedSess.reduce((acc: number, di: ProjectSessionType): number => acc + di.activeTime, 0) || 0,
                totalActivityPauseTime: groupedSess.reduce((acc: number, di: ProjectSessionType): number => acc + di.pauseTime, 0) || 0,
                activityDate: groupedSess[0].activityDate? groupedSess[0].activityDate : '',
                // sessionSegments: groupedSess.reduce((sessSegments: SessionSegmentType[], di: ProjectSessionType): SessionSegmentType[] => [...sessSegments, ...di.sessionSegments], []) || [],
                // pauseSegments: groupedSess.reduce((pausSegments: PauseSegmentType[], di: ProjectSessionType): PauseSegmentType[] => [...pausSegments, ...di.pauseSegments], []) || []
            };

            return tempSession;
        }
    }).filter(el => el.totalActivityTime > 0) || [];
      
};

const accumulateCurrentDaySessions = (sessions: ProjectSessionType[] = []): ProjectActivityType => {
    const currentDaySessions: ProjectSessionType[][] = Object.values(groupBy(sessions.map((sess: ProjectSessionType): ProjectSessionType => {
        sess.activityDate = moment(sess.startTime).startOf('day').toISOString();

        return sess;
    }).filter(findSess => findSess.activityDate === moment().startOf('day').toISOString()), 'activityDate'));

    const currentDaySessionsFlat: ProjectSessionType[] = currentDaySessions.flat(1)

    return {
        startTime: currentDaySessionsFlat[0]?.startTime || '',
        endTime: currentDaySessionsFlat[0]?.startTime || '',
        totalActivityTime: currentDaySessionsFlat[0] ? currentDaySessionsFlat.reduce((acc: number, di: ProjectSessionType): number => acc + di.activeTime, 0) : 0,
        totalActivityPauseTime: currentDaySessionsFlat[0] ? currentDaySessionsFlat.reduce((acc: number, di: ProjectSessionType): number => acc + di.pauseTime, 0) : 0,
        activityDate: currentDaySessionsFlat[0]?.activityDate? currentDaySessionsFlat[0].activityDate : moment().startOf('day').toISOString(),
        // sessionSegments: currentDaySessionsFlat.reduce((sessSegments: SessionSegmentType[], di: ProjectSessionType): SessionSegmentType[] => [...sessSegments, ...di.sessionSegments], []) || [],
        // pauseSegments: currentDaySessionsFlat.reduce((pausSegments: PauseSegmentType[], di: ProjectSessionType): PauseSegmentType[] => [...pausSegments, ...di.pauseSegments], []) || []
    } || {};
};

const sortActivities = (activities: ProjectActivityType[] = []): ProjectActivityType[] => {
    return activities.sort((a: ProjectActivityType, b: ProjectActivityType) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return Number(new Date(a.activityDate)) - Number(new Date(b.activityDate));
    });
}

const calcPointHeight = (activities: ProjectActivityType[] = [], index: number, dayTime: number) => {
    const slicedActivities = activities.slice(0, index + 1);
    const average: number = Math.round(slicedActivities.reduce((acc: number, at: ProjectActivityType) => acc + at.totalActivityTime, 0) / slicedActivities.length);

    return average + (dayTime - average);
}

const makeGraphPoints = (activities: ProjectActivityType[] = []) => {
    const graphPoints: MtGraphPointType[] = activities.map((activity, index): MtGraphPointType => {
        return [(index + 1) * 50, calcPointHeight(activities, index, activity.totalActivityTime), 0.05]
    })
    return graphPoints;
}

export { accumulateSessions, sortActivities, makeGraphPoints, accumulateCurrentDaySessions };
