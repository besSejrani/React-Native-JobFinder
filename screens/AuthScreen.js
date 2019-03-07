import React, { Component } from 'react';
import { View } from 'react-native';
import { Platform } from 'expo-core';
import { connect } from 'react-redux';
import { facebookLogin } from '../actions/authAction';

class AuthScreen extends Component {
  componentDidMount = () => {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  };

  componentWillReceiveProps = nextProps => {
    this.onAuthComplete(nextProps);
  };

  onAuthComplete = props => {
    if (props.token) {
      this.props.navigation.navigate('Map');
    }
  };

  render() {
    return <View style={styles.container} />;
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 24 : 0
  }
};

const mapState = ({ auth }) => {
  return { token: auth.token };
};

export default connect(
  mapState,
  { facebookLogin }
)(AuthScreen);
