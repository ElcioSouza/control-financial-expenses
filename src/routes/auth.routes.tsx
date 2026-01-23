import React from  'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator id="AuthStack">
           <AuthStack.Screen 
            name="SignIn"
            options={{
                headerShown: false
            }}
            component={SignIn}
           />
            <AuthStack.Screen 
            name="SignUp"
            component={SignUp}
            options={{
                headerStyle: {
                    backgroundColor:'#3b3dbf'
                },
                headerTintColor: '#FFF',
                headerTitle: 'Voltar'
            }}
           />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;