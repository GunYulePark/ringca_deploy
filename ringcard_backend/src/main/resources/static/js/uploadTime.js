console.log("hello meme");
function elapsedTime(date) {
  const start = new Date(date);
  const end = new Date(); // 현재 날짜

  const diff = (end - start); // 경과 시간

  // 하루 지나면 날짜로 나오도록록
 if (diff >= 1000 * 60 * 60 * 24) {
    var year = start.getFullYear() - 2000;
    var month = start.getMonth() + 1;
    var date = start.getDate();
    return `${year}년 ${month}월 ${date}일`
  }

  const times = [
    {time: "분", milliSeconds: 1000 * 60},
    {time: "시간", milliSeconds: 1000 * 60 * 60},
    // {time: "일", milliSeconds: 1000 * 60 * 60 * 24},
    // {time: "개월", milliSeconds: 1000 * 60 * 60 * 24 * 30},
    // {time: "년", milliSeconds: 1000 * 60 * 60 * 24 * 365},
  ].reverse();

  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    // 큰 단위는 0보다 작은 소수 단위 나옴
    if (betweenTime > 0) {
      return `${betweenTime}${value.time} 전`;
    }
  }

  // 모든 단위가 맞지 않을 시
  return "방금 전";
}

var pastUploadTime = elapsedTime(currentUploadTime);

function UploadTimeViewer(uploadTime) {
    var cardHeader = document.getElementById('card-header'+i);

    var newDiv = document.createElement('div');
    var newText = document.createTextNode(uploadTime);
    newDiv.appendChild(newText);

    cardHeader.appendChild(newDiv);
}

UploadTimeViewer(pastUploadTime);