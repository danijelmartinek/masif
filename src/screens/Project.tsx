// import React, { useState } from 'react';
// import {
// 	View,
// 	Text,
// 	Button,
// 	ScrollView,
// 	StatusBar,
// 	TextInput,
// 	Platform,
// 	KeyboardAvoidingView
// } from 'react-native';
// import styled, { withTheme } from 'styled-components';
// import { connect, ConnectedProps } from 'react-redux';
// import { setTheme } from '/redux/actions';

// import Constants from 'expo-constants';

// import { StackScreenProps } from '@react-navigation/stack';
// import { RootStackParamList } from '/screens/';

// import BasicLayout from '/components/molecules/basicLayout/';

 

// import { SelectedTheme, ThemeMode } from '/styles/types';
// import {
// 	widthPercentageToDP as wp,
// 	heightPercentageToDP as hp
// } from '/utils/dimensions';

// import { Madoka } from 'react-native-textinput-effects';

// const mapDispatch = {
// 	setTheme: (theme: ThemeMode) => setTheme(theme)
// };
// const connector = connect(null, mapDispatch);

// const providedColors: ProjectColorsType[] = [
// 	{
// 		primary: 'red',
// 		secondary: 'purple',
// 		selected: true
// 	},
// 	{
// 		primary: 'orange',
// 		secondary: 'blue',
// 		selected: false
// 	},
// 	{
// 		primary: 'cyan',
// 		secondary: 'pink',
// 		selected: false
// 	},
// 	{
// 		primary: 'red',
// 		secondary: 'purple',
// 		selected: false
// 	},
// 	{
// 		primary: 'orange',
// 		secondary: 'blue',
// 		selected: false
// 	},
// 	{
// 		primary: 'cyan',
// 		secondary: 'pink',
// 		selected: false
// 	},
// 	{
// 		primary: 'red',
// 		secondary: 'purple',
// 		selected: false
// 	},
// 	{
// 		primary: 'orange',
// 		secondary: 'blue',
// 		selected: false
// 	},
// 	{
// 		primary: 'cyan',
// 		secondary: 'pink',
// 		selected: false
// 	},
// 	{
// 		primary: 'red',
// 		secondary: 'purple',
// 		selected: false
// 	},
// 	{
// 		primary: 'orange',
// 		secondary: 'blue',
// 		selected: false
// 	},
// 	{
// 		primary: 'cyan',
// 		secondary: 'pink',
// 		selected: false
// 	}
// ];

// const providedIcons: ProjectIconType[] = [
// 	{ type: 'hiking', selected: true },
// 	{ type: 'camp_fire', selected: false },
// 	{ type: 'camp_tent', selected: false },
// 	{ type: 'close', selected: false }
// ];

// type NewProjectBadgeType = {
// 	primaryColor: string;
// 	secondaryColor: string;
// 	icon: string;
// };

// type PropsFromRedux = ConnectedProps<typeof connector>;
// type Props = StackScreenProps<RootStackParamList, 'Project'>;
// type PropsWithTheme = Props &
// 	PropsFromRedux & {
// 		theme: SelectedTheme;
// 	};
// type StatusBarStyleType =
// 	| 'light-content'
// 	| 'dark-content'
// 	| 'default'
// 	| undefined;

// const ProjectScreen = (props: PropsWithTheme) => {
// 	const selectedColorsPair = providedColors.find((colors) => colors.selected);
// 	const selectedIcon = providedIcons.find((icon) => icon.selected);

// 	const [newProjectBadge, setNewProjectBadge] = useState<NewProjectBadgeType>(
// 		{
// 			primaryColor: selectedColorsPair?.primary || '#ffffff',
// 			secondaryColor: selectedColorsPair?.secondary || '#000000',
// 			icon: selectedIcon?.type || ''
// 		}
// 	);

// 	const [statusBarTheme, setStatusBarTheme] = useState<StatusBarStyleType>(
// 		'light-content'
// 	);

// 	// const toggleTheme = () => {
// 	// 	if (props.theme.label === 'dark') {
// 	// 		props.setTheme(ThemeMode.LIGHT);
// 	// 		setStatusBarTheme('dark-content');
// 	// 	} else {
// 	// 		props.setTheme(ThemeMode.DARK);
// 	// 		setStatusBarTheme('light-content');
// 	// 	}
// 	// };

//     // const sheetRef = React.useRef(null);
    
//     const BadgeColorsChanged = (colors: ProjectColorsType) => {
//         setNewProjectBadge({...newProjectBadge, ...{
//             primaryColor: colors.primary,
//             secondaryColor: colors.secondary,
//         }})
//     }

//     const BadgeIconChanged = (icon: ProjectIconType) => {
//         setNewProjectBadge({...newProjectBadge, ...{
//             icon: icon.type
//         }})
//     }

// 	return (
// 		<View
// 			style={{
// 				flex: 1,
// 				width: '100%',
// 				height: '100%',
// 				alignItems: 'center',
// 				justifyContent: 'center',
// 				backgroundColor: props.theme.colors.primary,
// 				position: 'absolute'
// 			}}
// 		>
// 			<StatusBar
// 				translucent
// 				backgroundColor="transparent"
// 				barStyle={statusBarTheme}
// 			/>
// 			<BasicLayout
// 				navigation={props.navigation}
// 				route={props.route}
// 				screenName={'Add Project'}
// 				headerActionButton={true}
// 				headerActionButtonSettings={['Save', '#ffffff', 'green', 0.5]}
// 				headerActionButtonOnPress={() => console.log('heheh')}
// 			>
// 				<View>
// 					<Badge
// 						icon={newProjectBadge.icon}
// 						primaryColor={newProjectBadge.primaryColor}
// 						secondaryColor={newProjectBadge.secondaryColor}
// 						size={hp('15%')}
// 					></Badge>
//             zz
// 					<View
// 						style={{
// 							padding: hp('2%')
// 						}}
// 					>
// 						{/* <Madoka
// 							label={'Project Name'}
// 							onChangeText={(text) => onChangeText(text)}
// 							borderColor={'#aee2c9'}
// 							inputPadding={hp('2%')}
// 							labelStyle={{ color: '#008445' }}
// 							inputStyle={{ color: '#f4a197' }}
// 						/> */}
// 					</View>
// 					<ProjectColorSelect
// 						colors={providedColors}
// 						borderSelectColor={props.theme.colors.textPrimary}
// 						activeOpacity={0.5}
// 						onColorSelect={(colors) => BadgeColorsChanged(colors)}
// 					></ProjectColorSelect>

// 					<ProjectIconSelect
// 						icons={providedIcons}
// 						iconColor={props.theme.colors.textPrimary}
// 						iconColorActive={props.theme.colors.primary}
// 						iconBackgroundColorActive={
// 							props.theme.colors.textPrimary
// 						}
// 						activeOpacity={0.5}
// 						onIconSelect={(icon) => BadgeIconChanged(icon)}
// 					></ProjectIconSelect>
// 				</View>
// 			</BasicLayout>
// 		</View>
// 	);
// };

// //---- styles

// const ProjectsSheetContainer = styled(View)`
// 	width: ${wp('100%')};
// 	height: ${hp('100%') + Constants.statusBarHeight};
// 	background-color: white;
// `;

// //----

// export default connector(withTheme(ProjectScreen));
