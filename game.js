
var round = 0;
var roundMax = 10;
var wins = 0;
var loses = 0;
var solution = new Array();
var solutionLength = 4;
var userName = "_placeHolder";

function initUser(){
    document.getElementById("startButton").addEventListener("click",function(){
        //Saves the name in a var
        userName = document.getElementById("user").value;
        //Remove the user name form (that is not a html form perse...)
        document.getElementById("userForm").remove();
        //And starts the game
        loadGame(userName);
    });
}

///---------------------Pre-generated structures---------------------
structName = '<div id="userName">name\'s Mastermind game</div>';
structWL = '<div id="generalState">Wins X | Loses: Y</div>';
structRoundViwer = '\
<div id="roundViewer">\
    <div id="answers">\
    </div>\
    <div id="checks">\
        <div id="index">\
            <div class="placeHolder"></div>\
            <div class="placeHolder"></div>\
            <div class="placeHolder"></div>\
            <div class="placeHolder"></div>\
        </div>\
    </div>\
</div>';
structRound = '\
<div class="Round">\
    <p>Round X</p>\
    <div id="AnswerGroupX">\
        <input type="text" name="RoundX" id="inputRoundX"></input>\
        <button id="checkButton"> Check!</button>\
    </div>\
</div>';
structResults = '\
<div class="Results">\
    <p class="correct">Y</p>\
    <p class="badPosition">Z</p>\
</div>';
///---------------------------------------------------------------------


function parseStringToHTML(string){
    return new DOMParser().parseFromString(string, "text/html").getElementsByTagName("body")[0].firstChild;
}

function getRandomSolution(){
    tmpSolution  = new Array();
    let index = 0;

    while(index < solutionLength){

        let tempNumberHold = Math.floor(Math.random() * 10);
        let index_2 = 0;
        let valueIsRepeated = false;

        while(index_2 < index && !valueIsRepeated){
            if(tmpSolution[index_2] == tempNumberHold){ valueIsRepeated = true}
            else{index_2++;}
        }

        if(!valueIsRepeated){
            tmpSolution[index] = tempNumberHold;
            index++;
        }
    }

    return tmpSolution;
}

function printCheckedSolution( tmpAnswer, correctPos, correctNum){
    let structResults_1 = structResults.replace("Y",correctPos).replace("Z",correctNum);
    let nodeResult = parseStringToHTML(structResults_1);
    for(i = tmpAnswer.length-1; i >= 0; i--){
       let numberNode = document.createElement("p");
       numberNode.innerText = tmpAnswer[i];
       numberNode.setAttribute("class","answer");
       nodeResult.firstChild.before(numberNode);
    }
    document.getElementById("checks").appendChild(nodeResult);
}

function createNewRound(){
    let structRound_1 = structRound.replaceAll("X",round);
    let nodeR = parseStringToHTML(structRound_1);
    document.getElementById("answers").appendChild(nodeR);
    document.getElementById("checkButton").addEventListener("click", checkSolution);
}

function checkAnswerLegality(tmpAnswer){
    document.getElementById("inputRound"+round).value = "";
    if(isNaN(tmpAnswer)){
        alert("Your input isn't a number!");
        return false;
    }
    else if(tmpAnswer.length != solutionLength){
        alert("Your input is to long or short, please, input a 4 digit code without any digit repetition!");
        return false;
    } else{
        for(i = 0; i < tmpAnswer.length; i++){
            let j = i + 1;
            while(j < tmpAnswer.length){
                if(tmpAnswer[i] == tmpAnswer[j]){
                    alert("There is digit repetition in the input!");
                    return false;
                }
                j++;
            }
        }
    }
    return true;
}

function checkGameState(correctPos){
    if(correctPos == solutionLength){
        wins++;
        alert("You win this round!");
        loadGame(userName);
    }else{
        round++;
        if(round > roundMax){
            loses++;
            alert("You lose this round!");
            loadGame(userName);
        }else{
            createNewRound();
        }
    }
}

function checkSolution(){
    let tmpAnswer = document.getElementById("inputRound"+round).value;
    
    if(!checkAnswerLegality(tmpAnswer)){return;}

    document.getElementById("AnswerGroup"+round).remove();
    
    let correctPos = 0;
    let correctNum = 0;

    //Checks if the answer has correct positions and/or digits in the answer
    for(i = 0; i < solutionLength; i++){
        let j = 0;
        let numberFound = false;
        while(!numberFound && j < solutionLength){
            if(tmpAnswer[i] == solution[j]){
                if(i == j){
                    correctPos++;
                }else{
                    correctNum++;
                }
                numberFound = true;
            }else{
                j++;
            }
        }
    }

    //Print the results of the round
    printCheckedSolution(tmpAnswer, correctPos, correctNum);    
    //Check game state
    checkGameState(correctPos);

}

function loadGame(name){

    round = 1;

    let structName_1 = structName.replace("name",name);
    let structWL_1 = structWL.replace("X",wins).replace("Y",loses); 
    let structRound_1 = structRound.replaceAll("X",round);

    let nodeName = parseStringToHTML(structName_1);
    let nodeWL = parseStringToHTML(structWL_1);
    let nodeRV = parseStringToHTML(structRoundViwer);
    let nodeR = parseStringToHTML(structRound_1);

    let gameContainer = document.getElementById("gameContainer");
    
    if(gameContainer.firstChild != undefined){
        while(gameContainer.firstChild != undefined){
            gameContainer.removeChild(gameContainer.lastChild);
        }
    }

    gameContainer.appendChild(nodeName);
    gameContainer.appendChild(nodeWL);
    gameContainer.appendChild(nodeRV);
    
    document.getElementById("answers").appendChild(nodeR);
    document.getElementById("checkButton").addEventListener("click", checkSolution);

    solution = getRandomSolution();
}