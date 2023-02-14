const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const endPoint = qnaList.length;

function addAnswer(answerText, qIdx) {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add("answerList");
    answer.classList.add("my-3");
    answer.classList.add("qy-3");
    answer.classList.add("mx-auto");
    answer.classList.add("fadeIn");
    // answerBox div태그 내에 버튼추가
    a.appendChild(answer);
    answer.innerHTML = answerText
    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i=0; i<children.length; i++) {
            children[i].style.WebkitAnimation="fadeOut 0.5s";
            children[i].style.animation="fadeOut 0.5s";
            children[i].disabled=true;
        }
        setTimeout(()=> {
            for(let i=0; i<children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450)
        
    }, false);
}

function goNext(qIdx) {
    var q = document.querySelector(".qBox");
    q.innerHTML=qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
    var status = document.querySelector(".statusBar");
    status.style.width = (100/endPoint) * (qIdx+1) + "%";
}

function begin() {
    main.style.WebkitAnimation="fadeOut 1s";
    main.style.animation="fadeOut 1s";
    setTimeout(() => {
        
        qna.style.WebkitAnimation="fadeIn 1s";
        qna.style.animation="fadeIn 1s";
        setTimeout(()=> {
            main.style.display="none";
            qna.style.display="block";
        },400)
        let qIdx = 0;
        goNext(qIdx);
    },400)
    
}