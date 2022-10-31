const start_btn=document.querySelector(".start_btn");
const info_box=document.querySelector(".info_box")
const exit_quiz=document.querySelector(".quit");
const restart=document.querySelector(".restart")
const quizBox=document.querySelector(".quiz_box");
const que_text=document.querySelector(".que_text");
const options=document.querySelector(".option_list");
const next_btn=document.querySelector(".next_btn");
const result_box=document.querySelector(".result_box");
const exit=document.querySelector(".exit");
const replaying=document.querySelector(".replay");
const totalQue=document.querySelector(".total_que");
const timeCount=quizBox.querySelector(".timer .timer_sec");
const timeLine=quizBox.querySelector("header .time_line");
const scorText=document.querySelector(".score_text")
const timeOff=document.querySelector(".time_left_txt");





start_btn.addEventListener("click",startInfo);
exit_quiz.addEventListener("click",exitQuiz);
restart.addEventListener("click",startQuiz)
next_btn.addEventListener("click",nextBtn);
exit.addEventListener("click",quizExit);
replaying.addEventListener("click",replay);



function startInfo(){
    info_box.classList.add("activeInfo")
}

function exitQuiz(){
    info_box.classList.remove("activeInfo")
}

function startQuiz(){
    info_box.classList.remove("activeInfo")

    quizBox.classList.add("activeQuiz")

    showQuiz(0)
    Counter(1)
    startTimer(15)
    startTimerLine(0)

}

var count=1;
var que_count=0;
let timeCounter;
let timeValue=15;

let widthValue=0;
userScore=0;

function showQuiz(index){
    const q_text='<span>'+questions[index].question+'</span>'
    que_tag= '<span>'+questions[index].numb+" . "+questions[index].question+'</span>'
    opt_list='<div class="option">'+questions[index].options[0]+'<span></span></div>'+
             '<div class="option">'+questions[index].options[1]+'<span></span></div>'+
             '<div class="option">'+questions[index].options[2]+'<span></span></div>'+
             '<div class="option">'+questions[index].options[3]+'<span></span></div>'
    options.innerHTML=opt_list;
    que_text.innerHTML=que_tag;
    const option=document.querySelectorAll(".option");

    for (let i = 0; i <option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)");
        
    }
    
}
let tickIcon='<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon='<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(timeCounter)
    clearInterval(counterLine)

    let userAns=answer.textContent
    let correctAns=questions[que_count].answer
    let allOptions=options.children.length;
    if(userAns==correctAns){
        userScore +=1
        if(userScore>3){
            let score='<div>Tebrikler!,'+questions.length+' sorudan '+userScore+' tanesini bildin!</div>'
            scorText.innerHTML=score;
        }
        else if(userScore>1){
            let score='<div>Üzgünüm!,'+questions.length+' sorudan '+userScore+' tanesini bildin!</div>'
            scorText.innerHTML=score;
        }
       
        else{
            let score='<div>Üzgünüm!,'+questions.length+' sorudan '+userScore+' tanesini bildin!</div>'
            scorText.innerHTML=score;
        }
       
        answer.classList.add("correct")
        answer.insertAdjacentHTML("beforeend",tickIcon);

    }
    else{
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeend",crossIcon);
        if(userScore==0){
            let score='<div>Hiç bir soruya doğru cevap veremedeniz!</div>'
            scorText.innerHTML=score;
        }


        

        
    for (let i = 0; i< allOptions; i++) {

        if(options.children[i].textContent==correctAns){
            options.children[i].classList.add("correct")
            options.children[i].insertAdjacentHTML("beforeend",tickIcon);
        }
          

         
      }
  

    }



    for (let i = 0; i< allOptions; i++) {
      options.children[i].classList.add("disabled")
       
    }

   
    next_btn.style.display="block"
    
}


function nextBtn(){

    if(que_count!==questions.length -1){

        que_count++;
        count++;
        showQuiz(que_count)

        Counter(count)
        clearInterval(timeCounter)
        startTimer(timeValue)
        clearInterval(counterLine)
        startTimerLine(widthValue)
        next_btn.style.display="none"
        
        timeOff.innerText="Süre"


    }

    else{
        result_box.classList.add("activeResult");
        quizBox.classList.remove("activeQuiz")

    }

}


function quizExit(){
    result_box.classList.remove("activeResult");
    que_count=0;
    

}
function replay(){
    info_box.classList.add("activeInfo")
    
    result_box.classList.remove("activeResult");
    que_count=0;

}


function startTimerLine(time){
    counterLine=setInterval(timer,29)
    function timer(){
        time +=1
        timeLine.style.width=time + "px"
        if(time>549){
            clearInterval(counterLine)
        }
    }
    
}
function startTimer(time){
    timeCounter=setInterval(timer,1000)
    function timer(){
         timeCount.textContent=time;
        time--;

        if(time<0){
            clearInterval(timeCounter)
            timeOff.innerText="süre Bitti"
            time=0;
            let correctAns=questions[que_count].answer
    let allOptions=options.children.length;

            for (let i = 0; i< allOptions; i++) {

                if(options.children[i].textContent==correctAns){
                    options.children[i].classList.add("correct")
                    options.children[i].insertAdjacentHTML("beforeend",tickIcon);
                     next_btn.style.display="block"

                }
                  
        
                 
              }
              for (let i = 0; i< allOptions; i++) {
                options.children[i].classList.add("disabled")
                 
              }
          
        }
    }
    
}





function Counter(count){
    const totalQuiz='<span><p>'+count+'</p>/<p>'+questions.length+'</p></span>'
    totalQue.innerHTML=totalQuiz;
}