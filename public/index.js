const errorSse = new EventSource('/sse');
const errorBox = document.getElementById('error-box');
errorSse.addEventListener('error', ({ data }) => {

  const parsedData = JSON.parse(data);

  const error = document.createElement('error-message');
  error.setAttribute('status', parsedData.status);
  error.setAttribute('ip', parsedData.sendIp);
  error.setAttribute('url', parsedData.sendUrl);
  error.setAttribute('content', parsedData.message);

  errorBox.appendChild(error);
  errorBox.scrollTop = errorBox.scrollHeight;
})