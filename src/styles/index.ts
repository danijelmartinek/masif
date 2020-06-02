import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '/utils/dimensions';

import { ThemeType } from './types';

let Theme: ThemeType = {
    'light': {
        label: 'light',
        colors: {
            primary: '#e1e1e1',
            secondary: '#cacaca',
            tertiary: '#b4b4b4',
            accent: 'purple',
            textPrimary: "#161616",
            textSecondary: '#434343',

            topBar: {
                background: 'transparent',
                text: '#161616'
            },

            semantic: {
                error: 'red',
                success: 'green',
                warning: 'yellow'
            }
        }
    },

    'dark': {
        label: 'dark',
        colors: {
            primary: '#101424',
            secondary: '#181e36',
            tertiary: '#272b39',
            accent: 'purple',
            textPrimary: "#ffffff",
            textSecondary: '#e5e5e5',

            topBar: {
                background: 'transparent',
                text: '#ffffff'
            },

            semantic: {
                error: 'red',
                success: 'green',
                warning: 'yellow'
            }
        }
    },

    project: {
        colors: {
            projectPrimary: '',
            projectSecondary: ''
        },
        icon: null
    },

    fonts: {
        primary: "Times New Roman",
        secondary: "Arial",
        tertiary: '',

        oSize: {
            giga: {
                fontSize: hp('8.4%'), 
                lineHeight: hp('12.6%')
            }, //+2.0
            mega: {
                fontSize: hp('6.4%'), 
                lineHeight: hp('9.6%')
            }, //+1.6
            kilo: {
                fontSize: hp('4.8%'), 
                lineHeight: hp('7.2%')
            }, //+1.2

            alpha: {
                fontSize: hp('3.6%'), 
                lineHeight: hp('5.4%')
            }, //+.8
            beta: {
                fontSize: hp('2.8%'), 
                lineHeight: hp('4.2%')
            }, //+.6
            gamma: {
                fontSize: hp('2.2%'), 
                lineHeight: hp('3.3%')
            }, //+.4
            delta: {
                fontSize: hp('1.8%'), 
                lineHeight: hp('2.7%')
            }, //+.2
            epsilon: {
                fontSize: hp('1.6%'), 
                lineHeight: hp('2.4%')
            }, //+.1
            zeta: {
                fontSize: hp('1.5%'), 
                lineHeight: hp('2.25%')
            }, //0

            mili: {
                fontSize: hp('1.1%'), 
                lineHeight: hp('1.65%')
            } //-.4
        },

        size: {
            giga: `
                font-size: ${hp('8.4%')};
                line-height: ${hp('12.6%')};a
            `, //+2.0
            mega: `
                font-size: ${hp('6.4%')};
                line-height: ${hp('9.6%')};
            `, //+1.6
            kilo: `
                font-size: ${hp('4.8%')};
                line-height: ${hp('7.2%')};
            `, //+1.2
            alpha: `
                font-size: ${hp('3.6%')};
                line-height: ${hp('5.4%')};
            `, //+.8
            beta: `
                font-size: ${hp('2.8%')};
                line-height: ${hp('4.2%')};
            `, //+.6
            gama: `
                font-size: ${hp('2.2%')};
                line-height: ${hp('3.3%')};
            `, //+.4
            delta: `
                font-size: ${hp('1.8%')};
                line-height: ${hp('2.7%')};
            `, //+.2
            epsilon: `
                font-size: ${hp('1.6%')};
                line-height: ${hp('2.4%')};
            `, //+.1
            zeta: `
                font-size: ${hp('1.5%')};
                line-height: ${hp('2.25%')};
            `, //0
            mili: `
                font-size: ${hp('1.1%')};
                line-height: ${hp('1.65%')};
            `, //-.4
        }
    },

    options: {
        initialOpacity: 1,
        activeOpacity: 0.5,
        textDepressedOpacity: 0.5
    }
    
}


export default Theme;