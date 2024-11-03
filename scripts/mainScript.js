let sum = 0;
let game = document.querySelector(".game");
let numbers = [];
const button = document.getElementById("start");
let select = document.getElementById("Difficulty");
let difficultyName = document.getElementById("difficultyName");
let difficultyCount = document.getElementById("difficultyCount");
let difficultySpeed = document.getElementById("difficultySpeed");
let difficultySpeedSecond = document.getElementById("difficultySpeedSecond");
let SpeedCvalue = document.querySelector(".Speedvalue")
let SpeedRange = document.querySelector(".SpeedRange");
let form2 = document.getElementById("form2");
let alertMissingData = document.getElementById("alMissing");
let Ranswer = document.querySelector(".Ranswer");
let state = false;
let restart = document.getElementById("restart");

document.addEventListener("DOMContentLoaded", function() {
    const h1Element = document.querySelector(".game");
    const button = document.getElementById("start");
    button.addEventListener("click", function() {
        if (select.value == 5) {
            let newValues = [difficultyCount.value, difficultySpeedSecond.value]
            if (newValues[0] == 0 || newValues < 0 || newValues[1] == 0 || newValues[1] < 0) {
                alertMissingData.style.display = "block";
                setTimeout(() => {
                    alertMissingData.classList.add("show")
                }, 100);
                setTimeout(() => {
                    hideAlert();
                }, 5000);
            } else {
                form2.style.display = "none";
                h1Element.style.display = "block";
                button.style.display = "none";
                value = difficultySpeedSecond.value * 1000;
                let count = difficultyCount.value;
                Game(count, value); //count,speed
            }
        } else {
            form2.style.display = "none";
            h1Element.style.display = "block";
            button.style.display = "none";
            Game(difficultyCount.value, value)
        }
    });
});

function choosesign() {
    let sign = ["+", "-"]
    let x = Math.round(Math.round(Math.random()));
    return sign[x]
}

function createGame() {
    let x = Math.round(Math.random() * 100);
    return x;

}
let newItem;
let value = 0; // Speed

function startGame() {
    let s = choosesign();
    let n = createGame();
    newItem = s + " " + n
    game.innerHTML = newItem;
    if (s === "+") {
        numbers.push(n);
    } else {
        numbers.push(n * -1);
    }
}

select.addEventListener("change", function() {
    if (select.value === "5") {
        difficultyName.value = "Custom....";
        difficultyCount.disabled = false;
        SpeedCvalue.style.display = "block";
        SpeedRange.style.display = "none";
        button.disabled = false;
    } else {
        difficultyCount.disabled = true;
        difficultySpeed.disabled = true;
        switch (select.value) {
            case "0":
                difficultyName.value = "....";
                difficultyCount.value = "0";
                difficultySpeed.value = "10";
                value = 0;
                button.disabled = true;
                SpeedCvalue.style.display = "none";
                SpeedRange.style.display = "block";
                break;
            case "1":
                difficultyName.value = "Easy";
                difficultyCount.value = "15";
                difficultySpeed.value = "10";
                value = 2500;
                button.disabled = false;
                SpeedCvalue.style.display = "none";
                SpeedRange.style.display = "block";
                break;
            case "2":
                difficultyName.value = "Medium";
                difficultyCount.value = "25";
                difficultySpeed.value = "50";
                value = 1000;
                button.disabled = false;
                SpeedCvalue.style.display = "none";
                SpeedRange.style.display = "block";
                break;
            case "3":
                difficultyName.value = "Hard";
                difficultyCount.value = "35";
                difficultySpeed.value = "70";
                value = 800;
                button.disabled = false;
                SpeedCvalue.style.display = "none";
                SpeedRange.style.display = "block";
                break;
            case "4":
                difficultyName.value = "Expert";
                difficultyCount.value = "50";
                difficultySpeed.value = "100";
                value = 500;
                button.disabled = false;
                SpeedCvalue.style.display = "none";
                SpeedRange.style.display = "block";
                break;
        }
    }
});

//-----------------------------------------------------------------------------------------------

function Game(count, speed) {
    const iId = setInterval(() => {
        startGame()
        if (numbers.length == count) {
            clearInterval(iId);
            for (let i = 0; i < numbers.length; i++) {
                sum += numbers[i];
            }
            console.log(sum);
            endgame();
        }
    }, speed);
}

function checkWin(answer) {
    if (answer == sum) {
        state = true;
    } else {
        state = false;
    }
    alerts(state);
}

const Sanswer = document.querySelector(".Sanswer"); // FOR ANSWER
const check = document.getElementById("check")

function endgame() {
    setTimeout(() => {
        Sanswer.style.display = "block";
        document.getElementById("form1").style.display = "none";
        document.getElementById("se2").style.height = "100vh";
    }, value)
    check.addEventListener("click", () => {
        let StuAnswer = document.getElementById("StuAnswer");
        checkWin(StuAnswer.value.trim());
    })
}

let alertCorect = document.getElementById("alertCorect");
let alertWrong = document.getElementById("alertWrong");

function alerts(state) {
    Sanswer.style.display = "none";
    Ranswer.style.display = "block";
    if (state) {
        alertCorect.style.display = "block";
        setTimeout(() => {
            alertCorect.classList.add("show");
        }, 100)
    } else {
        alertWrong.style.display = "block";
        setTimeout(() => {
            alertWrong.classList.add("show");
        }, 100)
    }
    document.getElementById("answer").value = sum;
}

function hideAlert() {
    alertMissingData.classList.remove("show")
    setTimeout(() => {
        alertMissingData.style.display = "none";
    }, 100);
}
restart.addEventListener("click", () => {
    location.reload();
})