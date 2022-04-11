import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { initFonts } from './theme/fonts';
import * as storage from './utils/storage';
import { AppNavigator, useNavigationPersistence } from './navigators';
import { RootStore, RootStoreProvider, setupRootStore } from './models';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

const httpLink = createHttpLink({
    uri: 'https://dev.callboats.com:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
    let token:string;
    AsyncStorage.getItem('token').then(res => token = res);
    return {
        headers: {
            ...headers,
            authorization: token !== undefined ? token : '',
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
    const {
        initialNavigationState,
        onNavigationStateChange,
        isRestored: isNavigationStateRestored,
    } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

    useEffect(() => {
        (async () => {
            await initFonts(); // expo
            setupRootStore().then(setRootStore);
        })();
    }, []);

    if (!rootStore || !isNavigationStateRestored) return null;

    return (
        <ApolloProvider client={client}>
            <RootStoreProvider value={rootStore}>
                <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                    <AppNavigator
                        initialState={initialNavigationState}
                        onStateChange={onNavigationStateChange}
                    />
                </SafeAreaProvider>
            </RootStoreProvider>
        </ApolloProvider>
    );
}

export default App;
