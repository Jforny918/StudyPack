document.addEventListener("DOMContentLoaded", function() {
    const playBtn = document.getElementById("play-btn");
    const video = document.getElementById("tablet-video");
    const screen = document.getElementById("tablet-screen");

    playBtn.addEventListener("click", function(e){
        e.preventDefault();
        if(video.paused){
            video.play();
            screen.classList.add("playing");
            playBtn.style.display = "none";
        }
        else{
            video.pause();
            screen.classList.remove("playing");
            playBtn.style.display = "flex";
        }
    });

    video.addEventListener("ended", function(){
        screen.classList.remove("playing");
        playBtn.style.display = "flex";
    });
});