import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from './src/screens/SearchScreen';

const navogator = createStackNavigator({
  search :  SearchScreen,
},{
  initialRouteName:'search',
  defaultNavigationOptions:{
    title:'Search'
  }
});


export default createAppContainer(navogator);