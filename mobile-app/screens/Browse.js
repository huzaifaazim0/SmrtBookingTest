import React, {Component, useState, useEffect} from 'react';
import {
  RefreshControl,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Modal,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Text, Button, Block} from '../components';
import {vars} from '../constants';
import Octicons from 'react-native-vector-icons/Octicons';

import {theme} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

function Articles(props) {
  const [hotels, setHotels] = useState([]);
  const [hotelsLoading, setHotelsLoading] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRrefereshing] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [clickedHotelRooms, setClickedHotelRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rooms, setRooms] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const RoomModal = ({modalVisible, closeModal, rooms}) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
          }}>
          <Button color={'black'} onPress={closeModal}>
            <Text white center>
              Close Modal
            </Text>
          </Button>

          {rooms.length === 0 ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{marginTop: 20}}
            />
          ) : (
            <FlatList
              data={rooms}
              renderItem={({item}) => <Item item={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>
    </Modal>
  );

  const getRooms = async hotelRooms => {
    setLoading(true);
    let access_token = JSON.parse(await AsyncStorage.getItem('tokens')).access
      .token;
    let refresh_token = JSON.parse(await AsyncStorage.getItem('tokens')).refresh
      .token;
    let updatedRooms = [];
    for (let index = 0; index < hotelRooms.length; index++) {
      try {
        let room = await axios.get(
          vars.ROOM_SERVICE_URL + 'rooms/' + hotelRooms[index],
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );

        // Update updatedRooms with the fetched data
        updatedRooms.push(room.data);
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          renewToken();
          getRooms();
        }
      }
    }
    setRooms(updatedRooms);
    setLoading(false);
    openModal();
  };

  

  

  

  logout = () => {
    AsyncStorage.removeItem('tokens');
    AsyncStorage.removeItem('user');
    props.navigation.navigate('Welcome');
  };

  
  renewToken = async () => {
    try {
      const response = await axios.post(
        vars.AUTH_SERVICE_URL + 'auth/refresh-token',
        {refreshToken},
      );
      await AsyncStorage.setItem('tokens', response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("You login session has been expired")
      logout()
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  fetchData = async () => {
    let access_token = JSON.parse(await AsyncStorage.getItem('tokens')).access
      .token;

    try {
      const response = await axios.get(vars.HOTEL_SERVICE_URL + 'hotels', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = response.data;
      data.results ? setHotels(data.results) : null;
      setIsFetchingData(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error(
          'Unauthorized: The provided access token is invalid or expired.',
        );
        renewToken();
        // Handle the unauthorized error as needed, e.g., redirect to login page or refresh token
      } else {
        // Handle other errors
        console.error(
          'Request failed with status code:',
          error.response ? error.response.status : 'unknown',
        );
      }
    }
  };

  handleRefresh = async () => {
    let access_token = JSON.parse(await AsyncStorage.getItem('tokens')).access
      .token;
    let refresh_token = JSON.parse(await AsyncStorage.getItem('tokens')).refresh
      .token;
    axios
      .get(vars.HOTEL_SERVICE_URL + 'hotels', {
        params: {
          page: 1, // Send the page number to the backend
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(response => {
        if (response.data.results.length) {
          // Combine and sort the new data with existing data
          const existingHotels = hotels;
          // Filter out the appointments from newAppointments that already exist in existingAppointments
          const uniqueNewHotels = response.data.results.filter(newHotel => {
            return !existingHotels.some(
              existingHotel => existingHotel._id === newHotel._id,
            );
          });

          if (!uniqueNewHotels.length) {
            setHasMoreData(false);
          } else {
            setHotels([uniqueNewHotels, ...existingHotels]);
          }
        } else {
          setHasMoreData(false);
        }
      })
      .catch(e => {
        console.log(e);
        if (e.message == 'Request failed with status code 401') {
          renewToken();
          handleRefresh();
        }
      })
      .finally(() => {
        // Reset the flag to indicate that the request has completed
        setIsFetchingData(false);
        setRrefereshing(false);
      });
  };

  loadMoreData = async () => {
    let access_token = JSON.parse(await AsyncStorage.getItem('tokens')).access
      .token;
    let refresh_token = JSON.parse(await AsyncStorage.getItem('tokens')).refresh
      .token;

    setIsFetchingData(true);

    // Increment the page number
    const nextPage = page + 1;

    // Fetch more data for the next page
    // var salt = bcrypt.genSaltSync(8);
    // var AUTH_TOKEN = bcrypt.hashSync(BACKEND_AUTH_TOKEN, salt);
    axios
      .get(vars.HOTEL_SERVICE_URL + 'hotels', {
        params: {
          page: nextPage, // Send the page number to the backend
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(response => {
        if (response.data.results) {
          if (response.data.results.length < 1) {
            setHasMoreData(false);
          } else {
            setHotels([...hotels, response.data.results]);
            setPage(nextPage);
          }
        } else {
          setHasMoreData(false);
        }
      })
      .catch(e => {
        console.log(e);
        if (e.message == 'Request failed with status code 401') {
          renewToken();
          loadMoreData();
        }
      })
      .finally(() => {
        // Reset the flag to indicate that the request has completed
        setIsFetchingData(false);
      });
  };

  renderEmptyComponent = () => (
    <Block
      style={{
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        height: 90,
        marginTop: 0,
        padding: 20,
        marginBottom: 5,
        flex: 1,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 2,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        {hotelsLoading ? (
          <ActivityIndicator size={'small'} color={'black'}></ActivityIndicator>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'black',
              }}>
              No Hotels Found
            </Text>
          </View>
        )}
      </View>
    </Block>
  );

  renderItem = ({item}) => (
    <TouchableOpacity
      key={item._id}
      onPress={() => {
        setClickedHotelRooms(item.rooms);
        getRooms(item.rooms);
      }}
      style={{height: 100, marginTop: 0}}>
      <Block
        style={{
          backgroundColor: '#e3e3e3',
          borderRadius: 10,
          padding: 20,
          marginBottom: 5,
          flex: 1,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            paddingLeft: 20,
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'black',
                paddingTop: 0,
                paddingRight: 10,
              }}
              bold>
              Rooms : {item?.rooms?.length}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 5,
            }}>
            <Text style={{color: 'black'}}>
              longitude : {item?.location?.longitude}, latitude :{' '}
              {item?.location?.latitude}{' '}
            </Text>
          </View>
        </View>
      </Block>
    </TouchableOpacity>
  );

  const Item = ({item}) => (
    <View
      key={item._id}
      style={{
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
      }}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>Room Detail</Text>
      <Text>Wifi: {item.wifi.toString()}</Text>
      <Text>Beds: {item.beds}</Text>
      <Text>Price: ${item.price}</Text>
      <Text>Breakfast: {item.breakfast.toString()}</Text>
    </View>
  );

  return (
    <>
      <Block
        style={[
          styles.flex,
          styles.row,
          styles.header,
          {backgroundColor: '#F3F3F3'},
        ]}>
        <TouchableOpacity onPress={() => logout()}>
          <Octicons
            name="sign-out"
            size={theme.sizes.font * 1.2}
            color={'black'}
          />
        </TouchableOpacity>
        <Block middle center>
          <Text h3 bold style={{textAlign: 'center'}}>
            Hotels
          </Text>
        </Block>
      </Block>
      <View style={{flex: 2}}>
        <FlatList
          contentContainerStyle={{paddingBottom: 10}}
          data={hotels}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          keyboardDismissMode={'on-drag'}
          overScrollMode={'never'}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={this.renderEmptyComponent}
          style={{zIndex: 10, height: 100}}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListFooterComponent={() =>
            // Render the LoadMoreButton as the footer if there's more data to load
            hasMoreData ? (
              <View style={{padding: 10, alignItems: 'center'}}>
                <Button
                  color={'black'}
                  style={{borderRadius: 50, paddingHorizontal: 20}}
                  onPress={loadMoreData}>
                  <Text bold color={'#fff'}>
                    {isFetchingData ? (
                      <ActivityIndicator
                        size={'small'}
                        color={'#fff'}></ActivityIndicator>
                    ) : (
                      'Load More'
                    )}
                  </Text>
                </Button>
              </View>
            ) : null
          }></FlatList>

        <RoomModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          rooms={rooms}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
 
 
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Articles;
