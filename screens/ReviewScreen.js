import React, { Component } from 'react';
import { Text, View, ScrollView, Platform, Linking } from 'react-native';
import { MapView } from 'expo';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';

class AuthScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Review Jobs',
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
        type="clear"
        buttonStyle={styles.button}
      >
        Go right
      </Button>
    )
  });

  renderLikedJobs = () => {
    return this.props.likedJobs.map(job => {
      const {
        company,
        formattedRelativeTime,
        url,
        longitude,
        latitude,
        jobtitle
      } = job;

      const initialRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };
      return (
        <Card key={job.jobkey} title={jobtitle}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            >
              <MapView.Marker coordinate={initialRegion} />
            </MapView>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply"
              backgroundColor="#03a9fa"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>{this.renderLikedJobs()}</ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 24 : 0
  },
  button: {
    marginRight: 20
  },
  detailWrapper: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
};

const mapState = ({ likedJobs }) => {
  return { likedJobs };
};

export default connect(mapState)(AuthScreen);
