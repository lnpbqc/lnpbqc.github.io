function setHeader(){
    let dateTime = document.querySelector("#date")
    const date = new Date()

    let content = date.getMonth()+1<10? "0"+(date.getMonth()+1):(date.getMonth()+1)
    content+="月"
    content += date.getDay()<10? "0"+date.getDay():date.getDay()
    content+="日"
    dateTime.innerHTML = content

    document.querySelector("#msg").innerHTML = `我们相识的第${getWhenWeMeet()}天`
}
function getData(){
    const data = JSON.parse(localStorage.getItem("MyNotes-lnpbqc"))
    if(data==undefined||data==[]||data==null||data==""){
        document.querySelector("#contents").innerHTML = "还没有内容呢！<span style='color:red;font-weight:bolder;'>注：内容完全存储于本地</span>要不先点击右下角增加一个。(Ctrl S,保存哦~;esc,取消哦~)"
        return
    }
    let content = ""
    data.forEach((e,i)=>{
        content+=`
        <article article-index="${i}">
            <div class="publishedTime">
                ${e.publishedTime}
            </div>
            <div class="content">
                ${e.article}
            </div>
        </article>
        `
    })
    document.querySelector("#contents").innerHTML = content
    setContentFormat()
    //删除
    document.querySelectorAll("article").forEach((e)=>{
        let Index = e.getAttribute("article-index")
        e.addEventListener('contextmenu',(event)=>{
            event.preventDefault()
            let del = confirm("真的要删了这个吗？")
            if(del){
                let data = JSON.parse(localStorage.getItem("MyNotes-lnpbqc"))
                data.splice(Index,1)
                localStorage.setItem("MyNotes-lnpbqc",JSON.stringify(data))
                getData()
            }
        } ,true)
        e.addEventListener("click",(event)=>{
            event.preventDefault()
            const data = JSON.parse(localStorage.getItem("MyNotes-lnpbqc"))
            let showBox = document.querySelector("#showArticle")
            document.querySelector("#showPublishedTime").innerHTML = data[Index].publishedTime
            document.querySelector("#showContent") .innerHTML = data[Index].article
            showBox.style.display = "block"
        },true)
    });
}
function setContentFormat(){
    document.querySelectorAll(".content").forEach((e)=>{
        let str = e.innerHTML
        if(str.length>100){
            str = str.substring(0,100)+"..."
        }
        e.innerHTML = str
    })
}
function init(){
    setHeader()
    getData()
    document.addEventListener("keydown",(e)=>{
        let target = e.target
        if(target.tagName==="DIV"&&target.contentEditable==="true"){
            if(e.ctrlKey&&e.key === 's'){
                e.preventDefault()
                let data = JSON.parse(localStorage.getItem("MyNotes-lnpbqc"))
                if(data==undefined)data = []
                if(target.innerHTML=="")return//防止其他ctrls对其产生影响
                // target.innerHTML = target.innerHTML.replace(/[\n\r]+/g, '<br/>').replace(/<div>([\s\S]*?)<\/div>/g, '$1')
                target.innerHTML = target.innerHTML.replace(/&nbsp;/g, ' ')
                // console.log(target.innerHTML);
                data.unshift({
                    publishedTime:getPublishedTime(),
                    article:target.innerHTML
                })
                localStorage.setItem("MyNotes-lnpbqc",JSON.stringify(data))

                document.querySelector("#addContent").innerHTML = ""
                document.querySelector("#addContent").style.display="none"

                getData()
            }else if(e.key === 'Escape'){
                document.querySelector("#addContent").innerHTML = ""
                document.querySelector("#addContent").style.display="none"
            }else if(e.key == "Enter"){
                // e.preventDefault()
                // target.innerHTML = target.innerHTML+"\r\n"
            }
        }
    })
    document.querySelector("#showArticle").addEventListener("click",()=>{
        document.querySelector("#showArticle").style.display = "none"
    },true)
}
init()


function getAdditionBox(){
    document.querySelector("#addContent").style.display="block"
    document.querySelector("#addContent").focus()
}
function getPublishedTime(){
    let d = new Date()
    let res = ""
    res += d.getMonth()+1<10?"0"+(d.getMonth()+1):(d.getMonth()+1)
    res +="/"
    res += d.getDay()<10?"0"+d.getDay():d.getDay()
    return res
}
function getWhenWeMeet(){
    let data = JSON.parse(localStorage.getItem("MyNotes-WhenWeMeet-lnpbqc"))
    if(data ==undefined||data == ""){
        data = new Date().getTime()
        localStorage.setItem("MyNotes-WhenWeMeet-lnpbqc",JSON.stringify(data))
    }
    return Math.floor((new Date() - data)/1000/60/60/24+1)
}