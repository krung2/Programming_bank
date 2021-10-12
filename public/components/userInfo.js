customElements.define('user-info',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {

      this.innerHTML = `
        <div class="staticBox user-box">
          <div class="card">
            <div class="card-header no-border d-flex">
              <span class="flex"></span>
              <div>
                <h2 class="align-item-center">${this.name}</h2>
                <small class="text-muted">${this.phoneNum}</small>
              </div>
              <span class="flex"></span>
            </div>
            <div class="card-body user-card-body">
              <div class="money-count">
                <span class="flex"></span>
                <div class="align-item-center">
                  <small class="text-muted">보유 금액</small>
                  <h3>${this.money}원</h3>
                </div>
                <span class="flex"></span>
              </div>
            </div>
          </div>
        </div>`
    }

    get name() {
      return this.getAttribute('name');
    }

    get phoneNum() {
      return this.getAttribute('phoneNum')
    }

    get money() {
      return parseInt(this.getAttribute('money')).toLocaleString('ko-KR');
    }
  }
);