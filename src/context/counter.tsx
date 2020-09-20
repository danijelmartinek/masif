// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 

import { useKeepAwake } from 'expo-keep-awake';
import { WebView } from 'react-native-webview';

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

const CounterContext = React.createContext({});

const getCurrentTimeFromEpoch = (d: Date) => {
	return d.getTime() / 1000;
};

const roundTo3Dec = (num: number): number => {
	return Math.round(num * 1000) / 1000;
};

export const CounterProvider = (props: any) => {
	useKeepAwake();

	const [timerStartTimeRef, setTimerStartTimeRef] = useState(
		getCurrentTimeFromEpoch(new Date())
	);
	const [webViewKey, setWebViewKey] = useState(Math.random());

	const [initialActiveVal, setInitialActiveVal] = useState(0);
	const [initialPauseVal, setInitialPauseVal] = useState(0);

	const [activeCounter, setActiveCounter] = useState(0);
	const [pauseCounter, setPauseCounter] = useState(0);

	const [isEnabled, setIsEnabled] = useState(false);
	const [isActive, setIsActive] = useState(false);

	const [counterThreadTime, setCounterThreadTime] = useState('');

	const [sessionInfo, setSessionInfo] = useState({
		startTime: '',
		activeTime: 0,
		endTime: '',
		pauseTime: 0,
		sessionSegments: [],
		pauseSegments: [],
		totalSessionTime: 0
	});

	const [sessionSegment, setSessionSegment] = useState({
		sessionSegmentStartTime: '',
		sessionSegmentTime: 0,
		sessionSegmentEndTime: ''
	});

	const [pauseSegment, setPauseSegment] = useState({
		pauseSegmentStartTime: '',
		pauseSegmentTime: 0,
		pauseSegmentEndTime: ''
	});

	const activeCounterJs = `
        setInterval(() => {
            window.ReactNativeWebView.postMessage(new Date().toISOString());
        }, 1000)
    `;

	const handleCounterCallback = (e: any) => {
		if (isActive) {
			setCounterThreadTime(e.nativeEvent.data);
			setActiveCounter(
				initialActiveVal +
					roundTo3Dec(
						new Date(e.nativeEvent.data).getTime() / 1000 -
							timerStartTimeRef
					)
			);
		} else {
			setCounterThreadTime(e.nativeEvent.data);
			setPauseCounter(
				initialPauseVal +
					roundTo3Dec(
						new Date(e.nativeEvent.data).getTime() / 1000 -
							timerStartTimeRef
					)
			);
		}
	};

	const startCounter = (callback = () => true) => {
		if (!isActive) {
			let cDate = new Date();

			if (!isEnabled) {
				setIsEnabled(true);
				setSessionInfo({
					...sessionInfo,
					startTime: cDate.toISOString()
				});
			}

			setSessionSegment({
				...sessionSegment,
				sessionSegmentStartTime: cDate.toISOString()
			});

			setTimerStartTimeRef(getCurrentTimeFromEpoch(cDate));
			setIsActive(true);
			setInitialPauseVal(pauseCounter);
		}
	};

	const startPause = (callback = () => true) => {
		if (isActive) {
			let cDate = new Date();
			const cTimeFEpoh = getCurrentTimeFromEpoch(cDate);

			setTimerStartTimeRef(cTimeFEpoh);
			setIsActive(false);
			setInitialActiveVal(activeCounter);

			setPauseSegment({
				...pauseSegment,
				pauseSegmentStartTime: cDate.toISOString()
			});

			setSessionSegment({
				...sessionSegment,
				sessionSegmentTime:
					(Date.parse(counterThreadTime) -
						Date.parse(sessionSegment.sessionSegmentStartTime)) /
					1000,
				sessionSegmentEndTime: counterThreadTime
			});
		}
	};

	const stopCounter = (callback = (session: {}) => true) => {
		if (isEnabled) {
			setWebViewKey(Math.random());
			setIsEnabled(false);
		}

		setActiveCounter(0);
		setPauseCounter(0);
		setInitialActiveVal(0);
		setInitialPauseVal(0);
		setIsActive(false);

		const getSessionSegment = () => {
			if (sessionSegment.sessionSegmentStartTime) {
				return {
					...sessionSegment,
					sessionSegmentTime:
						(Date.parse(counterThreadTime) -
							Date.parse(
								sessionSegment.sessionSegmentStartTime
							)) /
						1000,
					sessionSegmentEndTime: counterThreadTime
				};
			} else {
				return null;
			}
		};

		const getPauseSegment = () => {
			if (pauseSegment.pauseSegmentStartTime) {
				return {
					...pauseSegment,
					pauseSegmentTime:
						(Date.parse(counterThreadTime) -
							Date.parse(pauseSegment.pauseSegmentStartTime)) /
						1000,
					pauseSegmentEndTime: counterThreadTime
				};
			} else {
				return null;
			}
		};

		const sessionObject = {
			...sessionInfo,
			activeTime: activeCounter,
			endTime: counterThreadTime,
			pauseTime: pauseCounter,
			sessionSegments: [
				...sessionInfo.sessionSegments,
				getSessionSegment()
			].filter((a) => a !== null),
			pauseSegments: [
				...sessionInfo.pauseSegments,
				getPauseSegment()
			].filter((a) => a !== null),
			totalSessionTime: activeCounter + pauseCounter
		};

		setSessionInfo(sessionObject);

		callback(sessionObject);
	};

	const stopPause = (callback = () => true) => {
		startCounter();

		setPauseSegment({
			...pauseSegment,
			pauseSegmentTime:
				(Date.parse(counterThreadTime) -
					Date.parse(pauseSegment.pauseSegmentStartTime)) /
				1000,
			pauseSegmentEndTime: counterThreadTime
		});
	};

	// session segment handler

	useEffect(() => {
		if (sessionSegment.sessionSegmentEndTime) {
			setSessionInfo({
				...sessionInfo,
				sessionSegments: [
					...sessionInfo.sessionSegments,
					sessionSegment
				]
			});
		}
	}, [sessionSegment.sessionSegmentEndTime]);

	useEffect(() => {
		setSessionSegment({
			sessionSegmentStartTime: '',
			sessionSegmentTime: 0,
			sessionSegmentEndTime: ''
		});
	}, [sessionInfo.sessionSegments]);

	// pause segment handler

	useEffect(() => {
		if (pauseSegment.pauseSegmentEndTime) {
			setSessionInfo({
				...sessionInfo,
				pauseSegments: [...sessionInfo.pauseSegments, pauseSegment]
			});
		}
	}, [pauseSegment.pauseSegmentEndTime]);

	useEffect(() => {
		setPauseSegment({
			pauseSegmentStartTime: '',
			pauseSegmentTime: 0,
			pauseSegmentEndTime: ''
		});
	}, [sessionInfo.pauseSegments]);

	useEffect(() => {
		setSessionInfo({
			startTime: '',
			activeTime: 0,
			endTime: '',
			pauseTime: 0,
			sessionSegments: [],
			pauseSegments: [],
			totalSessionTime: 0
		});
	}, [sessionInfo.endTime]);

	return (
		<React.Fragment>
			<CounterContext.Provider
				value={{
					startCounter,
					stopCounter,
					startPause,
					stopPause,
					activeCounter,
					pauseCounter,
					isEnabled,
					isActive,
					sessionInfo
				}}
			>
				{props.children}

				{isEnabled ? (
					<View
						style={{
							flex: 1,
							display: 'none',
							position: 'absolute',
							opacity: 0
						}}
					>
						<WebView
							key={webViewKey}
							injectedJavaScript={activeCounterJs}
							source={{ html: '<html><body></body></html>' }}
							onMessage={(e) => handleCounterCallback(e)}
						/>
					</View>
				) : null}
			</CounterContext.Provider>
		</React.Fragment>
	);
};

export const CounterConsumer = CounterContext.Consumer;

export default CounterContext;
