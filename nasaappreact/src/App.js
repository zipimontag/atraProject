import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './Store/store'
import Home from './components/home';
import { BrowserRouter as Router} from 'react-router-dom';
function App() {
  return (
    <Provider store={store}>
    <div className="App">
    <Router>
      <Home></Home>
    </Router>
    </div>
    </Provider>
  );
}

export default App;
