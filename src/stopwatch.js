import { html, css, LitElement } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";

export class Stopwatch extends LitElement {
  static properties = {
    time: {},
    milliseconds: {},
    seconds: {},
    Interval: {},
  };

  static styles = css`
    p {
      color: blue;
    }
  `;

  constructor() {
    super();
    this.stop = false;
    this.milliseconds = 0;
    this.seconds = 0;
    this.Interval = function () {
      setInterval(() => {
        let appendMilliseconds = this.shadowRoot.querySelector(".milliseconds");
        let appendSeconds = this.shadowRoot.querySelector(".seconds");
        this.milliseconds++;

        if (this.stop) {
          return;
        }
        if (this.milliseconds <= 9) {
          appendMilliseconds.innerHTML = "0" + this.milliseconds;
        }

        if (this.milliseconds > 9) {
          appendMilliseconds.innerHTML = this.milliseconds;
        }

        if (this.milliseconds > 99) {
          this.seconds++;
          appendSeconds.innerHTML = "0" + this.seconds;
          this.milliseconds = 0;
          appendMilliseconds.innerHTML = "0" + 0;
        }

        if (this.seconds > 0) {
          appendSeconds.innerHTML = this.seconds;
        }
      }, 10);
    };
  }

  render() {
    return html` <div class="wrapper">
      <h1>Stopwatch</h1>
      <h2>Stopwatch Built With Lit</h2>
      <p>Result: ${this.milliseconds}</p>
      <p>
        <span class="seconds">${this.seconds}</span>:<span class="milliseconds"
          >${this.milliseconds}</span
        >
      </p>

      <button @click=${this._startTimer}>Start</button>
      <button class="stop" @click=${this._stop}>Stop</button>
      <button class="reset @click=${this._reset}">Reset</button>
    </div>`;
  }

  // _begin() {
  //   let appendMilliseconds = this.shadowRoot.querySelector(".milliseconds");
  //   let appendSeconds = this.shadowRoot.querySelector(".seconds");
  //   clearInterval(this.Interval);
  //   this.Interval = setInterval(this._startTimer, 10);
  //   console.log(appendSeconds);
  // }

  _stop() {
    this.stop = true;
  }

  _startTimer() {
    // console.log(appendMilliseconds);
    // console.log(appendSeconds);
    // console.log(this.milliseconds);
    // console.log(this.seconds);
    clearInterval(this.Interval);
    this.Interval();
  }

  _reset() {
    super.disconnectedCallback();

    let appendMilliseconds = this.shadowRoot.querySelector(".milliseconds");
    let appendSeconds = this.shadowRoot.querySelector(".seconds");

    clearInterval(this.Interval);

    this.milliseconds = "00";
    this.seconds = "00";
    appendMilliseconds.innerHTML = this.milliseconds;
    appendSeconds.innerHTML = this.seconds;
  }

  // let milliseconds = this.shadowRoot.querySelector("milliseconds");
  // let seconds = this.shadowRoot.querySelector("seconds");

  // _startTimer() {
  //   tens++;

  //   if (tens <= 9) {
  //     appendTens.innerHTML = "0" + tens;
  //   }

  //   if (tens > 9) {
  //     appendTens.innerHTML = tens;
  //   }

  //   if (tens > 99) {
  //     console.log("seconds");
  //     seconds++;
  //     appendSeconds.innerHTML = "0" + seconds;
  //     tens = 0;
  //     appendTens.innerHTML = "0" + 0;
  //   }

  //   if (seconds > 9) {
  //     appendSeconds.innerHTML = seconds;
  //   }
  // }
}
customElements.define("stopwatch-app", Stopwatch);
