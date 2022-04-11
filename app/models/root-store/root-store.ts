import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { AuthenticationModel } from '../authentication/authentication-store';

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model('RootStore').props({
    authenticationStore: types.optional(AuthenticationModel, {} as unknown),
});

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>

/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
