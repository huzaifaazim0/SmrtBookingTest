
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Browse from "../screens/Browse";
// import Search from "../screens/Search";
// import Category from "../screens/Category";
// import More from "../screens/More";
// import Settings from "../screens/Settings";
// import Article from "../screens/Article";
import Loading from "../screens/Loading";
// import Recent from "../screens/Recent";
import { useState,useEffect } from 'react';
import { Text} from 'react-native';


const Navigation = (params) => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkTokenOnAppStartup();
  }, []);

  const checkTokenOnAppStartup = async () => {
    try {
      const token = await AsyncStorage.getItem('user');
      if (token) {
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error checking token:', error);
    } finally {
      setLoading(false);
    }
  };

  const Stack = createStackNavigator();

  const forFade = ({ current, closing }) => ({
		cardStyle: {
		  opacity: current.progress,
		},
	});


  const screens = loading
    ? [{ name: 'Loading', component: Loading }]
    : isLogin
    ? [
        { name: 'Browse', component: Browse },
        { name: 'Welcome', component: Welcome },
        { name: 'Login', component: Login },
      ]
    : [
        { name: 'Welcome', component: Welcome },
        { name: 'Browse', component: Browse },
        { name: 'Login', component: Login },
      ];

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{ headerShown: false, cardStyleInterpolator: forFade }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default Navigation;
