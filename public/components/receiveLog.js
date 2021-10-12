customElements.define('receive-log',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {

      this.innerHTML = `
      <div class="list-item">
        <img class="send-pic" src="/receive.svg">
        <div class="flex">
          <h4>
            ${this.senderId} <&#45; ${this.accountId} 
          </h4>
          <span>${this.money}원 입금받으셨습니다</span>
        </div>
      </div>`
    }

    get accountId() {
      return this.getAttribute('accountId');
    }

    get senderId() {
      return this.getAttribute('senderId')
    }

    get money() {
      return parseInt(this.getAttribute('money')).toLocaleString('ko-KR');
    }
  }
);