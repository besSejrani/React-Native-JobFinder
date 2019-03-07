import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    autoRehydrate()
  )
);

persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

export default store;
