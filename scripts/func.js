let plusCount = 0, minusCount = 0;

function func(){
    let name = document.querySelector("#text1"), 
    price = document.querySelector("#text2");
    if (name.value == '' || price.value == '')
        return null;
    return [name, price];
}

function check(array, str){
    for (let i = 0; i < array.length; i++){
        if (array[i].join(' ') == str)
            return false
    }
    return true;
}

function checkInt(val){
    const reg = /^[1-9]\d*$/
    if (reg.test(val)) return true;
    return false;
}

function checkInput(first, second){
    if (checkInt(first) == true || checkInt(second) == false)
        return false;
    return true;
}

function clickPlus(elem){ 
    let id = elem.id.substr(4);
    let table = document.querySelector("#basket").childNodes;
    let tempNode = [];
    for (let i = 2; i < table.length; i++){
        tempNode = table[i].childNodes;
        if (tempNode[2].childNodes[1].id == elem.id){
            tempNode[2].innerHTML = parseInt(tempNode[2].innerHTML) + 1;
            tempNode[2].innerHTML += `<input type=\"image\" src=\"images/plus.png\" class=\"plus\" id=\"plus${id}\" onclick=\"clickPlus(this)\">`;
            tempNode[2].innerHTML += `<input type=\"image\" src=\"images/minus.png\" class=\"minus\" id=\"minus${id}\" onclick=\"clickMinus(this)\"></td>`;
            changeSum();
            break;
        }
    }
}

function clickMinus(elem){
    let id = elem.id.substr(4);
    let table = document.querySelector("#basket").childNodes;
    let tempNode = [];
    for (let i = 2; i < table.length; i++){
        tempNode = table[i].childNodes;
        if (tempNode[2].childNodes[2].id == elem.id){
            if (parseInt(tempNode[2].innerHTML) == 1)
                table[i].remove();
            else {
                tempNode[2].innerHTML = parseInt(tempNode[2].innerHTML) - 1;
                tempNode[2].innerHTML += `<input type=\"image\" src=\"images/plus.png\" class=\"plus\" id=\"plus${id}\" onclick=\"clickPlus(this)\">`;
                tempNode[2].innerHTML += `<input type=\"image\" src=\"images/minus.png\" class=\"minus\" id=\"minus${id}\" onclick=\"clickMinus(this)\"></td>`;
            }
            changeSum();
            break;
        }
    }
}

function checkCountInBasket(current, nodes){
    let tempNode = [];
    for (let i = 2; i < nodes.length; i++){
        tempNode = nodes[i].childNodes
        if (current.childNodes[0].innerHTML == tempNode[0].innerHTML && current.childNodes[1].innerHTML == tempNode[1].innerHTML){
            tempNode[2].innerHTML = parseInt(tempNode[2].innerHTML) + 1;
            tempNode[2].innerHTML += `<input type=\"image\" src=\"images/plus.png\" class=\"plus\" id=\"plus${plusCount}\" onclick=\"clickPlus(this)\">`;
            tempNode[2].innerHTML += `<input type=\"image\" src=\"images/minus.png\" class=\"minus\" id=\"minus${minusCount}\" onclick=\"clickMinus(this)\"></td>`;
            return true;
        }
    }   
    return false;
}

function checkCountInBasketOld(current, nodes){
    let tempNode = [];
    for (let i = 2; i < nodes.length; i++){
        tempNode = nodes[i].childNodes
        if (current.childNodes[1].innerHTML == tempNode[0].innerHTML && current.childNodes[3].innerHTML == tempNode[1].innerHTML){
            tempNode[2].innerHTML = parseInt(tempNode[2].innerHTML) + 1;
            tempNode[2].innerHTML += `<input type=\"image\" src=\"images/plus.png\" class=\"plus\" id=\"plus${plusCount}\" onclick=\"clickPlus(this)\">`;
            tempNode[2].innerHTML += `<input type=\"image\" src=\"images/minus.png\" class=\"minus\" id=\"minus${minusCount}\" onclick=\"clickMinus(this)\"></td>`;
            return true;
        }
    }   
    return false;
}

function clickOldRow(elem){
    let table = document.querySelector("#basket");
    if (!checkCountInBasketOld(elem, table.childNodes)){ // table -> [text, object, object, ...]
        let tr = document.createElement("tr");
        let current = "<td>" + elem.childNodes[1].innerHTML + "</td><td>" + elem.childNodes[3].innerHTML + "</td><td>";
        current += 1 + `<input type=\"image\" src=\"images/plus.png\" class=\"plus\" id=\"plus${plusCount++}\" onclick=\"clickPlus(this)\">`;
        current += `<input type=\"image\" src=\"images/minus.png\" class=\"minus\" id=\"minus${minusCount++}\" onclick=\"clickMinus(this)\"></td>`;
        tr.innerHTML = current;
        table.appendChild(tr);
    } 
    changeSum();
}

function clickRow(elem) {
    let table = document.querySelector("#basket");
    if (!checkCountInBasket(elem, table.childNodes)){ // table -> [text, object, object, ...]
        let tr = document.createElement("tr");
        let current = "<td>" + elem.childNodes[0].innerHTML + "</td><td>" + elem.childNodes[1].innerHTML + "</td><td>";
        current += 1 + `<input type=\"image\" src=\"images/plus.png\" class=\"plus\" id=\"plus${plusCount++}\" onclick=\"clickPlus(this)\">`;
        current += `<input type=\"image\" src=\"images/minus.png\" class=\"minus\" id=\"minus${minusCount++}\" onclick=\"clickMinus(this)\"></td>`;
        tr.innerHTML = current;
        table.appendChild(tr);
    } 
    changeSum();
}

function changeSum(){
    let sum = 0,
    // let sum = document.querySelector("#summ"),
    table = document.querySelector("#basket").childNodes,
    tempNode = [];
    for (let i = 2; i < table.length;i++){
        tempNode = table[i].childNodes;
        sum += parseInt(tempNode[1].innerHTML) * parseInt(tempNode[2].innerHTML);
    }
    document.querySelector("#summ").innerHTML = sum;
}
