customElements.define('send-log',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {

      this.innerHTML = `
      <div class="list-item">
        <img class="send-pic" src="/send.svg">
        <div class="flex">
          <h4>
            ${this.accountId} &#45;> ${this.receiverId}
          </h4>
          <span>${this.money}원 송금하셨습니다</span>
        </div>
      </div>`
    }

    get accountId() {
      return this.getAttribute('accountId');
    }

    get receiverId() {
      return this.getAttribute('receiverId')
    }

    get money() {
      return parseInt(this.getAttribute('money')).toLocaleString('ko-KR');
    }
  }
);