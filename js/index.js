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

// 搜索
// 改一下聚焦问题
var searchbtn = document.getElementById('tosearch');
var search = document.getElementById('search');
var searchinput = document.querySelector('form').querySelectorAll('input');
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
    console.log(e.key);
    if(e.key === '.'){
        if(searchflag){
            search.style.display = 'block';
            searchinput[0].focus();
            searchinput.value = '';
            searchflag = false;
        }else{
            searchinput[0].blur();
            searchinput.value = '';
            search.style.display = 'none';
            searchflag = true;
        }
    }
})

// blog部分
var blog = document.querySelector('#blog').querySelector('#blogMain');
// for(var i = 0; i < blog.children.length; i++){
//     blog.children[i].querySelector('span').innerHTML = '广告位招租';
//     blog.children[i].querySelector('span').style.lineHeight = 80 + "px";
//     blog.children[i].querySelector('h4').innerHTML = '广告位招租';
// }
var blog_dairy = blog.children[0];
    // blog_dairy.onclick = function(){
    //     // location.replace('/links/dairy/');
    //     alert('WARNING!');
    //     confirm('你想多了，我怎么可能会在这上面更日记呢')
    // }
    blog_dairy.querySelector('h4').innerHTML = 'original';
    blog_dairy.querySelector('h4').style.fontFamily = '楷体';
    blog_dairy.querySelector('h4').style.textShadow = '0 0 20px gray';
    blog_dairy.querySelector('.blogIntroduction').innerHTML = '于他人无害且对己有利之事，勿听他人之狂吠，且听内心，则达也。';
    blog_dairy.querySelector('.blogIntroduction').style.lineHeight = 16+'px';

var blog_study = blog.children[1];
    blog_study.onclick = function(){
        location.replace('/links/study/');
        confirm('时间不等人');
    }
    blog_study.querySelector('h4').innerHTML = '学习';
    blog_study.querySelector('h4').style.fontFamily = '楷体';
    blog_study.querySelector('h4').style.textShadow = '0 0 20px gray';
    blog_study.querySelector('.blogIntroduction').innerHTML = '今日不肯埋头，明日何以抬头';
    blog_study.querySelector('.blogIntroduction').style.lineHeight = 16+'px';


window.onload = function(){
    var Dday = document.querySelector('#Dday');
    var Dhour = document.querySelector('#Dhour');
    var Dminute = document.querySelector('#Dminute');
    var Dsecond = document.querySelector('#Dsecond');
    var deadline = new Date("2021-6-7-8:00").getTime();
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
//     var grades = document.querySelector("#grades");
//     var i = 0
//     grades.innerHTML = '666';
//     do{
//         grades.innerHTML = '666'+grades.innerHTML;
//         i+=1;
//         if(i==4){
//             grades.innerHTML =grades.innerHTML+"<br>";
//         }
//     }while(i<=150)
}


// 随机出现poems中的内容
// 暂时弃用
// var poems = document.getElementById('poems');
// function RandomNum(Max,Min){
//     var Range = Max - Min;
//     var Rand = Math.random();
//     var num = Min + Math.round(Rand * Range); //四舍五入
//     return num;
// }
// window.onload = function(){
//     var poems_num = RandomNum(6,0);
//     var block = poems.querySelectorAll('blockquote');
//     block[poems_num].style.display = "block";
// }


// 阻止复制、防止窥探
document.addEventListener('keydown',function(e){
    // console.log(e.keyCode);
    if(e.keyCode == 123 || e.keyCode == 17){
        location.replace('https://man.ilovefishc.com/');
    }
})
document.addEventListener('contextmenu',function(e){
    e.preventDefault();
})
document.addEventListener('selectstart',function(e){
    e.preventDefault();
})
// 监听是否在页面
// window.onfocus = function () {
//     document.title = '尽言谨言净言.|涤尘.';
// };
// window.onblur = function () {
//     document.title = '快回来~页面崩溃了';
// };
var hiddenProperty = 'hidden' in document ? 'hidden' :'webkitHidden' in document ? 'webkitHidden' :'mozHidden' in document ? 'mozHidden' :null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function(){
    if (!document[hiddenProperty]) {
        document.title = '雲的追憶.|涤尘.';
        // 尽言谨言禁言
    }else{
        document.title = '𝔸𝕕𝕕𝕚𝕔𝕥𝕖𝕕.';
    }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);
