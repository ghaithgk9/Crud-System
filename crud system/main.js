let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("totale");
let submit=document.getElementById("submit"); 
let catagory=document.getElementById("catagory");
let table=document.getElementById("tbody");
let count=document.getElementById("count");
let search=document.getElementById("search");
let mode="create";
let pm;
function getTotal(){
    if(price.value !==""){
        let result= (+price.value+ +ads.value+ +taxes.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='green'
    }else{
        total.innerHTML="";
        total.style.background='rgb(149, 9, 9)'
    }
}

let data;
if(localStorage.product1!=null){
    data=JSON.parse(localStorage.product1)
}else{
    data=[]
};






submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        ads:ads.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        catagory:catagory.value.toLowerCase(),
        count:count.value,
    };
  if(title.value!='' 
    && price.value!=''){
    if(mode==="create"){
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                data.push(newPro);
            }
        } else {
            data.push(newPro);
        }
       
    }else{
        data[pm]=newPro;
        submit.innerHTML="Create";
        count.style.display="block";
        
       }
  
  }else{
    clear()
    
  }
    clear();
    localStorage.setItem("product1",JSON.stringify(data))
    
    showData();



};
function clear(){
        title.value="";
        price.value="";
        ads.value="";
        taxes.value="";
        discount.value="";
        total.innerHTML=""
        total.style.background='rgb(149, 9, 9)'
        catagory.value="";
        count.value="";
};

function showData() {
    let tableContent = ""; 
    for (let i = 0; i < data.length; i++) {
        tableContent += `<tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].catagory}</td>
                    <td><buttons onclick="update(${i})">update</buttons></td>
                    <td><buttons onclick="deleteData(${i})">delete</buttons></td>
                </tr>`;
    }
    document.getElementById("tbody").innerHTML = tableContent;
    let deleteBtn=document.getElementById("deleteAll");
    if(data.length>0){
        deleteBtn.innerHTML=`<button onclick="deleteAll()" >delete all (${data.length})</button>`;
    }else{
        deleteBtn.innerHTML="";
    };
}  
function deleteData(i){
    data.splice(i,1);
    localStorage.product1=JSON.stringify(data);
    showData();
}

showData();

function deleteAll(){
    localStorage.clear();
    data.splice(0);
    showData();
}
function update(i){
    title.value=data[i].title;
    price.value=data[i].price;
    discount.value=data[i].discount;
    ads.value=data[i].ads;
    taxes.value=data[i].taxes;
    getTotal();
    catagory.value=data[i].catagory;
    count.style.display="none";
    submit.innerHTML="Update";
    mode="update";
    pm=i;
    scroll({
        top:0,
        behavior:"smooth",  
    })
   
   
}
let searchMode="title";

function getSearchMode(id){
    if(id=="searchTitle"){
        searchMode="title";
        search.placeholder="Search By Title";
    }else{
        searchMode="catagory";
        search.placeholder="Search By Catagory"
    }
    search.focus();
    search.value="";
    showData()
    
   
}
function searchData(value) {
    let tableContent = ""; 
    if (searchMode === "title") {
        for (let i = 0; i < data.length; i++) {
            if(data[i].title.includes(value.toLowerCase())) {
                tableContent += `<tr>
                <td>${i+1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].catagory}</td>
                <td><buttons onclick="update(${i})">update</buttons></td>
                <td><buttons onclick="deleteData(${i})">delete</buttons></td>
            </tr>`; 
            }
        }
        
    }else{
        for (let i = 0; i < data.length; i++) {
            if(data[i].catagory .includes(value.toLowerCase())) {
                tableContent += `<tr>
                <td>${i+1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].catagory}</td>
                <td><buttons onclick="update(${i})">update</buttons></td>
                <td><buttons onclick="deleteData(${i})">delete</buttons></td>
            </tr>`; 
            }
        }
        

    }
    document.getElementById("tbody").innerHTML = tableContent;
}

