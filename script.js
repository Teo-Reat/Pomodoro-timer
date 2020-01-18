new Vue({
    el: '#root',
    data: {
        blocks: 4,
        dateNow: 0,
        dateEnd: 0,
        workTime: 0,
        progress: [0, 0, 0, 0],
        timer: '',
        times: [
            {'': ''}
        ],
    },
    methods: {
        getTime() {
            this.dateNow = Date.now();
            this.dateEnd = this.dateNow + this.minutesToMs(0.1);
            this.workTime = this.dateEnd - this.dateNow;
        },
        fillWorkBar(index) {
            this.dateNow = Date.now();
            if(this.progress[index] < 100) {
                this.progress[index] = 100 - (100 / this.workTime * (this.dateEnd - this.dateNow));
                if (this.progress[index] > 100) {
                    this.progress[index] = 100;
                }
            } else {
                this.stopTimer();
                this.playSound();
            }
        },
        fillBar() {

        },
        playSound() {
            let audio = new Audio('sound.mp3');
            audio.play();
        },
        refresh(index) {
            this.timer = setInterval(() => this.fillWorkBar(index), 1000);
        },
        increaseNum() {
            this.rest++;
            if(this.rest > 10) {
                clearInterval(this.timer);
            }
        },
        stopTimer() {
            clearInterval(this.timer);
        },
        minutesToMs(minutes) {
            return minutes * 60000;
        }
    },
    computed: {

    },
});