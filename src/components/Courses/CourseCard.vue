<template>
    <div class="course-card" data-aos="fade-up" data-aos-delay="40">
        <!-- Course image with level badge -->
        <div class="course-image-container">
            <!-- <img src="../../assets/javascript.jpg" :alt="course.title" class="course-image"> -->
            <img :src="(course.poster)?(`http://localhost:3000/uploads/${course.poster}`):jsimg" :alt="course.title" class="course-image">
            
            <span class="course-level">{{ course.diffuculty }}</span>
        </div>
        
        <!-- Course content -->
        <div class="course-content">
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-description">{{ course.description }}</p>

            <!-- Course meta info -->
            <div class="course-meta">
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ course.duration }} hafta   </span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-users"></i>
                    <span>{{ course.students }} o'quvchi</span>
                </div>
            </div>

            <!-- Instructor info -->
            <div class="instructor-info">
                <!-- <img :src="course.instructorAvatar || '/assets/images/avatar-placeholder.jpg'" :alt="course.instructor"
                    class="instructor-avatar"> -->
                    <img src="../../assets/avatar.png" :alt="course.instructor"
                    class="instructor-avatar">
                <div class="instructor-details">
                    <p class="instructor-name">{{ course.instructor }}</p>
                    <p class="instructor-title">O'qituvchi</p>
                </div>
            </div>
        </div>

        <!-- Course footer -->
        <div class="course-footer">
            <div class="certificate-badge">
                <i class="fas fa-award"></i>
                <span>Sertifikat</span>
            </div>
            <button class="enroll-button">Ro'yxatdan o'tish</button>
        </div>
    </div>
</template>

<script>
import jsimg from '../../assets/javascript.jpg';
export default {
    props: {
        course: Object
    },
    mounted() {
       console.log('COURSE', this.course.poster);
       
    },
    data() {
    return {
      jsimg
    }
  }
}
</script>

<style>
.course-card {
    max-width: 500px;
    flex: 0 0 calc(100% / 3 - 1rem);
    min-width: calc(100% / 3 - 1rem);
    /* background-color: white; */
    border-radius: 16px;
    overflow: hidden;
    /* box-shadow: -0.5px 0px 4px 2px rgba(204, 247, 210, 0.2); */
    box-shadow: 0 5px 10px rgba(0, 204, 102, 0.15);
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 255, 128, 0.1);
    position: relative;
}

.course-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00ff00, #00ffff);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.course-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 204, 102, 0.15);
    border-color: rgba(0, 255, 128, 0.3);
}

.course-card:hover::before {
    opacity: 1;
}

@media (max-width: 1023px) {
    .course-card {
        flex: 0 0 calc(50% - 0.75rem);
        min-width: calc(50% - 0.75rem);
    }
}

@media (max-width: 639px) {
    .course-card {
        flex: 0 0 100%;
        min-width: 100%;
    }
}


.course-image-container {
    position: relative;
    overflow: hidden;
}

.course-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.course-card:hover .course-image {
    transform: scale(1.05);
}

.course-level {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(90deg, #00cc00, #00cccc);
    color: white;
    padding: 0.3rem 0.85rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0, 204, 153, 0.3);
    transition: transform 0.3s ease;
}

.course-card:hover .course-level {
    transform: translateY(-3px);
}

.course-content {
    padding: 1.75rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.course-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
    background: linear-gradient(90deg, #00b300, #00cccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    transition: all 0.3s ease;
}

.course-card:hover .course-title {
    transform: translateX(5px);
}

.course-description {
    color: #4b5563;
    margin-bottom: 1.25rem;
    line-height: 1.6;
    flex-grow: 1;
}

.course-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 1.25rem;
}

.meta-item {
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;
}

.course-card:hover .meta-item {
    color: #00b380;
}

.meta-item i {
    margin-right: 0.4rem;
    color: #00b380;
}

.instructor-info {
    display: flex;
    align-items: center;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(0, 204, 153, 0.1);
    transition: all 0.3s ease;
}

.instructor-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.75rem;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.course-card:hover .instructor-avatar {
    border-color: #00cccc;
    transform: scale(1.05);
}

.instructor-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
    transition: color 0.3s ease;
}

.course-card:hover .instructor-name {
    color: #00b380;
}

.instructor-title {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
}

.course-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.75rem;
    background-color: rgba(0, 255, 128, 0.03);
    border-top: 1px solid rgba(0, 204, 153, 0.1);
    transition: background-color 0.3s ease;
}

.course-card:hover .course-footer {
    background-color: rgba(0, 255, 128, 0.06);
}

.certificate-badge {
    display: flex;
    align-items: center;
    color: #00b380;
    font-size: 0.875rem;
    font-weight: 500;
    transition: transform 0.3s ease;
}

.course-card:hover .certificate-badge {
    transform: translateY(-2px);
}

.certificate-badge i {
    margin-right: 0.4rem;
    transition: transform 0.3s ease;
}

.course-card:hover .certificate-badge i {
    transform: rotate(10deg);
}

.enroll-button {
    background: linear-gradient(90deg, #00cc00, #00cccc);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
    box-shadow: 0 4px 10px rgba(0, 204, 153, 0.25);
}

.enroll-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, #00cccc, #00cc00);
    transition: all 0.4s ease;
    z-index: -1;
}

.enroll-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 204, 153, 0.4);
}

.enroll-button:hover::before {
    width: 100%;
}
</style>