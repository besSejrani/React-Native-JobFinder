import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import 'react-native-vector-icons';
import { connect } from 'react-redux';
import { clearJob } from '../actions';

class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.props.clearJob}
          icon={{ name: 'delete-forever', color: 'white' }}
          title="Reset Liked jobs"
          buttonStyle={{
            backgroundColor: '#f44336'
          }}
          large
        />
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

export default connect(
  null,
  { clearJob }
)(SettingsScreen);
