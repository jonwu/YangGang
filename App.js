import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Root from 'components/Root';
import configureStore from 'store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeContextProvider } from 'utils/ThemeUtils';

const { store, persistor } = configureStore();

const onBeforeLift = () => {
  
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={onBeforeLift}
        >
          <Root />
        </PersistGate>
      </ThemeContextProvider>
    </Provider>
  );
}

