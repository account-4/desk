// GASのウェブアプリURL（ご自身のものに差し替えてください）
const gasUrl = "https://script.google.com/macros/s/AKfycbwAFO_tWytBFQxk3Atn52N1pD6GYDvTtRJDpGVzZ236lTGEdtkWjRpm-pQGCdOu54eFxQ/exec";

document.getElementById("diary").addEventListener("click", () => {
  
  const inputVal = document.getElementById("dayTime").value.trim();
  const resultBox = document.getElementById("diaryText");

  if (!inputVal) {
    resultBox.innerText = "日付と時刻を入力";
    return;
  }

resultBox.innerHTML = '<span class="loading">検索中...</span>';

  fetch(`${gasUrl}?datetime=${encodeURIComponent(inputVal)}`)
    .then(response => response.json())
    .then(data => {
      if (data.found) {

        resultBox.innerHTML = data.text;
      } else {

        resultBox.innerText = data.text;
      }
    })
    .catch(error => {
      console.error("通信エラー:", error);
      resultBox.innerText = "通信エラーが発生しました。";
    });
});
