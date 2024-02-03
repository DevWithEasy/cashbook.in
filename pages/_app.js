import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from '../store/store';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider>
        <Component {...pageProps} />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
      </ChakraProvider>
    </PersistGate>
  </Provider>
}
export default MyApp
