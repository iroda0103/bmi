<template>
    <div class="course-info-container">
        
       <CourseCarusel></CourseCarusel>
    </div>

</template>

<script>
import CourseCarusel from '../layout/CourseCarusel.vue';
export default {
    components:{CourseCarusel},
    data() {
        return {
            courses:[ {
                id: 1,
                title: "Vue.js Asoslari",
                description: "Vue.js framework asoslarini o'rganib, zamonaviy veb-ilovalarni yaratishni boshlang",
                poster: "https://via.placeholder.com/400x225",
                duration: "6 hafta",
                students: 1243,
                level: "Boshlang'ich",
                instructor: "Jahongir Rahimov",
                instructorAvatar: "https://via.placeholder.com/40x40"
            }]
        }
    },
}
</script>

<style>
.course-info-container {
    margin-top: 100px;
}
</style>