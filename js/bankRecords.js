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

  function showRecords({ record_type,record_date , record_balance, record_amount,record_time}) {
    let myTr = document.createElement("tr");
    myTr.innerHTML = `<td>${record_type}</td>
  <td>${record_date}</td>
  <td>${record_time}</td>
  <td  >${record_amount}</td><td >${record_balance}</td><td>`;
    return myTr;
  }