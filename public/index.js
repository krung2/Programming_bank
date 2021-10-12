const errorSse = new EventSource('/sse');
const errorBox = document.getElementById('error-box');
const remittanceBox = document.getElementById('transaction-list');

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

errorSse.addEventListener('send', ({ data }) => {

  const parsedData = JSON.parse(data);

  const sendLog = document.createElement('send-log');
  sendLog.setAttribute('accountId', parsedData.account.accountId);
  sendLog.setAttribute('receiverId', parsedData.reciverId);
  sendLog.setAttribute('money', parsedData.money);

  remittanceBox.appendChild(sendLog);
  remittanceBox.scrollTop = remittanceBox.scrollHeight;
})

errorSse.addEventListener('receive', ({ data }) => {

  const parsedData = JSON.parse(data);

  const receiveLog = document.createElement('receive-log');
  receiveLog.setAttribute('accountId', parsedData.account.accountId);
  receiveLog.setAttribute('senderId', parsedData.senderId);
  receiveLog.setAttribute('money', parsedData.money);

  remittanceBox.appendChild(receiveLog);
  remittanceBox.scrollTop = remittanceBox.scrollHeight;
})

const getBankAllMoney = () => {
  $.ajax({
    url: '/account/all/money',
    method: 'GET',
    success: (res) => {
      console.log(res);
      const moneyElement = document.getElementById('money');
      moneyElement.innerText = parseInt(res.data).toLocaleString('ko-KR');
    },
    error: (err) => {
      console.log(err);
      alert('은행의 모든 돈 불러오는 중 오류 발생');
    }
  })
}

getBankAllMoney();