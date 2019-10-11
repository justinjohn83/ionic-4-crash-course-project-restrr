import { Component } from "@angular/core";
import { Insomnia } from "@ionic-native/insomnia/ngx";
import { NavigationBar } from "@ionic-native/navigation-bar/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  elapsed: any = {
    h: "00",
    m: "00",
    s: "00"
  };
  progress: any = 0;
  overallProgress: any = 0;
  percent: number = 0;
  radius: number = 100;
  minutes: number = 1;
  seconds: any = 10;
  timer: any = false;
  overallTimer: any = false;
  fullTime: any = "00:01:30";

  countDownTimer: any = false;
  timeLeft: any = {
    m: "00",
    s: "00"
  };
  remainingTime = `${this.timeLeft.m}:${this.timeLeft.s}`;

  constructor(
    private insomnia: Insomnia,
    private navigationBar: NavigationBar
  ) {
    let autoHide: boolean = true;
    this.navigationBar.setUp(autoHide);
  }

  startTimer() {
    if (this.timer || this.countDownTimer) {
      cancelAnimationFrame(this.timer);
      cancelAnimationFrame(this.countDownTimer);

      this.timer = null;
      this.countDownTimer = null;
    }

    if (!this.overallTimer) {
      this.progressTimer();
      this.insomnia.keepAwake();
    }

    this.timer = null;
    this.percent = 0;
    this.progress = 0;

    const timeSplit = this.fullTime.split(":");
    this.minutes = timeSplit[1];
    this.seconds = timeSplit[2];

    const totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds);
    let secondsLeft = totalSeconds;

    const startMillis: DOMHighResTimeStamp = performance.now();

    let lastForwardTime = startMillis;
    let lastBackwardsTime = startMillis;

    const forwardsTimer = (now: DOMHighResTimeStamp) => {
      if (!this.timer) {
        return;
      }

      if (this.percent == this.radius) {
        this.timer = false;
        return;
      }

      this.timer = requestAnimationFrame(forwardsTimer);

      if (now - lastForwardTime < 1000) {
        return;
      }

      lastForwardTime = now;

      this.percent = Math.floor((this.progress / totalSeconds) * 100);
      this.progress = Math.floor((now - startMillis) / 1000);
    };

    const backwardsTimer = (now: DOMHighResTimeStamp) => {
      if (!this.countDownTimer) {
        return;
      }

      this.countDownTimer = requestAnimationFrame(backwardsTimer);

      if (now - lastBackwardsTime < 1000) {
        return;
      }

      lastBackwardsTime = now;

      if (secondsLeft >= 0) {
        this.timeLeft.m = Math.floor(secondsLeft / 60);
        this.timeLeft.s = secondsLeft - 60 * this.timeLeft.m;
        this.remainingTime = `${this.pad(this.timeLeft.m, 2)}:${this.pad(
          this.timeLeft.s,
          2
        )}`;
        secondsLeft = totalSeconds - Math.floor((now - startMillis) / 1000);
      }
    };

    // run once when clicked
    this.countDownTimer = requestAnimationFrame(backwardsTimer);
    this.timer = requestAnimationFrame(forwardsTimer);
  }

  stopTimer() {
    this.countDownTimer = null;
    this.overallTimer = null;
    this.timer = null;

    this.percent = 0;
    this.progress = 0;

    this.elapsed = {
      h: "00",
      m: "00",
      s: "00"
    };

    this.timeLeft = {
      m: "00",
      s: "00"
    };

    this.remainingTime = `${this.pad(this.timeLeft.m, 2)}:${this.pad(
      this.timeLeft.s,
      2
    )}`;

    this.insomnia.allowSleepAgain();
  }

  progressTimer() {
    const startTime: DOMHighResTimeStamp = performance.now();
    let lastNow = startTime;

    this.overallTimer = true;

    const animateOverallTime = (now: DOMHighResTimeStamp) => {
      if (!this.overallTimer) {
        return;
      }

      requestAnimationFrame(animateOverallTime);

      // don't do any updates if less than 1 second
      if (now - lastNow < 1000) {
        return;
      }

      lastNow = now;

      // Find the distance between now an the count down date
      const distance = now - startTime;

      // Time calculations for hours, minutes and seconds

      this.elapsed.h = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60)) / 1000);

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);
    };

    requestAnimationFrame(animateOverallTime);
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
