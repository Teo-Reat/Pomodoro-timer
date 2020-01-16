new Vue({
    el: '#root',
    data: {
        timeNow: [],
        dateMs: 0,
        parts: 8,
        work: 25,
        rest: 5,
        timer: '',
    },
    methods: {
        getTime() {
            let date = new Date();
            this.dateMs = Date.now();
            this.timeNow.push(date.getHours());
            this.timeNow.push(date.getMinutes());
            this.timeNow.push(date.getSeconds());
        },
        test() {
            let audio = new Audio('sound.wav');
            audio.play();
        },
        refresh() {
            this.timer = setInterval(() => this.increaseNum(), 1000);
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
        MinutesToMs(minutes) {
            return minutes * 60000;
        }
    },
    computed: {

    },
});