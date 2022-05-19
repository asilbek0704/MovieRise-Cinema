let headerEvents = new Vue({
    el: ".header",
    data: {
        modalClass: "",
        menuClass: "",
    },
    methods: {
        toggleModalSearch() {
            this.modalClass = this.modalClass == "active" ? "" : "active";
        },
        toggleMenu() {
            this.menuClass = this.menuClass == "active" ? "" : "active";
        },
    },
});

class SLIDER {
    constructor(options) {
        this.slider = document.querySelector(options.slider);
        if (!this.slider) {
            return;
        }

        this.sliderLine = this.slider.querySelector(".slider__line");
        this.slides = this.sliderLine.children;

        this.prev = this.slider.querySelector(".slider__prev");
        this.next = this.slider.querySelector(".slider__next");

        this.timeMove = options.time != undefined ? options.time : 1000;
        this.interval =
            isNaN(options.interval) == true
                ? this.timeMove + 1000
                : options.interval;

        this.activeSlide = 0;
        this.moveUnit = 100;

        for (let i = 0; i < this.slides.length; i++) {
            const currentSlide = this.slides[i];

            if (i != this.activeSlide) {
                currentSlide.style.transform = `translateX(${this.moveUnit}%)`;
            }

            if (i === this.slides.length - 1) {
                currentSlide.style.transform = `translateX(-${this.moveUnit}%)`;
            }
        }

        this.prev.addEventListener("click", () => this.move(this.prev));
        this.next.addEventListener("click", () => this.move(this.next));

        if (options.autoplay === true) {
            let interval = setInterval(() => {
                this.move(this.next);
            }, this.interval);
            this.slider.addEventListener("mouseenter", () => {
                clearInterval(interval);
            });
            this.slider.addEventListener("mouseleave", () => {
                interval = setInterval(() => {
                    this.move(this.next);
                }, this.interval);
            });
        }
    }

    move(btn) {
        this.prev.disabled = true;
        this.next.disabled = true;

        setTimeout(() => {
            this.prev.disabled = false;
            this.next.disabled = false;
        }, this.timeMove);

        let LeftOrRightBTN =
            btn == this.next ? this.moveUnit * -1 : this.moveUnit;

        for (let i = 0; i < this.slides.length; i++) {
            let currentSlide = this.slides[i];
            currentSlide.style.transition = "0ms";
            if (currentSlide != this.activeSlide) {
                currentSlide.style.transform = `translateX(${
                    LeftOrRightBTN * -1
                }%)`;
            }
        }

        this.slides[
            this.activeSlide
        ].style = `transform: translateX(${LeftOrRightBTN}%)`;
        this.slides[this.activeSlide].style.transition = `${this.timeMove}ms`;

        if (btn == this.next) {
            this.activeSlide++;
            if (this.activeSlide > this.slides.length - 1) {
                this.activeSlide = 0;
            }
        } else if (btn == this.prev) {
            this.activeSlide--;
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1;
            }
        }

        this.slides[this.activeSlide].style.transform = `translateX(${0})`;
        this.slides[this.activeSlide].style.transition = `${this.timeMove}ms`;
    }
}

const nowPlayingFilms = new SLIDER({
    slider: ".now-playing .slider",
    autoplay: true,
    interval: 5000,
    time: 750,
});

const newcomingFilms = new SLIDER({
    slider: ".coming-soon .slider",
    autoplay: true,
    interval: 3500,
    time: 750,
});
