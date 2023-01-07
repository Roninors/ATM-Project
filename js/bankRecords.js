let tb = document.getElementById("myTbody");
let id;
let getId = async () => {
  const res = await fetch("http://localhost:3000/loggedin");
  const data = await res.json();
  id = data[0].id;
  getInfo();
};
let getInfo = async () => {
  let url = `http://localhost:3000/records?recordId=${id}`;
  const res = await fetch(url);
  const data = await res.json();

  data.map((info) => {
    tb.append(showRecords(info));
  });
};

document.addEventListener("DOMContentLoaded", getId());

function showRecords({
  record_type,
  record_date,
  record_balance,
  record_amount,
  record_time,
  id
}) {
  let myTr = document.createElement("tr");
  myTr.innerHTML = `<td>${record_type}</td>
  <td>${record_date}</td>
  <td>${record_time}</td>
  <td  >${record_amount}</td><td >${record_balance}</td>
  <td><button onclick ="printInfo(${id})">Print</button></td>`;
  return myTr;
}

let printInfo = async (id) => {
  let url = `http://localhost:3000/records/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  
  
  var receiptDetails = `
 <h1>Transaction Receipt</h1>
 <h3>Transaction type </h3>
 <p>${data.record_type}</p>
 <h3>Transaction Date and Time</h3>
 <p>${data.record_date}</p>
 <p>${data.record_time}</p>
 <h3 id = "recordType">${data.record_type} Amount</h3>
 <p>₱ ${data.record_amount}</p>
 <h3>Balance</h3>
 <p>₱ ${data.record_balance}</p>
  `
    
  

  let win = window.open();
    self.focus();
    win.document.open();
    win.document.write(receiptDetails)
    win.document.close();
    win.print();
    win.close();
}
