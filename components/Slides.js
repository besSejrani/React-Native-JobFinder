import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide = index => {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="Let's go"
          raised
          buttonStyle={styles.button}
          onPress={this.props.onSlideComplete}
        />
      );
    }
  };

  renderSlides = () =>
    this.props.data.map((slide, index) => {
      return (
        <View
          key={slide.id}
          style={[styles.slide, { backgroundColor: slide.color }]}
        >
          <Text style={styles.slideTitle}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      );
    });

  render() {
    return (
      <ScrollView horizontal pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth
  },
  slideTitle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginBottom: 25
  },
  button: {
    backgroundColor: '#0288d1'
  }
};

export default Slides;
