
var round = 0;
var roundMax = 10;
var wins = 0;
var loses = 0;
var answer = new Array();
var solution = new Array();

function initUser(){
    document.getElementById("startButton").addEventListener("click",function(){
        //guarda el nom i iniciar el joc
        var userName = document.getElementById("user").value;
        document.getElementById("userForm").remove();
        loadGame(userName);
    });
}

structName = '<div id="userName">name</div>';
structWL = '<div id="generalState">Wins X | Loses: Y</div>';

structRoundViwer = '\
<div id="roundViewer">\
    <div id="index">\
        <div class="placeHolder"></div>\
        <div class="placeHolder"></div>\
        <div class="placeHolder"></div>\
        <div class="placeHolder"></div>\
    </div>\
    <div id="answers">\
    </div>\
    <div id="checks">\
    </div>\
</div>';

structRound = '\
<div class="Round">\
    <p>RoundX</p>\
    <input type="text" name="RoundX" id="inputRoundX"></input>\
    <button id="checkButton"> Check!</button>\
</div>';

structResults = '\
<div class="Results">\
    <p class="answer">answer</p><p class="correct">correct:</p><p class="badPosition">bad position:</p>\
</div>';

function loadGame(name){

    structName_1 = structName.replace("name",name);
    structWL_1 = structWL.replace("X",wins).replace("Y",loses); 
    structRound_1 = structRound.replace("X",round);

    var nodeName = new DOMParser().parseFromString(structName_1, "text/html");
    var nodeWL = new DOMParser().parseFromString(structWL_1, "text/html");
    var nodeRV = new DOMParser().parseFromString(structRoundViwer, "text/html");
    var nodeR = new DOMParser().parseFromString(structRound_1, "text/html");

    document.getElementById("gameContainer").appendChild(nodeName.getElementsByTagName("body")[0].firstChild);
    document.getElementById("gameContainer").appendChild(nodeWL.getElementsByTagName("body")[0].firstChild);
    document.getElementById("gameContainer").appendChild(nodeRV.getElementsByTagName("body")[0].firstChild);
    document.getElementById("answers").appendChild(nodeR.getElementsByTagName("body")[0].firstChild);
}