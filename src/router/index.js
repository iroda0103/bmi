// import HomeView from '../views/HomeView.vue'
// import LoginView from '../views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AppMain from '../components/layout/AppMain.vue';
import Courses from '../views/CoursesView.vue';
import Course from '../views/CourseView.vue';
// import Terminal from '../views/Terminal.vue';
import Terminal from '../components/Terminal/Terminal2.vue';
import Chatbox from '../components/cards/Chatbox.vue';
import Editor from '../components/layout/Editor.vue';
import EditorApp from '../views/EditorApp.vue';
import Profile from '../views/Profile.vue';
import Profile2 from '../views/Profile2.vue';
// import LessonView from '../views/LessonView.vue';
import AssignmentComponent from '../components/AssignmentComponent/AssignmentComponent.vue';
import Voice from '../components/Voice/Voice.vue';
import Lesson1 from '../components/Lessons/Lesson1.vue';
import AboutUs from '../views/AboutUs.vue';
import Arena from '../views/Arena.vue';

const routes = [
  { path: '/', component: AppMain },
  { path: '/courses', component: Courses },
  { path: '/courses/:id', component: Course },
  { path: '/course/:id/lesson/:id2', component: Lesson1 },
  { path: '/terminal', component: Terminal },
  { path: '/chat', component: Chatbox },
  { path: '/editor', component: EditorApp },
  { path: '/lesson', component: Lesson1 },
  { path: '/users/me', component: Profile },
  { path: '/users/me2', component: Profile2 },
  { path: '/assignment', component: AssignmentComponent },
  { path: '/voice', component: Voice },
  { path: '/about', component: AboutUs },
  { path: '/arena', component: Arena },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;