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
      const moneyElement = document.getElementById('money');
      moneyElement.innerText = parseInt(res.data).toLocaleString('ko-KR');
    },
    error: (err) => {
      console.log(err);
      alert('은행의 모든 돈 불러오는 중 오류 발생');
    }
  })
}

const getAllUserCount = () => {
  $.ajax({
    url: '/user/',
    method: 'GET',
    success: (res) => {
      const userCntElement = document.getElementById('userCnt');
      userCntElement.innerText = res.data;
    },
    error: (err) => {
      console.log(err);
      alert('은행의 모든 돈 불러오는 중 오류 발생');
    }
  })
}

const getAllUser = () => {
  $.ajax({
    url: '/user/all',
    method: 'GET',
    success: (res) => {
      const rows = document.getElementById('rows');
      const phoneNumPat4 = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/
      const phoneNumPat3 = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/

      res.data.map(({ name, phone, moneyCount }) => {
        const userInfoCard = document.createElement('user-info');
        userInfoCard.setAttribute('name', name);
        userInfoCard.setAttribute('phoneNum', phone.replace(phone.length == 8 ? phoneNumPat4 : phoneNumPat3, '$1-$2-$3'));
        userInfoCard.setAttribute('money', moneyCount);

        rows.appendChild(userInfoCard);
      })
    },
    error: (err) => {
      console.log(err);
      alert('은행의 모든 돈 불러오는 중 오류 발생');
    }
  })
}

getBankAllMoney();
getAllUserCount();
getAllUser();