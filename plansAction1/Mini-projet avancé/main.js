let sectionJoueurs = document.getElementById("joueur-football");
let sectionPanier = document.getElementById("panier-economer");
let sectionContact = document.getElementById("contacts");
document.getElementById("divJoueurFootball").addEventListener("click", function () {
    sectionJoueurs.classList.replace("hidden", "grid");
    sectionPanier.classList.replace("grid", "hidden");
    sectionContact.classList.replace("grid", "hidden");
})
document.getElementById("divPanier").addEventListener("click", function () {
    sectionPanier.classList.replace("hidden", "grid");
    sectionJoueurs.classList.replace("grid", "hidden");
    sectionContact.classList.replace("grid", "hidden");
})
document.getElementById("divContact").addEventListener("click", function () {
    sectionContact.classList.replace("hidden", "grid");
    sectionJoueurs.classList.replace("grid", "hidden");
    sectionPanier.classList.replace("grid", "hidden");
})
let urlpicture = document.getElementById("urlphoto");
let photos = document.getElementById("iimg-staff");
urlpicture.addEventListener("input", function () {
    photos.classList.add(`bg-[url(${urlpicture.value})]`);
});
let count = 0;
let joueurmdf = {};
document.forms["ajouter"].addEventListener("submit", (event) => {
    event.preventDefault();
    let form = event.target;
    let objJoueur = {
        urlphoto: urlpicture.value.trim(),
        firstname: form.firstname.value.trim(),
        lastname: form.lastname.value.trim(),
        Number: form.numberT.value.trim(),
        age: form.age.value.trim(),
        poste: form.poste.value.trim()
    }
    //  console.log(objJoueur);
    joueurmdf = objJoueur;
    ajouterAuTableaux(objJoueur);
})

function ajouterAuTableaux(Joueur) {
    if (count > 0) {
        changerContenue(Joueur);
        document.forms["ajouter"].reset();

    } else {
        document.forms["ajouter"].reset();
        let tabjoueurs = JSON.parse(localStorage.getItem('infosJoueurs'));
        if (tabjoueurs == null) {
            tabjoueurs = [];
        }

        tabjoueurs.push(Joueur);
        setItemLocaleStorege(tabjoueurs);
    }
}
function setItemLocaleStorege(listJoueur) {
    localStorage.setItem('infosJoueurs', JSON.stringify(listJoueur));
    checkLocaleStorege();
}
function checkLocaleStorege() {
    let list = JSON.parse(localStorage.getItem('infosJoueurs'));
    if (list != null) {
        affichagesJOUEURS(list);
        callbacksupprimer();
        modifierinfosJ();
        choiser();
    }
}
checkLocaleStorege()
function affichagesJOUEURS(list) {
    let spaceJOUEUR = document.getElementById("players-table");
    spaceJOUEUR.innerHTML = "";
    list.forEach((element, index) => {
        spaceJOUEUR.innerHTML += `<tr>
                <td class="border text-center">${element.Number}</td>
                <td class="border text-center">${element.firstname}</td>
                <td class="border text-center">${element.lastname}</td>
                <td class="border text-center">${element.age}ans</td>
                <td class="border text-center">
                    <div class=" bg-yellow-600 rounded-xl text-white font-bold m-1">${element.poste}</div>
                </td>
                <td class="border-t flex justify-center gap-4 text-center"><button command="show-modal" commandfor="dialog"
                      id="${index}"  class="modifier hover:shadow-lime-500 hover:shadow"><i class="fa-regular fa-pen-to-square"
                            style="color: #19e657;"></i></button><button id="${index}"  class="supprimer hover:shadow-red-500 hover:shadow"><i
                            class="fa-solid fa-trash-can" style="color: #fb5b5b;"></i> </button></td>
            </tr>`
    });
}

callbacksupprimer()
function callbacksupprimer() {
    document.querySelectorAll(".supprimer").forEach(suprission => {
        suprission.addEventListener("click", (event) => {
            let indexjoueur = event.currentTarget.getAttribute("id");
            // console.log(indexStach);
            suprissionElement(indexjoueur);

        })
    })
}
function suprissionElement(id) {
    let list = JSON.parse(localStorage.getItem('infosJoueurs'));
    list.splice(id, 1);
    setItemLocaleStorege(list);
}
modifierinfosJ()
function modifierinfosJ() {
    document.querySelectorAll(".modifier").forEach(element => {
        element.addEventListener("click", (event) => {
            let indxID = event.currentTarget.getAttribute("id");
            modifierinfosJoueur(indxID);
        })
    })
}

document.getElementById("ajouter-joueursTabl").addEventListener("click", function () {
    count = 0;
})

let indexclicked;
function modifierinfosJoueur(id) {
    count++;
    indexclicked = id;
    let list = JSON.parse(localStorage.getItem('infosJoueurs'));
    let joueur = list[id];
    let firstnameold = document.getElementById("firstname");
    let lastnameold = document.getElementById("lastname");
    let Numberold = document.getElementById("numberT");
    let ageold = document.getElementById("age");
    let posteold = document.getElementById("poste");
    urlpicture.value = joueur.urlphoto;
    firstnameold.value = joueur.firstname;
    lastnameold.value = joueur.lastname;
    Numberold.value = joueur.Number;
    ageold.value = joueur.age;
    posteold.value = joueur.poste;
}

function changerContenue(joueur) {
    let list = JSON.parse(localStorage.getItem('infosJoueurs'));
    list.splice(indexclicked, 1);
    list.splice(indexclicked, 0, joueur)
    console.log("!!!!!!!!!!!!");
    console.log(list);
    console.log("*********");
    setItemLocaleStorege(list);
}

function choiser() {
    let list = JSON.parse(localStorage.getItem('infosJoueurs'));

    const selectElement = document.getElementById("selections");
    selectElement.addEventListener("change", function () {
        let optionchoiser = this.value;
        if (optionchoiser === "All") {
            affichagesJOUEURS(list)
        }
        if (optionchoiser === "Gardien") {
            let lest = list.filter(o => o.poste === "Gardien" || o.poste === "gardien")
            affichagesJOUEURS(lest)
        }
        if (optionchoiser === "Deffenseur") {
            let lest = list.filter(o => o.poste === "Deffenseur" || o.poste === "deffenseur")
            affichagesJOUEURS(lest)
        }
        if (optionchoiser === "Milieu") {
            let lest = list.filter(o => o.poste === "Milieu" || o.poste === "milieu")
            affichagesJOUEURS(lest)
        }
        if (optionchoiser === "Attaquant") {
            let lest = list.filter(o => o.poste === "Attaquant" || o.poste === "attaquant")
            affichagesJOUEURS(lest)
        }
    })
}

let tabPanier = [
    {
        "urlImage": "images/tablit.jpg",
        "nameProdact": "MacBook Pro 16",
        "prix": 2499
    },
    {
        "urlImage": "images/tablt.jpg",
        "nameProdact": "Iphon Pro 16",
        "prix": 3000
    },
    {
        "urlImage": "images/kyes.jpg",
        "nameProdact": "clavier Pro",
        "prix": 420
    },
    {
        "urlImage": "images/airpods.jpeg",
        "nameProdact": "AIRpods pro",
        "prix": 1400
    }
]
let countor = 0;
let a = 0, b = 0, c = 0, d = 0;
function ajouterAcaisse(id) {
    countor++;
    console.log(countor);
    if (id == 0) {
        a++;
        if (a < 2) {
            let element = tabPanier[id]
            console.log(element);
            setDansTableau(element);
        }
    }
    if (id == 1) {
        b++;
        if (b < 2) {
            let element = tabPanier[id]
            console.log(element);
            setDansTableau(element);
        }
    }
    if (id == 2) {
        c++;
        if (c < 2) {
            let element = tabPanier[id]
            console.log(element);
            setDansTableau(element);
        }
    }
    if (id == 3) {
        d++;
        if (d < 2) {
            let element = tabPanier[id]
            console.log(element);
            setDansTableau(element);
        }
    }
}
function setDansTableau(elmnt) {
    let listPanier = JSON.parse(localStorage.getItem('infosPanier'));
    if (listPanier == null) {
        listPanier = [];
    }
    listPanier.push(elmnt);
    setDANSLocalzStoregePanier(listPanier);
}

function setDANSLocalzStoregePanier(listPanier) {
    localStorage.setItem('infosPanier', JSON.stringify(listPanier));
    checkLocaleStoregePanier()
}
checkLocaleStoregePanier()
function checkLocaleStoregePanier() {
    let listPanier = JSON.parse(localStorage.getItem('infosPanier'));
    affichagePanierAcheter(listPanier);
}



function affichagePanierAcheter(list) {

    let spaceBay = document.getElementById("espace-bayed");
    spaceBay.innerHTML = "";
    console.log(list);

    if (list == null) {
        spaceBay.innerHTML = `<div class="grid justify-center items-center h-50">
                    <div class="grid items-center justify-center">
                        <i class="fa-solid fa-cart-shopping fa-3x" style="color: #b2b5b9;"></i>
                        <p class="text-gray-400">Votre panier est vide</p>
                    </div>

                </div> `;

    } else {
        document.getElementById("calculeSUM").classList.replace("hidden", "flex")
        spaceBay.innerHTML = "";

        list.forEach(element => {
            spaceBay.innerHTML += `<div class="flex p-2 border rounded-md bg-blue-50 justify-evenly items-center">
                    <div class="h-20 w-20 rounded-md bg-cover bg-[url(${element.urlImage})]"></div>
                    <form action="">
                    <label >Quantité: </label>
                    <input type="number"  min="1" max="9" value="1"  class="bg-gray-200 w-10 rounded-md numberPRD"></form>
                    <div class="grid">
                        <h2 class="font-bold">${element.nameProdact}</h2>
                        <h3 class="font-mono">${element.prix}£</h3>
                    </div>
                </div>`;
        })
    }
}

document.getElementById("seeTotal").addEventListener("click", function () {
    let listPanier = JSON.parse(localStorage.getItem('infosPanier'));
    console.log("!ùùùùùùùùùùùù************");
    let inputsQUantite = document.querySelectorAll(".numberPRD");
    inputsQUantite.forEach((element, index) => {
        listPanier[index].prix *= element.value;
    })
console.log("testabaah");
let somePrix = listPanier.reduce((A, Z) => {
    return A + Z.prix;
}, 0)
document.getElementById("prixtotalproduits").textContent=somePrix+"£";
})
document.getElementById("baynow").addEventListener("click",function(){
    localStorage.removeItem('infosPanier');
    checkLocaleStoregePanier()
        document.getElementById("calculeSUM").classList.replace("flex", "hidden")

})