// 歌曲控制
// 借鉴：https://www.open-open.com/lib/view/open1407401112973.html
var songs = document.querySelector('audio');
var volume_plus = document.querySelector('#songs_control').querySelector('.plus');
var volume_less = document.querySelector('#songs_control').querySelector('.less');
var songs_next = document.querySelector('#songs_control').querySelector('.next');
var songs_stop = document.querySelector('#songs_control').querySelector('.stop');
var songs_number = 0;
songs.volume = 0.25;
songs_list = [
    'http://music.163.com/song/media/outer/url?id=1387568493.mp3',//青春大概
    'http://music.163.com/song/media/outer/url?id=2866921.mp3',//Schnappi
    'http://music.163.com/song/media/outer/url?id=1299550532.mp3',//倒数
    'http://music.163.com/song/media/outer/url?id=1405283464.mp3'//句号
]
function RandomNum(Max,Min){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}
songs_next.onclick = function(){
    // if(songs_number == 0){
    //     // 青春大概
    //     songs_number += 1;
    //     songs.src = 'http://music.163.com/song/media/outer/url?id=1387568493.mp3';
    // }else if(songs_number == 1){
    //     // Illusionary Daytime
    //     songs_number += 1;
    //     songs.src = 'http://music.163.com/song/media/outer/url?id=28907016.mp3';
    // }else if(songs_number == 2){
    //     // 倒数
    //     songs_number += 1;
    //     songs.src = 'http://music.163.com/song/media/outer/url?id=1299550532.mp3';
    // }else{
    //     // 句号
    //     songs_number = 0;
    //     songs.src = 'http://music.163.com/song/media/outer/url?id=1405283464.mp3';
    // }
    if(true){
        songs_number = RandomNum(3,0);
        console.log(songs_number);
        songs.src = songs_list[songs_number];
        // songs_number += 1;
    }// else{
    //     songs.src = 'http://music.163.com/song/media/outer/url?id=1387568493.mp3';
    //     songs_number = 0;
    // }

    songs.play();
    if(songs_stopnum == true){
        songs_stopnum = false;
    }
    songs_stop.innerHTML = 'Stop';
}
var songs_stopnum = false;
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
