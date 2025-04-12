// import HomeView from '../views/HomeView.vue'
// import LoginView from '../views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AppMain from '../components/layout/AppMain.vue';
import Courses from '../views/CoursesView.vue';
import Course from '../views/CourseView.vue';
import Terminal from '../views/Terminal.vue';
import Chatbox from '../components/cards/Chatbox.vue';
import Editor from '../components/layout/Editor.vue';
import EditorApp from '../views/EditorApp.vue';
import Profile from '../views/Profile.vue';
import LessonView from '../views/LessonView.vue';
import AssignmentComponent from '../components/AssignmentComponent/AssignmentComponent.vue';



const routes = [
  { path: '/', component: AppMain },
  { path: '/courses', component: Courses },
  { path: '/courses/:id', component: Course },
  { path: '/terminal', component: Terminal },
  { path: '/chat', component: Chatbox },
  { path: '/editor', component: EditorApp },
  { path: '/lesson', component: LessonView },
  { path: '/users/me', component: Profile },
  { path: '/assignment', component: AssignmentComponent },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;