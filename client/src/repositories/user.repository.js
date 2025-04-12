import Client from './Clients/AxiosClient';
const resource = '/users';

export default {
    get() {
        return Client.get(`${resource}`);
    },
    getUser(id) {
        return Client.get(`${resource}/${id}`);
    },
    create(payload) {
        return Client.post(`${resource}`, payload);
    },
    update(payload, id) {
        return Client.patch(`${resource}/${id}`, payload);
    },
    delete(id) {
        return Client.delete(`${resource}/${id}`)
    },
    // AUTH
    login(credentials) {
        console.log('START FRONTENG AUTH', credentials);

        return Client.post(`${resource}/login`, credentials);
    },
    logout() {
        return Client.post('/logout');
    },
    getProfile() {
        return Client.get(`${resource}/me`);
    }

    // MANY OTHER ENDPOINT RELATED STUFFS
};