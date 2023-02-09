const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

//컨버스의 크기 설정
canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;

const lineWidth = document.getElementById("line-width");
ctx.lineWidth=lineWidth.value;
ctx.lineCap = "round";

//배열로 주지않고 HTMLCollection으로 주기 때문에
//문자열 등 유사 배열(Array-like) 객체나 이터러블한 객체를 배열로 만들어주는 메서드
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");

//버튼
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("erase-btn");

const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");

const fontSize = document.getElementById("fontSize");

let isPainting = false;
let isFilling = false;
let fSize = 68;

//마우스 클릭한 채 움직였을 때
function onMove(event) {   
    if (isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    } 
    ctx.moveTo(event.offsetX, event.offsetY);
}

//마우스를 클릭했을 때
function onMouseDown() {
    if (isFilling) {
        ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    } else {
        isPainting = true;
    }
    
}
//마우스를 뗐을 때
function onMouseUp() {
    isPainting=false;
    ctx.beginPath();
}

//라인 굵기 조절
function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

//컬러 단일 박스 선택시
function onColorChange(event) {
    //console.log(event.target.value);
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

//컬러 리스트 선택시
function onColorClick(event) {
    //console.dir(event.target.dataset.color);
    const colorValue = event.target.dataset.color  //data-* 이용하여 dataset.*
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue
}

function onModeClick() {
    if (isFilling) {
        isFilling = false
        modeBtn.innerText = "Fill"
    } else {
        isFilling = true
        modeBtn.innerText = "Draw"
    }
}

//초기화 버튼, 되돌리수는 없으므로 그냥 하얗게 덮어줌
function onDestroyClick() {
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
}

//지우개 버튼
function onEraseClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill"
}

//그림추가
function onFileChange(event) {
    //하나의 파일만 가져옴
    const file = event.target.files[0];
    //브라우저의 메모리안에 저장된 업로드한 파일을 url로 접근 
    //createObjectURL >> 해당 파일의 브라우저 메모리 url을 알수있음(해당 url은 내 브라우저에만 보임)
    const url = URL.createObjectURL(file);
    console.log(url);
    const image = new Image();  //document.createElement("img")와 동일
    image.src = url;
    //addEventListener의 다른방식
    image.onload = function() {
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

//텍스트 추가
function onDoubleClick(event) {
    // console.log(event.offsetX, event.offsetY);
    const text = textInput.value;
    if (text != "") {
        ctx.save();     //ctx의 현재 상태, 색상, 스타일 등 모든 것을 저장
        ctx.lineWidth =1;
        // ctx.fontSize = fSize + "px";
        // console.log(ctx.fontSize);
        ctx.font = fSize + "px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();      //기존의 체크포인트로 돌아감
    }
    
}

function onSaveClick() {
    //캔버스를 url로 변환(인코딩)한 후,
    const url = canvas.toDataURL();
    //a 태그를 생성해 가짜링크를 만든 다음
    const a = document.createElement("a");
    //링크의 href는 그림 url로 설정해주고 
    a.href = url;
    //파일명 설정하고
    a.download = "myDrawing.png";
    //클릭하면 다운로드
    a.click();

}

function onfontSizeClick(event) {
    fSize = parseInt(event.target.value);
    console.log(fSize);
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
//마우스 클릭한 채 캔버스 밖으로 나갔다가 돌아왔을 때 계속 mousedown 상태인 것의 버그 방지
canvas.addEventListener("mouseleave", onMouseUp);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

//이해안가는 부분
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraseClick);

fileInput.addEventListener("change", onFileChange);
canvas.addEventListener("dblclick", onDoubleClick);
saveBtn.addEventListener("click", onSaveClick);

fontSize.addEventListener("click", onfontSizeClick);