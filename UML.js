window.onload = function () {
    
    var grade = document.getElementById("grade");

    grade.onclick = function () {
        if (document.getElementById("stuClass").value !== "" && document.getElementById("stuId").value !== "" && document.getElementById("stuName").value !== "") {
            document.getElementById("score").innerHTML = "得分：" + getScore(0);
        } else {
            alert("请补全班级、学号、姓名等信息！");
        }
    };
};

function getElementValueById(id) {

    return document.getElementById(id).value;
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

function getScore(score) {

    if (getElementValueById("1-1") === "统一建模语言") {
        score += 5;
    }
    if (getElementValueById("1-2-1") === "封装性") {
        score += 5;
    }
    if (getElementValueById("1-2-2") === "继承性") {
        score += 5;
    }
    if (getElementValueById("1-2-3") === "多态性") {
        score += 5;
    }
    if (getCheckedElementValue(getElementsByName("2-1")) === "B") {
        score += 10;
    }
    if (getCheckedElementValue(getElementsByName("2-2")) === "C") {
        score += 10;
    }
    if (getCheckedElementValue(getElementsByName("3-1")) === "ABD") {
        score += 10;
    }
    if (getCheckedElementValue(getElementsByName("3-2")) === "ABC") {
        score += 10;
    }
    if (getCheckedElementValue(getElementsByName("4-1")) === "false") {
        score += 10;
    }
    if (getCheckedElementValue(getElementsByName("4-2")) === "true") {
        score += 10;
    }
    if (getElementValueById("5-1") === "模型是对现实世界的简化和抽象,模型是对所研究的系统、过程、事物或概念的一种表达形式。可以是物理实体;可以是某种图形;或者是一种数学表达式。") {
        score += 20;
    }

    return score;
}