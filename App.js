import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import WelcomePage from './src/screens/WelcomePage';
import MainMenu from './src/screens/MainMenu';
import PickTablePage from './src/screens/PickTablePage';
import FoodMenuPage from './src/screens/FoodMenuPage';
import OrderSummaryPage from './src/screens/OrderSummaryPage';

const AppNavigator = createStackNavigator(
  {
    Welcome: WelcomePage,
    Main: MainMenu,
    PickTable: PickTablePage,
    FoodMenu: FoodMenuPage,
    OrderSummary: OrderSummaryPage,
  },
  {
    initialRouteName: "Welcome"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
