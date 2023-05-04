let gpaLevel = document.querySelector(".gpaInputForm");
let newButton = document.querySelector(".button3");
let newText = document.querySelector(".pj");
newButton.addEventListener("click",(e)=>{
    e.preventDefault();
      evaluation(gpaLevel.value);
});

function evaluation(number){
  if(number>=3&&number<=4){
    newText.textContent = "You did a great job! 😊";
    console.log(newText.parentElement);
    newText.parentElement.style.borderColor = "#32de84";
  }else if(number<2&&number>=0){
    newText.textContent = "Have to study harder! 📖";
    newText.parentElement.style.borderColor = "#FFC72C";
  }else if(number<0||number>4){
    newText.textContent = "Please input a right number 😫";
    newText.parentElement.style.borderColor = "#C6011F";
  }else if(number>=2&&number<3){
    newText.textContent = "Not bad !😄";
    newText.parentElement.style.borderColor = "#B9D9EB";}
    else{
      newText.textContent = "Please input a number 😫";
      newText.parentElement.style.borderColor = "#C6011F";
  }
};

