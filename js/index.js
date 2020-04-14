// 版权
var years = new Date().getFullYear();
var months = new Date().getMonth()+1;
var days = new Date().getDate();
var right = document.querySelector("footer").querySelector('p').querySelector('span');
function theRight(){
    right.innerHTML = "-"+years+"."+ months +"."+ days;
}
theRight();





// 时间
function time() {
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var str = hour + "H." + minutes + "m." + seconds + "s";
    var div1 = document.getElementById("time");
    div1.innerHTML = str;
    if (seconds % 2 == 0) {
        div1.style.backgroundColor = "black";
        div1.style.color = "white";
    } else {
        div1.style.backgroundColor = "white";
        div1.style.color = "black";
    }
}
setInterval(time,1000);





// 一个隐藏着的按钮
var span = document.querySelector("#meRight").querySelector("span");
span.onclick = function(){
    var isRight = confirm("你确定要清除吗？");
    if(isRight){
        document.write('');
    }
}





// 去往新世界的按钮
var btn = document.querySelector("#meRight").querySelector("button");
btn.onclick = function(){
    location.href = "https://www.bilibili.com";
}





// theme中的选择
var themelis = document.querySelector('#theme_list').querySelector('ul').querySelectorAll('li');
var themeboxes = document.querySelector('#theme').querySelectorAll('.theme');
for(var i = 0; i < themelis.length;i++){
    themelis[i].setAttribute('index',i);
    themelis[i].onclick = function(){
        var index = this.getAttribute('index');
        for(var i = 0; i < themeboxes.length; i++){
            themeboxes[i].style.display = "none";
        }
        themeboxes[index].style.display = "block";
    }
}





// 倒计时
var Dday = document.querySelector('#Dday');
var Dhour = document.querySelector('#Dhour');
var Dminute = document.querySelector('#Dminute');
var Dsecond = document.querySelector('#Dsecond');
var deadline = new Date("2021-6-7").getTime();
function countDown(){
    var nowTime = new Date().getTime();
    var times = (deadline - nowTime) / 1000;
    var d = parseInt(times / 60 / 60 /24);// 天
    d = d < 10 ? "0" + d : d;
    var h = parseInt(times / 60 / 60 %24);// 时
    h = h < 10 ? "0" + h : h;
    var m = parseInt(times / 60 % 60);// 分
    m = m < 10 ? "0" + m : m;
    var s = parseInt(times % 60);// 秒
    s = s < 10 ? "0" + s : s;
    Dday.innerHTML = d;
    Dhour.innerHTML = h;
    Dminute.innerHTML = m;
    Dsecond.innerHTML = s;
}
setInterval(countDown,1000);


// BILI



// 歌曲控制
// 借鉴：https://www.open-open.com/lib/view/open1407401112973.html
var songs = document.querySelector('audio');
var volume_plus = document.querySelector('#songs_control').querySelector('.plus');
var volume_less = document.querySelector('#songs_control').querySelector('.less');
var songs_next = document.querySelector('#songs_control').querySelector('.next');
var songs_stop = document.querySelector('#songs_control').querySelector('.stop');
var songs_number = 0;
songs.volume = 0.25;
songs_next.onclick = function(){
    if(songs_number == 0){
        // 青春大概
        songs_number += 1;
        songs.src = 'http://music.163.com/song/media/outer/url?id=1387568493.mp3';
    }else if(songs_number == 1){
        // Illusionary Daytime
        songs_number += 1;
        songs.src = 'http://music.163.com/song/media/outer/url?id=28907016.mp3';
    }else if(songs_number == 2){
        // 倒数
        songs_number += 1;
        songs.src = 'http://music.163.com/song/media/outer/url?id=1299550532.mp3';
    }else{
        // 句号
        songs_number = 0;
        songs.src = 'http://music.163.com/song/media/outer/url?id=1405283464.mp3';
    }
}
var songs_stopnum = true;
songs_stop.onclick = function(){
    if(songs_stopnum){
        songs.play();
        songs_stopnum = false;
    }else{
        songs.pause();
        songs_stopnum = true;
    }
    if(songs_stopnum == true){
        songs_stop.innerHTML = 'Play';
    }else{
        songs_stop.innerHTML = 'Stop';
    }
}
volume_plus.onclick = function(){
    if(songs.volume == 1){
        console.log('WARNING!');
    }
    songs.volume = songs.volume + 0.25;
}
volume_less.onclick = function(){
    if(songs.volume == 0){
        console.log('WARNING!');
    }
    songs.volume = songs.volume - 0.25;
}


// 搜索
var searchbtn = document.getElementById('tosearch');
var search = document.getElementById('search');
var searchinput = document.querySelector('form').querySelector('input');
var searchflag = true;
searchbtn.onclick = function(){
    if(searchflag){
        search.style.display = 'block';
        searchflag = false;
    }else{
        searchinput.value = '';
        search.style.display = 'none';
        searchflag = true;
    }
}
searchbtn.onmouseover = function(){
    this.style.backgroundColor = 'rgba(51,255,204,.5)';
    this.style.color = 'black';
}
searchbtn.onmouseout = function(){
    this.style.backgroundColor = 'rgba(0,0,0,.01)';
    this.style.color = 'rgba(0,0,0,.01)';
}
document.addEventListener('keyup',function(e){
    // console.log(e.keyCode);
    if(e.keyCode === 110){
        if(searchflag){
            search.style.display = 'block';
            searchinput.focus();
            searchflag = false;
        }else{
            searchinput.blur();
            searchinput.value = '';
            search.style.display = 'none';
            searchflag = true;
        }
    }
})

// 阻止复制
document.addEventListener('contextmenu',function(e){
    e.preventDefault();
})
document.addEventListener('selectstart',function(e){
    e.preventDefault();
})
