customElements.define('error-message',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {

      this.innerHTML = `
      <div class="list-item">
        <div>
          <h3>${this.status}</h3>
        </div>
        <div>
          <h3>${this.getAttribute('ip')}</h3>
          <small class="text-muted">${this.getAttribute('url')}</small>
        </div>
        <div>
          <span>${this.getAttribute('content')}</span>
        </div>
      </div>`
    }

    get status() {
      return this.getAttribute('status');
    }
  }
);