/**
 * @format
 */
import { AppNavigator } from 'ern-navigation'
import { name as appName } from './app.json'
import MovieList from './App.js'

const appNavigator = new AppNavigator({
  'Main': MovieList
}, {
  initialScreen: 'Main'
})

appNavigator.registerAll(appName)



