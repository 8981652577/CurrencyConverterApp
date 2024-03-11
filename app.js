let urlBase="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

let dropdowns=document.querySelectorAll(".dropdown select");

let button=document.querySelector("form button");

let fromCurrency=document.querySelector(".from select");
let toCurrency=document.querySelector(".to select");
let msg=document.querySelector(".msg");

for(let select of dropdowns)
{
    for(let code in countryList)
    {
        let newoption=document.createElement("option");
        newoption.value=code;
        newoption.innerText=code;
        if(select.name==="from" && newoption.innerText==="USD")
        {
            newoption.selected="selected";
        }else if(select.name==="to" && newoption.innerText==="INR")
        {
            newoption.selected="selected";
        }
        select.append(newoption);  
    }
   select.addEventListener("change",(evt)=>{
        updateImg(evt.target);
   });
}


const updateImg=(element)=>{

    let newsrc=`https://flagsapi.com/${countryList[element.value]}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
    
}

button.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval=="" || amtval<1)
    {
        amtval=1;
        amount.value="1";
    }


   const url=`${urlBase}${fromCurrency.value.toLowerCase()}.json`;

   let response=await fetch(url);
   let data= await response.json();
   let rate=data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
   
   let total=amtval*rate;
  
   msg.innerText=`${amount.value} ${fromCurrency.value}= ${total} ${toCurrency.value}`;
});
