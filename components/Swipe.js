import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  Platform
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const likeDistance = 0.4 * screenWidth;
const swipeOutDuration = 250;

class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: 'id'
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > likeDistance) {
          this.forceSwipe('right');
        } else if (gesture.dx < -likeDistance) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  };

  forceSwipe = direction => {
    const x = direction === 'right' ? screenWidth : -screenWidth;

    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: swipeOutDuration
    }).start(() => this.onSwipeComplete(direction));
  };

  onSwipeComplete = direction => {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  };

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  };

  getCardStyle = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-screenWidth * 1.5, 0, screenWidth * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  };

  renderCards = () => {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data
      .map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        if (i === this.state.index) {
          return (
            <Animated.View
              key={item[this.props.keyProp]}
              style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
              {...this.state.panResponder.panHandlers}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[styles.cardStyle, { zIndex: i * -1 }]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: screenWidth,
    ...Platform.select({
      android: {
        elevation: 4
      }
    })
  }
};

export default Swipe;
