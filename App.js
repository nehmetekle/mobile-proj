import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import SignIn from './SignIn';
import ManageBooking from './BookingForm';
import Signup from './Signup';
import CreateAccount from './CreateAccount'
import SpecialOffers from './SpecialOffers';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name='Sign In' component={SignIn} />
      <Drawer.Screen name='Sign Up' component={Signup}  />
      <Drawer.Screen name='Manage Booking' component={ManageBooking} />
      <Drawer.Screen name='Special Offers' component={SpecialOffers} /> 
    </Drawer.Navigator>
  );
}

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="HomePage" options={{ headerShown: false }} component={MyDrawer} />
      <Stack.Screen name="Manage Booking" component={ManageBooking} />
        <Stack.Screen name="Create Account" component={CreateAccount} />
        
      {/* Other screens for stack navigation */}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
