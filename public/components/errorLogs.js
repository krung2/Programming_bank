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
          <h3>${this.ip}</h3>
          <small class="text-muted">${this.url}</small>
        </div>
        <div>
          <span>${this.content}</span>
        </div>
      </div>`
    }

    get status() {
      return this.getAttribute('status');
    }

    get ip() {
      return this.getAttribute('ip')
    }

    get url() {
      return this.getAttribute('url')
    }

    get content() {
      return this.getAttribute('content')
    }
  }
);