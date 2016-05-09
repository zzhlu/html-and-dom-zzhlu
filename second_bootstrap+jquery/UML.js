window.onload = function () {
    $('#computeGrade').on('click', function () {
        if ($('#className').val() !== "" &&
            $('#studentNumber').val() !== "" &&
            $('#studentName').val() !== "") {
            $("#score").html("得分：" + computeTotalScore(0));
            alert("提交成功！可以在卷头查看分数了！");
        } else {
            alert("请补全班级、学号、姓名等信息！");
        }
    });
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

function buildFirstActualAnswers(ids) {
    var firstActualAnswers = [];

    ids.forEach(function (id) {
        firstActualAnswers.push($(id).val());
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

function getCheckedElementValue(elements) {
    var optionValue = '';

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            optionValue += elements[i].value;
        }
    }

    return optionValue;
}

function buildOtherActualAnswers(elements) {
    var otherActualAnswers = [];

    elements.forEach(function (element) {
        var elements = $(element);
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