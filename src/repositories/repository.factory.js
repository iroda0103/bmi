import UserRepository from './UserRepository';
import CourseRepository from './CourseRepository'

const repositories = {
    // 'posts': PostRepository,
    'users': UserRepository,
    'courses': CourseRepository
}   
export default {
    get: name => repositories[name]
};