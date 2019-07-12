let startY = 0;
let endY = 0;
let sections = document.querySelectorAll('section');
let currentIdx = 0;
let carouselItems = document.querySelectorAll('.carousel-item');

document.querySelector('.container').addEventListener('touchstart', (elem) => {
    let touchobj = elem.changedTouches[0];
    startY = touchobj.clientY;
});

document.querySelector('.container').addEventListener('touchend', (elem) => {
    let touchobj = elem.changedTouches[0]
    endY = touchobj.clientY;
    getDirection(startY, endY);
});

function getDirection(startY, endY) {
    let prevIdx = currentIdx;
    if (startY - endY > 0) {
        if(currentIdx !== 2) { 
            currentIdx++;
        }
    } else if (startY - endY < 0) {
        if (currentIdx !== 0) {
            currentIdx--;    
        }
    };
    if(prevIdx !== currentIdx) {
        carouselItems[prevIdx].classList.remove('carousel-item-target');
        carouselItems[currentIdx].classList.add('carousel-item-target');
    }
    (currentIdx === 2) ? document.querySelector('.scroll-down').style.display = "none" : document.querySelector('.scroll-down').style.display = "flex";
    scroll(currentIdx);
    startY = 0;
    endY = 0;
}

function scroll(idx) {
    let scroll = window.pageYOffset;
    let needed = sections[idx].getBoundingClientRect()
.top + scroll;
    if (idx === 1) {
        needed = needed - iceBlockShift;
    }
    window.scrollTo({top: needed, left: 0, behavior: 'smooth'});
}

window.addEventListener('scroll', icePosition);

let iceBlock = sections[1];
let iceBlockShift = 0;
function icePosition() {
    let scroll = window.pageYOffset;
    let shift = 1536 - scroll;
    if (shift < -600) {
        shift = -600;
    } else if (shift > 600) {
        shift = 600;
    }
    console.log(scroll, shift);
    iceBlockShift = shift;
    if (shift > 0) {
        iceBlock.style.bottom = "";
        iceBlock.style.top = `${shift}px`;
    } else {
        shift = Math.abs(shift);
        iceBlock.style.top = "";
        iceBlock.style.bottom = `${shift}px`;     
    }
}