window.players = [];
let playerAnswer = false;
let resultTable = null;
let randomVictim = false;
let result = false;
let data =  {'data': window.players, 'result': result}

function submitPlayerNumber() {
    const $form = document.getElementById('startForm');
    const $number = $form['playerNumber'];
    $number.classList.remove('is-invalid');

    if ($number.value < 2 || $number.value > 50){
        $number.classList.remove('is-valid'); 
        $number.classList.add('is-invalid');
    } else {
        $number.classList.add('is-valid');
        let count = initPlayers($number.value)
        showGameScreen()
    }

    return false;
}

function initPlayers(count) {
    console.log(`test ${count}`);
    for (let i = 0; i < Number(count); i++) {
        window.players[i] = {'team':i + 1,'power':100, 'good':2, 'bad':2};
    }
    console.log(window.players);
}

 function showGameScreen() {
    startForm = document.getElementById('startForm');
    startForm.classList.remove('visible');
    startForm.classList.add('invisible');
    huntersValue();
    data.data = window.players;
    data.result = false;
    resultTable = window.open('./Table.html', 'result');
    setTimeout(() => {
        message(false);
    }, 1000);
 }

 function huntersValue(){ 
    hunterSelect = document.getElementById('selectHunter');
    let alivePlayers = 0
    window.players.forEach((value, index) => {
        if  (value.power > 0) {
            hunterSelect.options[hunterSelect.options.length] = new Option('Команда ' + (index + 1), index);
            alivePlayers += 1;  
        } 
    })
    if (alivePlayers == 0){
        GameOver = document.getElementById('GameOver');
        GameOver.classList.remove('invisible');
        GameOver.classList.add('visible');
    } else {
        game = document.getElementById('Game');
        game.classList.remove('invisible');
        game.classList.add('visible');
        decision = document.getElementById('endOfGame');
        decision.classList.remove('invisible');
        decision.classList.add('visible');
    }
}

function Decision() {
    const hunter = Number(document.getElementById('selectHunter').value) + 1;
    console.log('Вы выбрали '+ hunter);
    answer = document.getElementById('exersises');
    answer.classList.remove('invisible');
    answer.classList.add('visible');
    selectVictim = document.getElementById('rightAnswer');
    selectVictim.classList.add('invisible');
    document.getElementById('hunterAnswer').innerHTML = 'Команда ' + hunter + ' решила задание правильно?';
    falseAnswer = document.getElementById('falseAlert');
    falseAnswer.classList.remove('visible');
    falseAnswer.classList.add('invisible');
    trueAnswer = document.getElementById('trueAlert');
    trueAnswer.classList.remove('visible');
    trueAnswer.classList.add('invisible');
}

function rightAnswer() {
    const hunter = Number(document.getElementById('selectHunter').value);
    victimSelect = document.getElementById('selectVictim')
    window.players.forEach((value, index) => {
        if  (index != hunter) {
            victimSelect.options[victimSelect.options.length] = new Option('Команда ' + (index + 1), index);
        }
    })
    
    playerAnswer = true;
    answer = document.getElementById('exersises');
    answer.classList.remove('visible');
    answer.classList.add('invisible');
    
    selectVictim = document.getElementById('rightAnswer');
    selectVictim.classList.remove('invisible');
    selectVictim.classList.add('visible');
}

function wrongAnswer() {
    playerAnswer = false;
    const hunter = Number(document.getElementById('selectHunter').value); 
    window.players[hunter].power += 1;
    answer = document.getElementById('exersises');
    answer.classList.remove('visible');
    answer.classList.add('invisible');
    endOfPage();
}

function endOfPage() {
    pageEnd = document.getElementById('pageEnd');
    pageEnd.classList.remove('invisible');
    pageEnd.classList.add('visible');
}

function cancelation() {
        document.getElementById('page').reset();
        pageEnd = document.getElementById('pageEnd');
        pageEnd.classList.add('invisible');
        answer = document.getElementById('exersises');
        answer.classList.add('invisible');
        selector = document.getElementById('rightAnswer');
        selector.classList.add('invisible');
        document.getElementById('selectVictim').value = '';
        document.getElementById('selectVictim').options.length=1;
}

function next() {
    const hunter = Number(document.getElementById('selectHunter').value);
    let victim = Number(document.getElementById('selectVictim').value);
    while (window.players[victim].power <= 0) {
        victim = Math.floor(Math.random() * (Number(window.players.length)-1) + 0.5);
        randomVictim = true;
    }
    let damage = 0;

    if (playerAnswer == true) {
        window.players[hunter].good++;
        window.players[hunter].power += 10;
    } else {
        window.players[hunter].bad++;
    }
    
    all = window.players[hunter].bad + window.players[hunter].good;
    chance = Math.floor(Math.random() * all) + 0.5;
    if (chance > window.players[hunter].bad - 1 && playerAnswer == true) {
        if (window.players[hunter].power >= 15) {
            damage = Math.floor(Number(window.players[hunter].power / 5));
            window.players[victim].power -= damage;
        } else {
            damage = 5;
            window.players[victim].power -= damage;
        }
        if (window.players[victim].power <= 0) {
            window.players[victim].power = 0
        }
        if (randomVictim == false){
            document.getElementById('trueAlert').innerHTML = 'Команда ' + (hunter + 1) + ' попала в жертву с силой ' + damage;
        } else {
            document.getElementById('trueAlert').innerHTML = 'Выбранная жертва мертва, поэтому жертвой стала команда ' + (victim +1)
            randomVictim = false
        }
        trueAnswer = document.getElementById('trueAlert');
        trueAnswer.classList.remove('invisible');
        trueAnswer.classList.add('visible');
    } else {
        document.getElementById('falseAlert').innerHTML = 'Команда ' + (hunter + 1) + ' промазала';
        falseAnswer = document.getElementById('falseAlert');
        falseAnswer.classList.remove('invisible');
        falseAnswer.classList.add('visible');
    }
    
    console.log(window.players);
    pageEnd = document.getElementById('pageEnd');
    pageEnd.classList.add('invisible');
    answer = document.getElementById('exersises');
    answer.classList.add('invisible');
    selector = document.getElementById('rightAnswer');
    selector.classList.add('invisible');
    document.getElementById('selectHunter').value = '';
    document.getElementById('selectHunter').options.length=1;
    document.getElementById('selectVictim').value = '';
    document.getElementById('selectVictim').options.length=1;
    message(false);
    huntersValue();
}

function endOfGame() {
    let decision = confirm('Уверены, что хотите закончить игру?');
    if (decision == true) {
        message(true);
        theEnd = document.getElementById('theEnd');
        theEnd.classList.remove('invisible');
        theEnd.classList.add('visible');
        decision = document.getElementById('endOfGame');
        decision.classList.remove('visible');
        decision.classList.add('invisible');
        falseAnswer = document.getElementById('falseAlert');
        falseAnswer.classList.remove('visible');
        falseAnswer.classList.add('invisible');
        trueAnswer = document.getElementById('trueAlert');
        trueAnswer.classList.remove('visible');
        trueAnswer.classList.add('invisible');
        button = document.getElementById('nextGame');
        button.classList.remove('invisible');
        button.classList.add('visible');
        game = document.getElementById('Game');
        game.classList.remove('visible');
        game.classList.add('invisible');
    }
}

function compare(val1, val2) {
    if (val1.power < val2.power) {
        return 1;
    } 
    if (val1.power > val2.power) {
        return -1;
    }
    return 0;
}

function nextGame() {
    theEnd = document.getElementById('theEnd');
    theEnd.classList.remove('visible');
    theEnd.classList.add('invisible');
    startGame = document.getElementById('startForm');
    startGame.classList.remove('invisible');
    startGame.classList.add('visible');
    game = document.getElementById('Game');
    game.classList.remove('visible');
    game.classList.add('invisible');
    button = document.getElementById('nextGame');
    button.classList.remove('visible');
    button.classList.add('invisible');
    window.players = [];
    playerAnswer = false;
    resultTable = null;
    randomVictim = false;
    document.getElementById('selectHunter').value = '';
    document.getElementById('selectHunter').options.length=1;
    document.getElementById('selectVictim').value = '';
    document.getElementById('selectVictim').options.length=1;

}

function message(result) {
    if (result == false) {
        resultTable.postMessage(JSON.stringify(data), "*");
    } else {
        data.result = true;
        const clonedArray = Array.from(window.players);
        clonedArray.sort(compare);
        console.log(clonedArray);
        data.data = clonedArray;
        resultTable.postMessage(JSON.stringify(data), "*");        
    }
}

function table() {
    resultTable = window.open('./Table.html', 'result');
    setTimeout(() => {
        message(false);
    }, 1000);
}