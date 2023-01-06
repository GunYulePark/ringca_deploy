//https://fun25.co.kr/blog/javascript-url-query-parameter-reading-updating-urlsearchparams/?page=5
var sch = location.search;
var params = new URLSearchParams(sch);
var status = params.get('status');


//
//if (status == "true"){
//// https://coding-restaurant.tistory.com/212
//    var newDIV = document.createElement("div");
//    newDIV.innerHTML = "새로 생성된 DIV입니다.";
//    var alarm = document.getElementById("alarm"); // <p "id=p"> 태그의 DOM 객체 찾기
//    alarm.appendChild(newDIV);
////    alert("hello");
////    params.set('status', "false"); // 재설정. 근데 하나 마나 똑같다
////var myDiv = document.getElementById("myDiv");
//
//var parent = newDIV.parentElement; // 부모 객체 알아내기
//parent.removeChild(myDiv); // 부모로부터 myDiv 객체 떼어내기
////출처: https://coding-restaurant.tistory.com/212 [코딩맛집:티스토리]
//}
//


//https://velog.io/@eunjin/Javascript-Showing-Notification-%EC%95%88%EB%82%B4%EB%AC%B8%EA%B5%AC-%EB%82%98%ED%83%80%EB%82%AC%EB%8B%A4%EA%B0%80-%EC%82%AC%EB%9D%BC%EC%A7%80%EA%B2%8C-%ED%95%98%EA%B8%B0
const notification = document.getElementById('notification-container');

// Show notification
const showNotification = () => {
  notification.classList.add('show')
  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
};

if(status=="true"){
    showNotification();
}
