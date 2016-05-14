$(document).ready(function () {
    $(".col-md-10").css("background-color", "#e6ffde");
    $("div > h1").css({"background-color": "#9d9d9d", "line-height": "inherit"});

    $("#computeGrade").on("click", function () {
        if ($("#className").val() !== "" && $("#studentNumber").val() !== "" && $("#studentName").val() !== "") {
            alert("可以在卷头查看你的分数了呦！");
            $("#score").html("得分：" + computeTotalScore(0)).css({"color": "red", "font-size": "20px"});
        } else {
            alert("请补全班级、学号、姓名等信息！");
        }
    });
});

function computeTotalScore(score) {
    var allAnswers = loadAllAnswers();
    var firstQuestionIds = ["fill_in_1.1", "fill_in_1.2.1", "fill_in_1.2.2", "fill_in_1.2.3"];
    var firstActualAnswers = buildActualAnswers(firstQuestionIds);
    var firstScore = computeFirstScore(firstActualAnswers, allAnswers, score);

    var otherQuestionNames = ["single_choice_2.1", "single_choice_2.2", "multiple_choice_3.1", "multiple_choice_3.2", "judge_4.1", "judge_4.2"];
    var OtherActualAnswers = buildOtherActualAnswers(otherQuestionNames);
    var otherScore = computeOtherScore(OtherActualAnswers, allAnswers, score);

    var lastQuestionIds = ["short_answer_5.1"];
    var lastActualAnswers = buildActualAnswers(lastQuestionIds);
    var lastScore = computeLastScore(lastActualAnswers, allAnswers, score);

    return firstScore + otherScore + lastScore;
}

function buildActualAnswers(ids) {
    var actualAnswers = [];

    ids.forEach(function (id) {
        var getElementValueById = document.getElementById(id).value;
        actualAnswers.push(getElementValueById);
    });

    return actualAnswers;
}

function computeFirstScore(firstActualAnswers, allAnswers, score) {
    for (var i = 0; i < firstActualAnswers.length; i++) {
        if (allAnswers.firstAnswers[i] === firstActualAnswers[i]) {
            score += 5;
        }
    }

    return score;
}

function computeLastScore(lastActualAnswers, allAnswers, score) {
    for (var i = 0; i < lastActualAnswers.length; i++) {
        if (allAnswers.lastAnswers[i] === lastActualAnswers[i]) {
            score += 20;
        }
    }

    return score;
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
        var elements = document.getElementsByName(name);
        var optionValue = getCheckedElementValue(elements);
        otherActualAnswers.push(optionValue);
    });

    return otherActualAnswers;
}

function computeOtherScore(otherActualAnswers, allAnswers, score) {
    for (var i = 0; i < otherActualAnswers.length; i++) {
        if (allAnswers.otherAnswers[i] === otherActualAnswers[i]) {
            score += 10;
        }
    }

    return score;
}

function loadAllAnswers() {
    return {
        firstAnswers: ["统一建模语言", "封装性", "继承性", "多态性"],
        otherAnswers: ["B", "C", "ABD", "ABC", "false", "true"],
        lastAnswers: ["模型是对现实世界的简化和抽象,模型是对所研究的系统、过程、事物或概念的一种表达形式。可以是物理实体;可以是某种图形;或者是一种数学表达式。"]
    };
}