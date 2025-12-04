const dataContent = document.getElementById("dataContent");

let data = [
    {
        id: 1,
        firstname: "Tayeb",
        lastname: "SOUINI",
        email: "Tayeb@gmail.com"
    }
]


function afficherData(list) {

    console.log(list);
    console.log("*****");



    dataContent.innerHTML = ""
    list.forEach(oneItem => {


        dataContent.innerHTML += ` 
        <tr>
                    <th scope="row">${oneItem.firstname}</th>
                    <td>${oneItem.lastname}</td>
                    <td>${oneItem.email}</td>
                    <td>
                        <button id="${oneItem.id}" class="btn btn-danger">Delete</button>
                        <button id="${oneItem.id}" class="btn btn-info">Update</button>
                    </td>
                </tr>`
    });
    deleteCall()
}

let count = 1;
document.forms["ajouter"].addEventListener("submit", (event) => {
    event.preventDefault();
    let form = event.target;
    count++;
    let objtab = {
        id: count,
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        email: form.email.value
    }
    setDansData(objtab);

})
function setDansData(object) {
    if(contor>0){
     newelement=object;
     contor=0;
    }else{
    document.forms["ajouter"].reset();
    data.push(object);
    // console.log(data);
    afficherData(data);
    }
    
}

function deleteCall() {
    let allBTNdelete = document.querySelectorAll(".btn-danger");
    allBTNdelete.forEach(element => {
        element.addEventListener("click", (event) => {
            console.log("entrer");

            let idclicked = event.currentTarget.getAttribute("id")
            deleteelement(idclicked);

        })
    })
}

function deleteelement(idclicked){
    data.splice(idclicked,1);
    afficherData(data);
}
let contor=0;
let newelement={};
function modifierCall() {
    let allBTNdelete = document.querySelectorAll(".btn-info");
    allBTNdelete.forEach(element => {
        element.addEventListener("click", (event) => {
            contor++;
            let idclicked = event.currentTarget.getAttribute("id")
            modifierelement(idclicked);

        })
    })
}

function  modifierelement(idclicked){
    data.splice(idclicked,1);
    data.splice(idclicked,0,newelement);
    afficherData(data);
}
afficherData(data);































// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

document.querySelector(".btn-outline-success").addEventListener("click",function(){
    let contenueinpute=document.getElementById("input-serche");
    console.log(contenueinpute.value);   
    let list=data.filter(o=>o.firstname===contenueinpute.value);
    console.log(list);
    
})