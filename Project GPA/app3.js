//阻止网站的enter key
window.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        e.preventDefault();
    }
});

//防止form内部的button交出表单

let allButtons = document.querySelectorAll("button");
allButtons.forEach(button => {
    button.addEventListener("click", (e)=> {
    e.preventDefault();
    })
    });


let allSelects = document.querySelectorAll("select");
    allSelects.forEach((select)=>{
    select.addEventListener("change",(e)=>{
        setGPA();
        changeColor(e.target);
    });
});

let allCredits = document.querySelectorAll(".class-credits");
    allCredits.forEach((_credit)=>{
    _credit.addEventListener("change",()=>{
        setGPA();
    });
});


function changeColor(target){
    if(target.value=="S"||target.value=="A"){
        target.style.color="black";
        target.style.backgroundColor="lightgreen";
    }else if(target.value=="B"||target.value=="C"){
        target.style.color="black";
        target.style.backgroundColor="orange";
    }else if(target.value=="D"){
        target.style.backgroundColor="grey";
        target.style.color="white";
    }else{
        target.style.backgroundColor="white";
    }
};


function covertor(grade){
    switch(grade){
        case "S":
            return 4.0;
        case "A":
            return 3.0;
        case "B":
            return 2.0;
        case "C":
            return 1.0;
        case "D":
            return 0.0;
        default:
            return 0;
    }
}

function setGPA(){
    let formLength = document.querySelectorAll("form").length;
    let credits = document.querySelectorAll(".class-credits");
    let selects =  document.querySelectorAll("select");
    let sum = 0;
    let creditSum = 0;
    for(let i = 0;i<credits.length;i++){
        if(!isNaN(credits[i].valueAsNumber)){
            creditSum += credits[i].valueAsNumber;
        }
    }
    for(let i = 0;i<formLength;i++){
        if(!isNaN(credits[i].valueAsNumber)){
            sum += credits[i].valueAsNumber*covertor(selects[i].value);
        }
    }

    let result;
    if(creditSum == 0){
        result=(0.0).toFixed(2);
    }else{
        result= (sum/creditSum).toFixed(2);
    }
    document.getElementById("result-gpa").innerText = result;

}

let allform = document.querySelector(".plus-btn");
allform.addEventListener("click",()=>{
    let newForm = document.createElement("form");
    let newDive = document.createElement("div");
    newDive.classList.add("grader");

    

    let newInput1 = document.createElement("input");
    newInput1.setAttribute("type","text");
    newInput1.setAttribute("list","opt");
    newInput1.setAttribute("placeholder","Class Catagory");
    newInput1.classList.add("class-type");

    let newSelect = document.createElement("select");
    newSelect.classList.add("select");
    newSelect.setAttribute("name","select");
    var opt1 = document.createElement("option");
    opt1.setAttribute("value", "");
    let textNode1 = document.createTextNode("");
    opt1.appendChild(textNode1);
    var opt2 = document.createElement("option");
    opt2.setAttribute("value", "S");
    let textNode2 = document.createTextNode("S");
    opt2.appendChild(textNode2);
    var opt3 = document.createElement("option");
    opt3.setAttribute("value", "A");
    let textNode3 = document.createTextNode("A");
    opt3.appendChild(textNode3);
    var opt4 = document.createElement("option");
    opt4.setAttribute("value", "B");
    let textNode5 = document.createTextNode("B");
    opt4.appendChild(textNode5);
    var opt5 = document.createElement("option");
    opt5.setAttribute("value", "C");
    let textNode8 = document.createTextNode("C");
    opt5.appendChild(textNode8);
    var opt6 = document.createElement("option");
    opt6.setAttribute("value", "D");
    let textNode11 = document.createTextNode("D");
    opt6.appendChild(textNode11);
  
    newSelect.appendChild(opt1);
    newSelect.appendChild(opt2);
    newSelect.appendChild(opt3);
    newSelect.appendChild(opt4);
    newSelect.appendChild(opt5);
    newSelect.appendChild(opt6);
    newSelect.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });

    let newInput3 = document.createElement("input");
    newInput3.setAttribute("type", "number");
    newInput3.setAttribute("min", "0");
    newInput3.setAttribute("max", "2");
    newInput3.classList.add("class-credits");
    newInput3.setAttribute("placeholder","Credits")
    newInput3.addEventListener("change", () => {
      setGPA();
    });
    

    let newB = document.createElement("button");
    newB.classList.add("trash-button");
    newB.addEventListener("click",(e)=>{
        e.preventDefault();
        e.target.parentElement.parentElement.style.animation = 
        "scaleDown 0.5s ease-in"
        e.target.parentElement.parentElement.addEventListener("animationend",(e)=>{
            e.target.remove();
            setGPA();
        })
    })
    let newIcon = document.createElement("i");
    newIcon.classList.add("fas");
    newIcon.classList.add("fa-trash");
    newB.appendChild(newIcon);

    newDive.appendChild(newInput1);
    newDive.appendChild(newSelect);
    newDive.appendChild(newInput3);
    newDive.appendChild(newB);
    newForm.appendChild(newDive);
    document.querySelector(".allInputs").appendChild(newForm);
    newForm.style.animation ='scaleUp 0.5s ease forwards';
});

let newDelete = document.querySelectorAll(".trash-button");
newDelete.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove");
  });

  newDelete.forEach((trash)=>{
    let form = trash.parentElement.parentElement;
    form.addEventListener("transitionend",(e)=>{
        e.target.remove();
        setGPA();
    })
  })
});

//排序演算法

let btn1 = document.querySelector(".sortDescending");
let btn2 = document.querySelector(".sortAscending");
let fix = document.querySelector(".grader");

btn1.addEventListener("click",(e)=>{
    handleSorting("descending");
});

btn2.addEventListener("click",()=>{
    handleSorting("ascending");
});

function handleSorting(direction){
    let graders = document.querySelectorAll("div.grader");
    let objectArray = [];
    for(let i =0;i<graders.length;i++){
        let className = graders[i].children[0].value;
        let class_grade = graders[i].children[1].value;
        let class_credit = graders[i].children[2].value;
        if(!(className==""&&
           class_grade ==""&&
           class_credit =="")){
            let class_object = {
                className,
                class_grade,
                class_credit,
            };
            objectArray.push(class_object);
           }
    }

    for(let i=0;i<objectArray.length;i++){
        objectArray[i].class_grade_number = covertor(objectArray[i].class_grade)
    }

    objectArray = mergeSort(objectArray);
    if(direction=="descending"){
        objectArray = objectArray.reverse();
    }
    let allInputs = document.querySelector(".allInputs");
    allInputs.innerHTML = "";


    if(objectArray!==undefined){
        for(let i = 0;i<objectArray.length;i++){
            allInputs.innerHTML+=`<form>
    <div class="grader">
        <input type="text" 
        placeholder="Class Catagory" 
        class="class-type" 
        list="opt"
        value =${objectArray[i].className}
        ><!--
        --><select name="select" class="select">
            <option value=""></option>
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>-
          </select
          ><!--
          --><input type="number" placeholder="Credits" min="0" max="2" 
          class="class-credits" value=${objectArray[i].class_credit}>
          <!--
          --><button class="trash-button"><i class="fas fa-trash"></i></button>
    </div>
    </form> `;
        graders = document.querySelectorAll("div.grader");
        for(let i=0;i<graders.length;i++){
            graders[i].children[1].value = objectArray[i].class_grade;
    
        }
        }
    }else{
        for(let i =0; i<3;i++){
            allInputs.innerHTML+=`<form>
            <div class="grader">
                <input type="text" 
                placeholder="Class Catagory" 
                class="class-type" 
                list="opt"
                ><!--
                --><select name="select" class="select">
                    <option value=""></option>
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>-
                  </select
                  ><!--
                  --><input type="number" placeholder="Credits" min="0" max="2" 
                  class="class-credits">
                  <!--
                  --><button class="trash-button"><i class="fas fa-trash"></i></button>
            </div>
            </form> `;
        }
    }
  //select 事件监听

    let allS = document.querySelectorAll("select");
    allS.forEach((select)=>{
        changeColor(select);
        select.addEventListener("change",(e)=>{
            setGPA();
            changeColor(e.target);
        })
    })

 let allC = document.querySelectorAll(".class-credits");
 allC.forEach((credit)=>{
    credit.addEventListener("change",()=>{
        setGPA();
    })
 })

 let allTrash = document.querySelectorAll(".trash-button");
 allTrash.forEach((trash) => {
   trash.addEventListener("click", (e) => {
     e.preventDefault();
     e.target.parentElement.parentElement.style.animation =
       "scaleDown 0.5s ease forwards";
     e.target.parentElement.parentElement.addEventListener(
       "animationend",
       (e) => {
         e.target.remove();
         setGPA();
       }
     );
   });
 });
}

function merge(a1,a2){
    let result = [];
    let i = 0;
    let j = 0;
    while(i<a1.length&&j<a2.length){
        if(a1[i].class_grade_number>a2[j].class_grade_number){
            result.push(a2[j]);
            j++;
        }else{
            result.push(a1[i]);
            i++;
        }
    }

    while(i<a1.length){
        result.push(a1[i]);
        i++;
    }

    while(j<a2.length){
        result.push(a2[j]);
        j++;
    }
    return result;
}

function mergeSort(arr){
    if(arr.length == 0||arr===undefined){
        return;
    }
    if(arr.length==1){
        return arr;
    }else{
        let middle = Math.floor(arr.length/2);
        let left = arr.slice(0,middle);
        let right = arr.slice(middle, arr.length);
        return merge(mergeSort(left),mergeSort(right));
    }
}




