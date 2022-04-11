import React, { useEffect } from 'react';
import { getStorybookUI, configure } from '@storybook/react-native';
import { initFonts } from '../app/theme/fonts';

declare let module;

configure(() => {
    require('./storybook-registry');
}, module);

const StorybookUI = getStorybookUI({
    port: 9001,
    host: 'localhost',
    onDeviceUI: true,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    asyncStorage: require('@react-native-async-storage/async-storage').default || null,
});

export function StorybookUIRoot() {
    useEffect(() => {
        (async () => {
            await initFonts(); // expo only
            if (typeof __TEST__ === 'undefined' || !__TEST__) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const Reactotron = require('../app/services/reactotron');
                const reactotron = new Reactotron.Reactotron();
                reactotron.setup();
            }
        })();
    }, []);

    return <StorybookUI />;
}
