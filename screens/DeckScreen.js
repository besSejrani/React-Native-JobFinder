import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import 'react-native-vector-icons';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import { likeJob } from '../actions';

class DeckScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={25} color={tintColor} />;
    }
  });

  renderCard = jobs => {
    const { detailWrapper } = styles;
    const initialRegion = {
      latitude: jobs.latitude,
      longitude: jobs.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    return (
      <Card title={jobs.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >
            <MapView.Marker coordinate={initialRegion} />
          </MapView>
        </View>
        <View style={detailWrapper}>
          <Text>{jobs.company}</Text>
          <Text>{jobs.formattedRelativeTime}</Text>
        </View>

        <Text>{jobs.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
      </Card>
    );
  };

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs, Sorry !">
        <Button
          title="Back to Map"
          large
          icon={{ name: 'my-location', color: 'white' }}
          buttonStyle={{ backgroundColor: '#03a9fa' }}
          onPress={() => this.props.navigation.navigate('Map')}
        />
      </Card>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          keyProp="jobkey"
          onSwipeRight={job => this.props.likeJob(job)}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 24 : 0
  },
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

const mapState = ({ jobs }) => {
  return { jobs: jobs.results };
};

export default connect(
  mapState,
  { likeJob }
)(DeckScreen);
