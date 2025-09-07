let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const action  = ['-', '+', 'x', '/'];
const out = document.querySelector('.screen p')

function clearAll(){
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}
function deleteLast(){
    if(sign === ''){
        if(a!== ''){
            a = a.slice(0, -1);
            out.textContent = a === '' ? '0' : a;
        }
    }else{
        if(b !==''){
            b = b.slice(0, -1);
            out.textContent = b === '' ? '0' : b;
        } else{
            sign = '';
            out.textContent = a === '' ? '0' : a;
        }
    }
}
function oppositeSign() {
    if (sign === '') {
        if (a !== '') {
            a = (-a).toString();
            out.textContent = a || 0;
        }
    } else {
        if (b !== '') {
            b = (-b).toString();
            out.textContent = b || 0;
        }
    }
}
document.querySelector('.delete').onclick = (e) =>{
    deleteLast();
    e.stopPropagation();
    // console.log('hello')
}
document.querySelector('.minus-plus').onclick = oppositeSign;
document.querySelector('.ac').onclick = clearAll;
document.querySelector('.buttons').onclick = (event)=>{
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('ac')) return;
    if(event.target.classList.contains('minus-plus')) return;
    if(event.target.classList.contains('delete')) return;

    out.textContent = '';
    const key = event.target.textContent;
    if(digit.includes(key)){
        if (b==='' && sign===''){
            a+= key;
            out.textContent = a;
        }
        else if(a!=='' && b!=='' && finish){
            b = key;
            finish = false;
            out.textContent = b;
        }
        else{
            b += key;
            out.textContent = b;
        }
        console.log(a, sign, b);
        return;
    }
    if(action.includes(key)){
        sign = key;
        out.textContent = sign;
        console.log(a, sign, b);
        return;
    }

    if(key === '='){
        if(b === '') b = a;
        switch(sign){
            case '+':
                a = ((+a) + (+b));
                break;
            case '-':
                a = a - b;
                break;
            case 'x':
                a = a * b;
                break;
            case '/':
                if(b === '0'){
                    out.textContent = "error"
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;
        out.textContent = a;
        console.log()
    }
}