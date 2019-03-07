import React, { Component } from 'react';
import Expo, { Notifications } from 'expo';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

// import registerNotifications from './services/pushNotifications';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

import { Provider } from 'react-redux';
import store from './store';

const MainNavigator = createBottomTabNavigator({
  welcome: {
    screen: WelcomeScreen,
    navigationOptions: { tabBarVisible: false }
  },
  auth: { screen: AuthScreen, navigationOptions: { tabBarVisible: false } },
  main: {
    navigationOptions: { tabBarVisible: false },
    screen: createBottomTabNavigator(
      {
        Map: { screen: MapScreen },
        Deck: { screen: DeckScreen },
        Review: {
          screen: createStackNavigator({
            review: { screen: ReviewScreen },
            settings: { screen: SettingsScreen }
          }),
          navigationOptions: {
            tabBarLabel: 'Review Jobs',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="favorite" size={25} color={tintColor} />
            )
          }
        }
      },
      {
        tabBarOptions: {
          labelStyle: { fontSize: 12 }
        }
      }
    )
  }
});

const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
  // componentDidMount = () => {
  //   registerNotifications();

  //   Notifications.addListener(notification => {
  //     const {
  //       data: { text },
  //       origin
  //     } = notification;

  //     if (origin === 'received' && text)
  //       alert.alert('New push Notification', text, [{ text: 'Ok.' }]);
  //   });
  // };

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
