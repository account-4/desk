  "use strict";

  //ウィンドウの中身を切り替える関数。
function replaceContent(filePath, targetId, displayAreaId) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('ファイルの読み込みに失敗しました: ' + response.status);
      }
      return response.text();
    })
    .then(htmlText => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      
      const newElement = doc.getElementById(targetId);
      
      if (newElement) {
        const displayArea = document.getElementById(displayAreaId);
        
        if (displayArea) {
          displayArea.innerHTML = '';
          displayArea.appendChild(newElement.cloneNode(true));
        } else {
          console.error('今の画面に入れ替え先のIDが見つかりません: ' + displayAreaId);
        }
      } else {
        console.error('指定されたファイルのIDが見つかりませんでした: ' + targetId);
      }
    })
    .catch(error => {
      console.error('エラーが発生しました:', error);
    });
}
