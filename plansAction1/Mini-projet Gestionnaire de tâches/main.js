document.forms["ajouter"].addEventListener("submit", (event) => {
    event.preventDefault();
    let form = event.target;
    let objtach = {
        name: form.name.value,
        description: form.description.value,
        situation: "non terminer"
    }
    ajoutertachDansList(objtach);

})
function ajoutertachDansList(objtach) {
    document.forms["ajouter"].reset();
    let listT = JSON.parse(localStorage.getItem("infosStash"));
    if (listT == null) {
        listT = [];
    }
    listT.push(objtach);
    setDansLocalstorege(listT);


}
function setDansLocalstorege(listT) {
    localStorage.setItem('infosStash', JSON.stringify(listT));
    checkLocalestorege();
}
checkLocalestorege();
function checkLocalestorege() {
    let list = JSON.parse(localStorage.getItem('infosStash'));
    if (list != null) {
        affichagedesStach(list);
        callbacksupprimer()
        callbackmodefier()
        colorerParDOM()
    }
}
function affichagedesStach(list) {
    let zone = document.getElementById("zoneAjouter");
    zone.innerHTML = "";
    list.forEach((element, index) => {
        zone.innerHTML += ` <div class="flex justify-between">
                    <div class="content flex gap-2 justify-center items-center">
                        <form ><input type="checkBox" onclick="validate(${index})" class="mycheckbox h-4 w-4 border-2"></form>
                        <h2>${element.name}</h2>
                        <h3 class="text-gray-500 text-sm ">${element.description}</h3>
                    </div>
                    <div class="flex gap-2">
                        <button id="${index}" class="modefier"><i class="fa-regular fa-pen-to-square" style="color: #2ced76;"></i></button>
                        <button id="${index}" class="supprimer"><i class="fa-solid fa-trash-can" style="color: #e64500;"></i></button>
                    </div>
                </div>`
    });
}
callbacksupprimer()
function callbacksupprimer() {
    document.querySelectorAll(".supprimer").forEach(suprission => {
        suprission.addEventListener("click", (event) => {
            let indexStach = event.currentTarget.getAttribute("id");
            // console.log(indexStach);
            suprissionElement(indexStach);

        })
    })
}

function suprissionElement(id) {
    if (newname.value != "" || newdesc.value != "") {
        return;
    }
    let list = JSON.parse(localStorage.getItem('infosStash'));
    // console.log(list);
    list.splice(id, 1);
    // console.log(list);
    setDansLocalstorege(list);
}
callbackmodefier()
function callbackmodefier() {
    document.querySelectorAll(".modefier").forEach(suprission => {
        suprission.addEventListener("click", (event) => {
            let indexStach = event.currentTarget.getAttribute("id");
            // console.log(indexStach);
            modefierElement(indexStach);

        })
    })
}
let newname = document.getElementById("name");
let newdesc = document.getElementById("description");
function modefierElement(id) {
    let list = JSON.parse(localStorage.getItem('infosStash'));
    // console.log(list);
    let elementStach = list[id];


    if (newname.value == "" || newdesc.value == "") {
        newname.value = elementStach.name;
        console.log(newname);
        newdesc.value = elementStach.description;
    } else {
        return;
    }
    list.splice(id, 1);
    // console.log(list);
    setDansLocalstorege(list);
}

function validate(id) {
    let list = JSON.parse(localStorage.getItem('infosStash'));
    var mycheckbox = document.querySelectorAll(".mycheckbox");
    console.log(id);
 console.log(mycheckbox[id]);
    if (mycheckbox[id].checked) {
        list[id].situation = "terminer";   
    }else{
         
        list[id].situation = "non terminer";
    }
    localStorage.setItem('infosStash',JSON.stringify(list));
}

let toutes=document.getElementById("toutes");
toutes.addEventListener("click",function(){
toutes.style.backgroundColor="blue";
termine.style.backgroundColor="LightGray";
nonterminer.style.backgroundColor="LightGray";
let listToutes=JSON.parse(localStorage.getItem('infosStash'));
affichagedesStach(listToutes);
})
let nonterminer=document.getElementById("nonTreminer");
nonterminer.addEventListener("click",function(){
nonterminer.style.backgroundColor="blue";
toutes.style.backgroundColor="LightGray";
termine.style.backgroundColor="LightGray";
let nonTerminer=JSON.parse(localStorage.getItem('infosStash'));
let listnonterminer=nonTerminer.filter(o=>o.situation==="non terminer");
affichagedesStach(listnonterminer);
})
let termine=document.getElementById("terminer");
termine.addEventListener("click",function(){
termine.style.backgroundColor="blue";
toutes.style.backgroundColor="LightGray";
nonterminer.style.backgroundColor="LightGray";
let terminer=JSON.parse(localStorage.getItem('infosStash'));
let listterminer=terminer.filter(o=>o.situation==="terminer")
affichageee(listterminer);
})
function affichageee(list){
    let zone = document.getElementById("zoneAjouter");
    zone.innerHTML = "";
    list.forEach((element, index) => {
        zone.innerHTML += ` <div class="flex justify-between">
                    <div class="flex gap-2 justify-center items-center">
                        <form ><input type="checkBox" onclick="validate(${index})" class="mycheckbox h-4 w-4 border-2"></form>
                        <h2>${element.name}</h2>
                        <h3 class="text-gray-500 text-sm ">${element.description}</h3>

                    </div>
                </div>`
    })
     colorerParDOM()
}
colorerParDOM()
function colorerParDOM(){
let content = document.querySelectorAll(".content");
content.forEach(child=>{
    let childContent =child.children;
    if(childContent[1].textContent==="111111"){
        child.style.backgroundColor="red"
    }
})}