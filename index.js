
let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulel=document.getElementById("ul-el");
const inputBtn=document.getElementById("input-btn");

/* the below method is what we have been using till now to display things with respect to clicking buttons
function saveLead(){
  add the onclick="saveLead()" in button in html file
}*/

/* what professionals mostly used is addEventListener

syntax:  inputBtn.addEventListener("click", function() {
    console.log("Button clicked from addEventListener")
}) */
//delete button
// 1. Store the delete button in a deleteBtn variable
// 2. Listen for double clicks on the delete button (google it!)
// 3. When clicked, clear localStorage, myLeads, and the DOM
const deleteBtn=document.getElementById("delete-btn");
const tabBtn= document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if(leadsFromLocalStorage){
  myLeads=leadsFromLocalStorage;
  render(myLeads);
}

//we have made delete button for double clicked
deleteBtn.addEventListener("dblclick",function(){

  localStorage.clear();
  myLeads=[];
  render(myLeads);
})

// const tabs = [
//   {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ]

// tabBtn.addEventListener("click", function(){
//   Save the url instead of logging it out
// localStorage.setItem("myLeads", JSON.stringify(myLeads) )
// render(myLeads)
//   console.log(tabs[0].url)
// })

tabBtn.addEventListener("click", function(){
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  // })
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ //do changes in manifest file also other wise chrome.tabs will not work
      myLeads.push(tabs[0].url) 
      localStorage.setItem("myLeads", JSON.stringify(myLeads) )
      render(myLeads)
  })

  
})

inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value);
  //console.log(myLeads);
  inputEl.value="";

  // Get the leads from the localStorage
// Store it in a variable, leadsFromLocalStorage
// Log out the variable
  localStorage.setItem("myLeads", JSON.stringify(myLeads) )

  render(myLeads);
  console.log( localStorage.getItem("myLeads") )
  
})


function render(leads){

  let listItems = ""
for (let i = 0; i < leads.length; i++) {
    // 2. Add the item to the listItems variable instead of the ulEl.innerHTML
    //can be written as below
    //listItems += "<li><a href='#' target='_blank'>" + myLeads[i] + "</a></li>"
    //refactoring the above line by converting it into template literals
    listItems += `<li>
                     <a target='_blank' href='${leads[i]}'>
                            ${leads[i]}  
                      </a>
                  </li>`
}
// 3. Render the listItems inside the unordered list using ulEl.innerHTML
ulel.innerHTML = listItems

}




