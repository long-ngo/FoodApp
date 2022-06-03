import { Provider } from 'react-redux';
import { store } from './redux/store';
import './firebase/config';
import AppNavigator from './views/navigation/AppNavigator';

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
