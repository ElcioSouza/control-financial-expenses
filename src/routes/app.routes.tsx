import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from '../screen/CustomDrawer';
import Home from '../screen/Home';
import NewRegister from '../screen/NewRegister';
import Profile from '../screen/Profile';

import { AuthContext } from '../contexts/auth';
const AppDrawer = createDrawerNavigator();

function AppRoutes() {
   const { signOut } = useContext(AuthContext);
   return (
      <AppDrawer.Navigator
         id="AppDrawer"
         drawerContent={(props) => <CustomDrawer {...props} />}
         screenOptions={{
            headerShown: false,
            drawerStyle: {
               backgroundColor: '#F0F4FF',
               paddingTop: 20
            },
            drawerActiveBackgroundColor: "#3b3dbf",
            drawerActiveTintColor: '#fff',
            drawerInactiveBackgroundColor: '#f0f2ff',
            drawerInactiveTintColor: '#121212'
         }}
      >
         <AppDrawer.Screen
            name="Home"
            options={{
               drawerLabel: "Minhas Movimentações"
            }}
            component={Home}
         />
         <AppDrawer.Screen
            name="NewRegister"
            options={{
               drawerLabel: "Registrar"
            }}
            component={NewRegister}
         />
         <AppDrawer.Screen
            name="Profile"
            options={{
               drawerLabel: "Perfil"
            }}
            component={Profile}
         />
         {/*    <AppDrawer.Screen
            name="SignOut"
            component={SignIn}
            options={{
               drawerLabel: "Sair"
            }}
            listeners={{
               drawerItemPress: (e) => {
                  e.preventDefault();
                  signOut();
               }
            }}
         /> */}

      </AppDrawer.Navigator>
   )
}

export default AppRoutes;

