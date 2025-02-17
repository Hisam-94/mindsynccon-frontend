// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';
// import itemReducer from '../features/items/itemSlice';
// import bookingReducer from '../features/bookings/bookingSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     items: itemReducer,
//     bookings: bookingReducer,
//   },
// });

// export default store;


import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import authReducer from '../features/auth/authSlice';
import itemReducer from '../features/items/itemSlice';
import bookingReducer from '../features/bookings/bookingSlice';

// Define persist configuration
const persistConfig = {
  key: 'root', // The key for the persisted state
  storage, // Storage engine
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  items: itemReducer,
  bookings: bookingReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
