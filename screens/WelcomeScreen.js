import _ from 'lodash';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { Platform } from 'expo-core';
import Slides from '../components/Slides';

const slideData = [
  { id: 0, text: 'Welcome to JobFinder', color: '#03a9fa' },
  { id: 1, text: 'Use this to get a job', color: '#009688' },
  { id: 2, text: 'Set your location, then swipe away', color: '#03a9fa' }
];

class WelcomeScreen extends Component {
  state = { token: null };

  componentWillMount = async () => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  };

  onSlideComplete = () => {
    this.props.navigation.navigate('auth');
  };

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <Slides data={slideData} onSlideComplete={this.onSlideComplete} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 24 : 0
  }
};

export default WelcomeScreen;
