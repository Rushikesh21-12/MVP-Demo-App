import { types } from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';

export const AuthenticationModel = types
    .model('Authentication')
    .props({
        token: types.optional(types.string, ''),
        email: types.optional(types.string, ''),
        userName: types.optional(types.string, '')
    })
    .extend(withEnvironment)
    .actions((self) => ({
        setToken(value: string){
            self.token = value;
        },
        setEmail(value: string){
            self.email = value;
        },
        setUserName(value: string){
            self.userName = value;
        }
    }));