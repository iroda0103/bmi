import Client from './Clients/AxiosClient';
const resource = '/courses';

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getCourse(id) {
    return Client.get(`${resource}/${id}`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },
  update(payload, id) {
    return Client.patch(`${resource}/${id}`, payload);
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`);
  },
  // ENROLLMENT
  enroll(payload) {
    return Client.post(`${resource}/enroll`, payload);
  },
  unenroll(payload) {
    return Client.post(`${resource}/unenroll`, payload);
  },
  getEnrolledCourses(userId) {
    return Client.get(`${resource}/enrolled/${userId}`);
  },
  // CATEGORY
  getCoursesByCategory(categoryId) {
    return Client.get(`${resource}/category/${categoryId}`);
  },
  // POPULAR COURSES
  getPopularCourses() {
    return Client.get(`${resource}/popular`);
  },
  // LATEST COURSES
  getLatestCourses() {
    return Client.get(`${resource}/latest`);
  },
  // SEARCH
  searchCourses(query) {
    return Client.get(`${resource}/search?q=${query}`);
  }
  // MANY OTHER ENDPOINT RELATED STUFFS
};