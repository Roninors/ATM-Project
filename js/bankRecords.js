let tb = document.getElementById("myTbody");
let id;
let getId = async()=>{
    const res = await fetch("http://localhost:3000/loggedin");
    const data = await res.json();
    id = data[0].id
    getInfo()
}
let getInfo = async () => {
    let url = `http://localhost:3000/records?recordId=${id}`
    const res = await fetch(url);
    const data = await res.json();
   
        data.map((info) => {
          tb.append(showRecords(info));
        });
    
  };
  
  document.addEventListener("DOMContentLoaded", getId());

  function showRecords({ record_name,record_accnum , record_balance, recordId}) {
    let myTr = document.createElement("tr");
    myTr.innerHTML = `<td>${record_name}</td>
  <td>${record_accnum}</td>
  <td  >${record_balance}</td><td >${recordId}</td><td>`;
    return myTr;
  }