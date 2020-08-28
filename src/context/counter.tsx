import { useKeepAwake } from 'expo-keep-awake';

import React, { useState, useReducer } from 'react';
import { useStopwatch } from 'react-timer-hook';

import { hmsTos } from '/utils/helpers';

const CounterContext = React.createContext({});

export const CounterProvider = (props: any) => {
    useKeepAwake();
  
    const [activityInfo, setActivityInfo] = useState({
        startTime: 0,
        activeTime: 0,
        startPauseTime: 0,
        pauseTime: 0,
        pauseSegments: []
    });

    const ActiveCounterRef = useStopwatch();
    const PauseCounterRef = useStopwatch();
    const PauseSegmentCounterRef = useStopwatch();

    const startCounter = (callback = () => true) => {
        if(!ActiveCounterRef.isRunning && !PauseCounterRef.isRunning) {
            setActivityInfo({
                ...activityInfo,
                startTime: Date.now(),
            })

            ActiveCounterRef.start();

            callback();
        }
    }

    const stopCounter = (callback = () => true) => {
        setActivityInfo({
            ...activityInfo,
            activeTime: hmsTos(ActiveCounterRef.hours, ActiveCounterRef.minutes, ActiveCounterRef.seconds)
        })

        if(ActiveCounterRef.isRunning || PauseCounterRef.isRunning) {
            ActiveCounterRef.pause();
            ActiveCounterRef.reset();
            PauseCounterRef.reset();

            callback();
        }
    }

    const startPause = (callback = () => true) => {
        if(ActiveCounterRef.isRunning && !PauseCounterRef.isRunning) {
            setActivityInfo({
                ...activityInfo,
                startPauseTime: Date.now()
            })

            ActiveCounterRef.pause();
            PauseCounterRef.start();
            PauseSegmentCounterRef.start()

            callback();
        }
    }

    const stopPause = (callback = () => true) => {
        if(!ActiveCounterRef.isRunning && PauseCounterRef.isRunning) {
            setActivityInfo({
                ...activityInfo,
                pauseTime: hmsTos(PauseCounterRef.hours, PauseCounterRef.minutes, PauseCounterRef.seconds)
            })

            PauseCounterRef.pause();
            PauseSegmentCounterRef.pause();
            PauseSegmentCounterRef.reset()
            ActiveCounterRef.start();

            callback();
        }
    }

	return (
		<CounterContext.Provider value={{ startCounter, stopCounter, startPause, stopPause, ActiveCounterRef, PauseCounterRef }}>
			{props.children}
		</CounterContext.Provider>
	);
};

export const UserConsumer = CounterContext.Consumer;

export default CounterContext;
