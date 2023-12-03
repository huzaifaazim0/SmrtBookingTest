import React, {Component} from 'react';
import {Animated, StyleSheet} from 'react-native';

import {Button, Block, Text} from '../components';
import {theme} from '../constants';

class Welcome extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <Block>
        <Block center bottom>
          <Text h1 center bold>
            SmrtBooking
          </Text>
          <Text h3 gray1 style={{marginTop: theme.sizes.padding / 2}}>
            Hotel Booking Simplified
          </Text>
        </Block>
        <Block middle margin={[0, theme.sizes.padding * 2]}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text center semibold white>
              Login
            </Text>
          </Button>
        </Block>
      </Block>
    );
  }
}

export default Welcome;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
  },
});
