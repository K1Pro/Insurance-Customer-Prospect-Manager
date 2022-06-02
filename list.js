'use strict';
const ContactsURL = 'http://192.168.54.22:4000/contacts';
const contactList = document.getElementById('contactList');
// prettier-ignore
const contactListHeaders = document.getElementById('contactListHeaders').querySelectorAll('*');
const createContactButton = document.getElementById('createContactButton');
// prettier-ignore
let tr, th, comparison, buttonCheck, inputCheck, column;
let alternate = 0;
// Example: FirstName = document.getElementById('FirstName').addEventListener('change, function(e){...});
for (let rep = 0; rep < contactListHeaders.length; rep++) {
  let contactListHeadersIDs = contactListHeaders[rep].id;
  buttonCheck = document.getElementById(`${contactListHeadersIDs}`);
  if (contactListHeadersIDs) {
    if (buttonCheck.tagName == 'BUTTON') {
      document
        .getElementById(`${contactListHeadersIDs}`)
        .addEventListener('click', () => {
          // console.log(contactListHeadersIDs);
          contactList.innerHTML = '';
          comparison = this.id;
          getJSON(ContactsURL).then((data) => {
            // console.log(contactListHeadersIDs);
            alternate++;

            if (alternate % 2) {
              // prettier-ignore
              data.sort((a, b) => a[contactListHeadersIDs]?.localeCompare(b[contactListHeadersIDs]));
            } else {
              // prettier-ignore
              data.sort((a, b) => b[contactListHeadersIDs]?.localeCompare(a[contactListHeadersIDs]));
            }
            // console.log(data);
            data.forEach((contactInfo) => {
              populateTable(contactInfo);
            });
          });
        });
    }
  }
}

for (let rep = 0; rep < contactListHeaders.length; rep++) {
  let contactListHeadersIDs = contactListHeaders[rep].id;
  buttonCheck = document.getElementById(`${contactListHeadersIDs}`);
  if (contactListHeadersIDs) {
    if (buttonCheck.tagName == 'INPUT') {
      document
        .getElementById(`${contactListHeadersIDs}`)
        .addEventListener('focusin', function (e) {
          getJSON(ContactsURL).then((data) => {
            // this.addEventListener('keyup', function (e) {
            // console.log(data);
            ['keyup', 'change'].forEach((ev) =>
              this.addEventListener(ev, function (e) {
                search(data, e);
              })
            );
          });
        });
    }
  }
}

// Connecting to Database and Retrieving Data with Async / Await;
async function getJSON(url, errorMsg = 'Something went wrong') {
  try {
    const response = await fetch(url);
    const contactData = await response.json();
    return contactData;
  } catch (error) {
    console.log(errorMsg);
  }
}

function search(JsonDB, e) {
  if (
    // e.key !== 'Backspace' &&
    e.key !== 'Shift' &&
    e.key !== 'CapsLock' &&
    e.key !== 'Control' &&
    e.key !== 'Alt'
  ) {
    contactList.innerHTML = '';
    let filteredData = JsonDB.filter(
      (userData) =>
        // prettier-ignore
        userData.FirstName?.toLowerCase().slice(0,document.getElementById(`filterFirstName`).value.length) == document.getElementById(`filterFirstName`).value.toLowerCase() &&
        userData.LastName?.toLowerCase().slice(0,document.getElementById(`filterLastName`).value.length) == document.getElementById(`filterLastName`).value.toLowerCase() &&
        userData.Address?.toLowerCase().slice(0,document.getElementById(`filterAddress`).value.length) == document.getElementById(`filterAddress`).value.toLowerCase() &&
      // userData.Address2?.toLowerCase().slice(0,document.getElementById(`filterAddress2`).value.length) == document.getElementById(`filterAddress2`).value.toLowerCase() &&
        userData.City?.toLowerCase().slice(0,document.getElementById(`filterCity`).value.length) == document.getElementById(`filterCity`).value.toLowerCase() &&
        userData.State?.toLowerCase().slice(0,document.getElementById(`filterState`).value.length) == document.getElementById(`filterState`).value.toLowerCase() &&
        userData.Zip?.toLowerCase().slice(0,document.getElementById(`filterZip`).value.length) == document.getElementById(`filterZip`).value.toLowerCase() &&
        userData.Phone?.toLowerCase().slice(0,document.getElementById(`filterPhone`).value.length) == document.getElementById(`filterPhone`).value.toLowerCase() &&
        userData.Status?.toLowerCase().slice(0,document.getElementById(`filterStatus`).value.length) == document.getElementById(`filterStatus`).value.toLowerCase() &&
        userData.Source?.toLowerCase().slice(0,document.getElementById(`filterSource`).value.length) == document.getElementById(`filterSource`).value.toLowerCase()
    );

    filteredData.forEach((contactInfo) => {
      populateTable(contactInfo);
    });
    // console.log(filteredData);
  }
}

function populateTable(contactInfo) {
  tr = document.createElement('tr');
  contactList.appendChild(tr);
  th = document.createElement('th');
  th.scope = 'row';
  th.innerHTML = contactInfo.id;
  tr.appendChild(th);

  for (let rep = 0; rep < contactListHeaders.length; rep++) {
    let contactListHeadersIDs = contactListHeaders[rep].id;
    buttonCheck = document.getElementById(`${contactListHeadersIDs}`);
    if (contactListHeadersIDs) {
      if (buttonCheck.tagName == 'BUTTON') {
        column = buttonCheck.id;

        window['td' + column] = document.createElement('td');
        window['td' + column].innerHTML = contactInfo[column]
          ? contactInfo[column]
          : '';
        tr.appendChild(window['td' + column]);
      }
    }
  }
}

getJSON(ContactsURL).then((data) => {
  data.forEach((contactInfo) => {
    populateTable(contactInfo);
  });
});

createContactButton.addEventListener('click', () => {
  console.log('hi');
});
