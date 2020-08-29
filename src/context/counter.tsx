import { useKeepAwake } from 'expo-keep-awake';
import { WebView } from 'react-native-webview';

import React, { useState, useRef } from 'react';
import { View } from 'react-native';

const CounterContext = React.createContext({});

const getCurrentTimeFromEpoch = () => {
	let d = new Date();
	return Math.round(d.getTime() / 1000);
};

export const CounterProvider = (props: any) => {
	useKeepAwake();

	const [startTime, setStartTime] = useState(getCurrentTimeFromEpoch());
	const [webViewKey, setWebViewKey] = useState(Math.random());

	const [initialActiveVal, setInitialActiveVal] = useState(0);
	const [initialPauseVal, setInitialPauseVal] = useState(0);

	const [activeCounter, setActiveCounter] = useState(0);
	const [pauseCounter, setPauseCounter] = useState(0);

	const [isEnabled, setIsEnabled] = useState(false);
	const [isActive, setIsActive] = useState(false);

	const [activityInfo, setActivityInfo] = useState({
		startTime: 0,
		activeTime: 0,
		startPauseTime: 0,
		pauseTime: 0,
		pauseSegments: []
	});

	const activeCounterJs = `
        setInterval(() => {
            let d = new Date();
            window.ReactNativeWebView.postMessage(Math.round(d.getTime() / 1000));
        }, 1000)
    `;

	const handleCounterCallback = (e: any) => {
		if (isActive) {
			setActiveCounter(
				initialActiveVal + (Number(e.nativeEvent.data) - startTime)
			);
		} else {
			setPauseCounter(
				initialPauseVal + Number(e.nativeEvent.data) - startTime
			);
		}
	};

	const startCounter = (callback = () => true) => {
		if (!isActive) {
			if (!isEnabled) {
				setIsEnabled(true);
			}

			setStartTime(getCurrentTimeFromEpoch());
			setIsActive(true);
			setInitialPauseVal(pauseCounter);
		}
	};

	const startPause = (callback = () => true) => {
        if (isActive) {
            setStartTime(getCurrentTimeFromEpoch());
            setIsActive(false);
            setInitialActiveVal(activeCounter);
        }
	};

	const stopCounter = (callback = () => true) => {
		if (isEnabled) {
			setWebViewKey(Math.random());
			setIsEnabled(false);
		}

		setActiveCounter(0);
		setPauseCounter(0);
		setInitialActiveVal(0);
		setInitialPauseVal(0);
		setIsActive(false);
	};

	const stopPause = (callback = () => true) => {
		startCounter();
	};

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
					isEnabled
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
