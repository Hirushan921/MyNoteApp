

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import { SignUpScreen } from './SignUp';
import { SignInScreen } from './SignIn';
import { MainScreen } from './Main';
import { AddNotes } from './Addnotes';

const Stack = createNativeStackNavigator();

 function App() {
  const ui = (
    <NavigationContainer>
<Stack.Navigator>
<Stack.Screen name="Sign In" component={SignInScreen} />
<Stack.Screen name="Sign Up" component={SignUpScreen} />
<Stack.Screen name="Home" component={MainScreen} />
<Stack.Screen name="addNote" component={AddNotes} />
</Stack.Navigator>
    </NavigationContainer>

  );
  return ui;
}


export default App;


