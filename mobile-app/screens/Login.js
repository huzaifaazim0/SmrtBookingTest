import React, {Component} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {Button, Block, Input, Text} from '../components';
import {theme, vars} from '../constants';

export default class Login extends Component {
  state = {
    email: null,
    password: null,
    errors: [],
    loading: false,
  };

  async handleLogin() {
    const {navigation} = this.props;
    const {email, password} = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({loading: true});
    if (!email) errors.push('email');
    if (!password) errors.push('password');

    if (!errors.length) {
      try {
        let response = await axios.post(vars.AUTH_SERVICE_URL + 'auth/login', {
          email,
          password,
        });

        if (response.data.user) {
          const storeData = async value => {
            try {
              await AsyncStorage.setItem(
                'user',
                JSON.stringify(response.data.user),
              );
              await AsyncStorage.setItem(
                'tokens',
                JSON.stringify(response.data.tokens),
              );
              navigation.navigate('Browse');
            } catch (e) {
              // saving error
              Alert.alert('Error', 'Invalid Credentials');
              this.setState({errors, loading: false});
              console.log(e.message);
            }
          };
          storeData();
        } else {
          Alert.alert('Error', 'Invalid Credentials');
          this.setState({errors, loading: false});
        }
      } catch (error) {
        Alert.alert('Error', 'Invalid Credentials.');
        this.setState({errors, loading: false});
        console.error('Error:', error);
      }
    }
  }

  render() {
    const {navigation} = this.props;
    const {loading, errors} = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <Block padding={[0, theme.sizes.base * 2]} style={{marginTop: 55}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons/back.png')} />
        </TouchableOpacity>
        <Text h1 bold style={{marginTop: 55}}>
          Login
        </Text>
        <Text body style={{marginTop: 10}}>
          It's good to have you back.
        </Text>
        <Block middle>
          <Input
            label="Email"
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            defaultValue={this.state.email}
            onChangeText={text => this.setState({email: text})}
          />
          <Input
            secure
            label="Password"
            error={hasErrors('password')}
            style={[styles.input, hasErrors('password')]}
            defaultValue={this.state.password}
            onChangeText={text => this.setState({password: text})}
          />
          <Button style={styles.login} onPress={() => this.handleLogin()}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Login
              </Text>
            )}
          </Button>

          <Button onPress={() => Alert.alert('Not implemented')}>
            <Text gray caption center>
              Forgot your password?
            </Text>
          </Button>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    backgroundColor: 'black',
    // flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
