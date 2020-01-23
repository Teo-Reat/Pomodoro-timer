let bar = {
    data: function () {
        return {
            periodWork: 25,
            periodRest: 5,
            progressWork: 0,
            progressRest: 0,
            timer: '',
            toggleView: true,
        }
    },
    template: `
        <div>
            <div class="onePart" v-show="!toggleView">
                <div class="workProgress">
                    <div class="progress" :style="{width: progressWork + '%'}"></div>
                </div>
                <div class="restProgress">
                    <div class="progress" :style="{width: progressRest + '%'}"></div>
                </div>
            </div>
            <div v-show="toggleView" class="onePart">
                <label for="minutes">
                    <span>Work time, minutes</span>
                    <hr>
                    <input type="number" v-model="periodWork" id="minutes">
                </label>
                <button @click="setTime(periodWork, periodRest), toggleView = !toggleView">Start</button>
                <label for="seconds">
                    <span>Rest time, minutes</span>
                    <hr>
                    <input type="number" v-model="periodRest" id="seconds">
                </label>
            </div>
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
                    this.playSoundEndWork();
                }
            } else {
                if (this.progressRest < 100) {
                    this.progressRest = 100 - (100 / restTime * (endPeriodTime - dateNow));
                    if (this.progressRest >= 100) this.progressRest = 100;
                } else {
                    this.stopTimer();
                    this.playSoundEndRest();
                    this.addBar();
                    this.progressWork = 0;
                    this.progressRest = 0;
                    this.setTime(this.periodWork, this.periodRest);
                }
            }
        },
        playSoundEndWork() {
            let audio = new Audio('sound.mp3');
            audio.play();
        },
        playSoundEndRest() {
            let audio = new Audio('sound2.wav');
            audio.play();
        },
        stopTimer() {
            clearInterval(this.timer);
        },
        minutesToMilliseconds(minutes) {
            return minutes * 60000;
        },
        addBar() {
            this.$emit('add-bar');
        }
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
        progressFull: [],
    },
    components: {
        'teo-bar': bar,
        'teo-elem': elem,
    },
    methods: {
        addFullBar() {
            this.progressFull.push('');
        }
    },
});