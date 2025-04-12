<template>
    <!-- Video Background -->
    <div class="video-container">
        <video autoplay loop muted playsinline class="background-video">
            <source src="https://cdn.dribbble.com/userupload/8821415/file/original-c6f867f003d0615678ac3f8cc96e3396.mp4"
                type="video/mp4">
        </video>
        <div class="overlay"></div>
    </div>

</template>
<style>
.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>