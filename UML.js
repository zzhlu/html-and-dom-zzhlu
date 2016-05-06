window.onload = function () {
    var grade = document.getElementById("computeGrade");

    grade.onclick = function () {
        if (getElementValueById("className") !== "" &&
            getElementValueById("studentNumber") !== "" &&
            getElementValueById("studentName") !== "") {

            document.getElementById("score").innerHTML = "得分：" + computeTotalScore(0);
        } else {
            alert("请补全班级、学号、姓名等信息！");
        }
    };
};

function computeTotalScore(score) {
    var allAnswers = loadAllAnswers();
    var firstQuestionIds = ["1-1", "1-2-1", "1-2-2", "1-2-3"];
    var firstActualAnswers = buildFirstActualAnswers(firstQuestionIds);
    var firstScore = computeFirstScore(firstActualAnswers, allAnswers, score);

    var otherQuestionNames = ["2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
    var OtherActualAnswers = buildOtherActualAnswers(otherQuestionNames);
    var otherScore = computeOtherScore(OtherActualAnswers, allAnswers, score);

    return firstScore + otherScore;
}

function getElementValueById(id) {
    return document.getElementById(id).value;
}

function buildFirstActualAnswers(ids) {
    var firstActualAnswers = [];

    ids.forEach(function (id) {
        firstActualAnswers.push(getElementValueById(id));
    });

    return firstActualAnswers;
}

function computeFirstScore(firstActualAnswers, allAnswers, score) {
    for (var i = 0; i < firstActualAnswers.length; i++) {
        if (allAnswers[0][i] === firstActualAnswers[i]) {
            score += 5;
        }
    }

    return score;
}

function getElementsByName(name) {
    return document.getElementsByName(name);
}

function getCheckedElementValue(elements) {
    var optionValue = '';

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            optionValue += elements[i].value;
        }
    }

    return optionValue;
}

function buildOtherActualAnswers(names) {
    var otherActualAnswers = [];

    names.forEach(function (name) {
        var elements = getElementsByName(name);
        var optionValue = getCheckedElementValue(elements);
        otherActualAnswers.push(optionValue);
    });

    return otherActualAnswers;
}

function computeOtherScore(otherActualAnswers, allAnswers, score) {
    for (var i = 0; i < otherActualAnswers.length; i++) {
        if (otherActualAnswers[i] === allAnswers[1][i]) {
            score += 10;
        }
    }

    return score;
}

function loadAllAnswers() {
    return [
        ["统一建模语言", "封装性", "继承性", "多态性"],
        ["B", "C", "ABD", "ABC", "false", "true"]
    ];
}