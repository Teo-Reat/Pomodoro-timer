let bar = {
    props: ['progressFull'],
    data: function () {
        return {
            periodWork: 0.1,
            periodRest: 0.05,
            progressWork: 0,
            progressRest: 0,
            timer: '',
        }
    },
    template: `
        <div>
            <div class="onePart">
                <div class="workProgress">
                    <div class="progress" :style="{width: progressWork + '%'}"></div>
                </div>
                <div class="restProgress">
                    <div class="progress" :style="{width: progressRest + '%'}"></div>
                </div>
            </div>
            <input type="number" v-model="periodWork" placeholder="Work time, minutes">
            <input type="number" v-model="periodRest" placeholder="Rest time, minutes">
            <button @click="setTime(periodWork, periodRest)">Start</button>
        </div>
    `,
    methods: {
        setTime(workPeriod, restPeriod) {
            let workStart = Date.now();
            let workTime = this.minutesToMilliseconds(workPeriod);
            let endWorkTime = workStart + workTime;
            let restTime = this.minutesToMilliseconds(restPeriod);
            let endPeriodTime = endWorkTime + restTime;
            this.refresh(workTime, endWorkTime, restTime, endPeriodTime);
        },
        refresh(workTime, endWorkTime, restTime, endPeriodTime) {
            this.timer = setInterval(() => this.fillWorkBar(workTime, endWorkTime, restTime, endPeriodTime), 1000);
        },
        fillWorkBar(workTime, endWorkTime, restTime, endPeriodTime) {
            let dateNow = Date.now();
            if (this.progressWork < 100) {
                this.progressWork = 100 - (100 / workTime * (endWorkTime - dateNow));
                if (this.progressWork >= 100) {
                    this.progressWork = 100;
                    this.playSound();
                }
            } else {
                if (this.progressRest < 100) {
                    this.progressRest = 100 - (100 / restTime * (endPeriodTime - dateNow));
                    if (this.progressRest >= 100) this.progressRest = 100;
                } else {
                    this.stopTimer();
                    this.playSound();
                }
            }
        },
        playSound() {
            let audio = new Audio('sound.mp3');
            audio.play();
        },
        stopTimer() {
            clearInterval(this.timer);
        },
        minutesToMilliseconds(minutes) {
            return minutes * 60000;
        },
    },
};

let elem = {
    template: `
    <div class="onePart">
        <div class="redPart"></div>
        <div class="bluePart"></div>
    </div>
    `
};

new Vue({
    el: '#app',
    data: {
        progressFull: ['', '', '', ],
    },
    components: {
        'teo-bar': bar,
        'teo-elem': elem,
    },
    methods: {

    },
});