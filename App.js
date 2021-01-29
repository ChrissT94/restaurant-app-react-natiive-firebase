import React, {Component} from 'react'
import Splash from './components/Splash'
import IndexScreens from './screens/IndexScreens'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
    };
  }
  render(){  

    var mainScreen = <Splash />

    setTimeout(() => { this.setState({ timePassed: true }) }, 3000)

    if (!this.state.timePassed) {

      return mainScreen

    } else {

      mainScreen = <IndexScreens />

    }
    return mainScreen 
  }

}

export default App;

