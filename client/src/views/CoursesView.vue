<template>
    <div class="courses-container">
        <div class="carousel-track" :style="carouselStyle">
            <Course v-for="course in courses" :course="course" :key="course.id" @click="redirectCourse(course.id)">
            </Course>
        </div>
    </div>

</template>
<script>
import Course from '../components/Courses/CourseCard.vue';
import { useCourseStore } from '../stores/course.store';

export default {
    name: 'CoursesCarousel',
    components: { Course },

    data() {
        return {
            activeIndex: 0,
            itemsToShow: 3,
            touchStart: null,
            touchEnd: null,
            isLoading: false, // O'zimiz loading holatini kuzatamiz
            localCourses: [] // Mahalliy nusxa
        };
    },

    computed: {
        // Store'ga qo'shimcha reference
        courseStore() {
            return useCourseStore();
        },

        // Kurslarni olish - xatolikka chidamli usul
        courses() {
            // Agar store'da kurslar bo'lsa ishlatamiz, bo'lmasa mahalliy nusxani
            const storeCourses = this.courseStore.getCourses;
            return storeCourses && storeCourses.length ? storeCourses : this.localCourses;
        }
    },

    methods: {
        async loadCourses() {
            if (this.isLoading) return; // Agar yuklanayotgan bo'lsa, qayta so'rov yubormaymiz

            this.isLoading = true;

            try {
                // Store'dan kurslarni olish

                await this.courseStore.fetchCourses();
                // Xatolik bo'lsa mahalliy ma'lumotlarni ishlatamiz
                if (!this.courseStore.getCourses || this.courseStore.getCourses.length === 0) {
                    console.log('API dan kurslar yuklanmadi, mahalliy ma\'lumotlar ishlatiladi');
                }
            } catch (error) {
                console.error('Kurslarni yuklashda xatolik:', error);
                // Agar xatolik bo'lsa, statik ma'lumotlarni ko'rsatamiz
                console.log('Statik ma\'lumotlar ishlatiladi');
            } finally {
                this.isLoading = false;
            }
        },
        redirectCourse(courseId) {
            this.$router.push(`/courses/${courseId}`);
        }
    },

    created() {
        this.localCourses = [
            {
                id: 1,
                title: "Vue.js Asoslari",
                description: "Vue.js framework asoslarini o'rganib, zamonaviy veb-ilovalarni yaratishni boshlang",
                poster: "https://via.placeholder.com/400x225",
                duration: "6 hafta",
                students: 1243,
                level: "Boshlang'ich",
                instructor: "Jahongir Rahimov",
                instructorAvatar: "https://via.placeholder.com/40x40"
            },
        ];
    },

    mounted() {
        this.loadCourses();
    }
};</script>

<style scoped>
.courses-container {
    margin-top: 30px;
    padding: 30px;
}

.courses-container .carousel-track {
    display: flex;
    flex-wrap: wrap;
}
</style>