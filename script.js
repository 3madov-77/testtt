'use strict';

// Dom definations
let inputField = document.getElementsByName('Link')[0] || '';
let warningLabel = document.getElementsByClassName('warning')[0] || '';
let parent = document.getElementById('copyMe') || '';
let linksContainer = document.getElementsByClassName("myLinks")[0] || '';
let picture = document.getElementsByClassName('ill-working')[0] || '';
let shorten = document.getElementById('shorten') || '';

// used variubles
const clipBorad = []

function bMenu() {

    if (linksContainer.style.visibility === "visible") {
      linksContainer.style.visibility = "hidden";
      picture.style.zIndex = '1'

    } else {
        linksContainer.style.visibility = "visible";
        picture.style.zIndex = '-1'
    }
  }



shorten.addEventListener('submit', (e)=>{
    e.preventDefault();
    let input = e.target[0].value;
    if(input){
        fetch(`https://www.shareaholic.com/v2/share/shorten_link?apikey=8943b7fd64cd8b1770ff5affa9a9437b&url=${input}`)
        .then(response => response.json())
          .then(data => {
              if(data.status_code == '200'){
                if(clipBorad.length > 2){
                    clipBorad.shift()
                }
                clipBorad.push({'oldT':input, 'newT':data.data, 'copied': false})
                warning(false)
                render()
              }else{
                warning(true);
              }
          });

    }else{
        warning(true);
    }
})


function warning(bolean){
    if(bolean){
        warningLabel.style.display = 'block'
        inputField.style.border = "3px solid rgb(255, 97, 97)"
        return;
    }
    warningLabel.style.display = 'none'
    inputField.style.border = "none"
}

function create(name){
    return document.createElement(`${name}`)
}

function copyToCliBoard(id) {
    // clicked
    let clicked = document.getElementsByClassName(`copy${id}`)[0]
    clicked.style.backgroundColor = 'rgb(51, 0, 88)';
    clicked.textContent = 'Copied!'
    navigator.clipboard.writeText(clipBorad[id].newT) // copy to clipBoard method..
    clipBorad[id].copied = true;
  }

function render(){
    parent.innerHTML = ''
    clipBorad.forEach((element, id) =>{
        let sClass, text, bClass;
        if(element.copied){
            sClass = 'style="background-color:rgb(51, 0, 88);"';
            text = "Copied!"
        }else{
            text = "Copy"
        }
        screen.width > 769 ? bClass = 'style="margin-left:130px;"' : ''
        let htmlTemplate = `<div class="c-card"><h3>${element.oldT}</h3><div class="LB"></div><h4>${element.newT}</h4><button class="copy${id}" ${sClass} ${bClass} onclick="copyToCliBoard(${id})">${text}</button></div>` 
        // let newCard = create('div');
        // newCard.classList.add('c-card')
        // let oldInput = create('h3');
        // oldInput.textContent = element.oldT;
        // let hr = create('hr')
        // let newLink = create('h4');
        // newLink.textContent = element.newT;
        // let copyButton = create('button');
        // if(element.copied){
        //     copyButton.style.backgroundColor = 'rgb(51, 0, 88)';
        //     copyButton.textContent = 'Copied!'
        // }else{
        //     copyButton.textContent = 'Copy'
        // }
        // copyButton.setAttribute('onClick',`copyToCliBoard(${id})`)
        // copyButton.classList.add(`copy${id}`)
        // // it keep rendering with less margin!!
        // screen.width > 769 ? copyButton.style.marginLeft = '130px' : '';

        // newCard.appendChild(oldInput)
        // newCard.appendChild(hr)
        // newCard.appendChild(newLink)
        // newCard.appendChild(copyButton)
        // parent.appendChild(newCard);
        parent.innerHTML += htmlTemplate;
    })
}
console.log(parent.innerHTML);