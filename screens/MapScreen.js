import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import 'react-native-vector-icons';
import { MapView } from 'expo';
import { Platform } from 'expo-core';
import { connect } from 'react-redux';
import { fetchJobs } from '../actions';

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={25} color={tintColor} />;
    }
  });

  state = {
    mapLoaded: false,
    region: {
      latitude: 46.53234560278291,
      latitudeDelta: 0.3765308905599838,
      longitude: 6.7743089608848095,
      longitudeDelta: 0.36898646503686905
    }
  };

  componentDidMount = () => {
    this.setState({ mapLoaded: true });
  };

  onRegionChangeComplete = region => {
    this.setState({ region });
  };

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('Deck');
    });
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={styles.mapSpinner}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View>
          <Button
            buttonStyle={styles.buttonContainer}
            title="Search a job in this area"
            backgroundColor="#009688"
            icon={{ name: 'search', color: 'white' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 24 : 0
  },
  mapSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: '90%'
  }
};

export default connect(
  null,
  { fetchJobs }
)(MapScreen);
