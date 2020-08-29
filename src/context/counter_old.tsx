import { useKeepAwake } from 'expo-keep-awake';
import { WebView } from 'react-native-webview';

import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { useStopwatch } from 'react-timer-hook';

import { hmsTos } from '/utils/helpers';

const CounterContext = React.createContext({});

export const CounterProvider = (props: any) => {
    useKeepAwake();

    const [initialActiveVal, setInitialActiveVal] = useState(0);
    const [initialPauseVal, setInitialPauseVal] = useState(0);

    const [activeCounterKey, setActiveCounterKey] = useState(Math.random());
    const [pauseCounterKey, setPauseCounterKey] = useState(Math.random());

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

    // React.useEffect(() => {
    //     if(isActive) {
    //         activeCounterRef.current.reload();
    //     } else {
    //         pauseCounterRef.current.reload();
    //     }
    // }, [])

    const activeCounterJs = `
        let startTime = Date.now();
        setInterval(() => {
            window.ReactNativeWebView.postMessage(Math.round((Date.now() - startTime) / 1000));
            i++;
        }, 1000)
    `;

    const pauseCounterJs = `
        let startTime = Date.now();
        setInterval(() => {
            window.ReactNativeWebView.postMessage(Math.round((Date.now() - startTime) / 1000));
            i++;
        }, 1000)
    `;















    const ActiveCounterRef = useStopwatch();
    const PauseCounterRef = useStopwatch();
    const PauseSegmentCounterRef = useStopwatch();

    const startCounter = (callback = () => true) => {
        setInitialPauseVal(pauseCounter)
        setIsActive(true);
        setActiveCounterKey(Math.random())
    }

    const stopCounter = (callback = () => true) => {
        setInitialActiveVal(activeCounter)
        setIsActive(false);
        setPauseCounterKey(Math.random())
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
        <React.Fragment>
            <CounterContext.Provider value={{ startCounter, stopCounter, startPause, stopPause, ActiveCounterRef, PauseCounterRef, activeCounter, pauseCounter }}>
			    {props.children}

                <View style={{flex: 1, display: 'none', position: 'absolute', opacity: 0}}>
                    {isActive ? (
                        <WebView
                            key={activeCounterKey}
                            injectedJavaScript={activeCounterJs}
                            source={{html: '<html><body></body></html>'}}
                            onMessage={e => setActiveCounter(initialActiveVal + Number(e.nativeEvent.data))}
                        />
                    ) : (
                        <WebView
                            key={pauseCounterKey}
                            injectedJavaScript={pauseCounterJs}
                            source={{html: '<html><body></body></html>'}}
                            onMessage={e => setPauseCounter(initialPauseVal + Number(e.nativeEvent.data))}
                        />
                    )}
                </View>
		    </CounterContext.Provider>
        </React.Fragment>
	);
};

export const CounterConsumer = CounterContext.Consumer;

export default CounterContext;
