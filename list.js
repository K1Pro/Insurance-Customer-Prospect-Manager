'use strict';
const ContactsURL = 'http://192.168.54.22:4000/contacts';
const contactList = document.getElementById('contactList');
// prettier-ignore
const contactListHeaders = document.getElementById('contactListHeaders').querySelectorAll('*');
const createContactButton = document.getElementById('createContactButton');
// prettier-ignore
let tr, th, comparison, buttonCheck, inputCheck, column;
let newContact = [];
let alternate = 0;
// Example: FirstName = document.getElementById('FirstName').addEventListener('change, function(e){...});

//sorting buttons
function sortDataBase(data) {
  for (let rep = 0; rep < contactListHeaders.length; rep++) {
    let contactListHeadersIDs = contactListHeaders[rep].id;
    buttonCheck = document.getElementById(`${contactListHeadersIDs}`);
    if (contactListHeadersIDs) {
      if (buttonCheck.tagName == 'BUTTON') {
        document
          .getElementById(`${contactListHeadersIDs}`)
          .addEventListener('click', () => {
            contactList.innerHTML = '';

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
            // });
          });
      }
    }
  }
}

//search buttons
function searchDatabase(data) {
  for (let rep = 0; rep < contactListHeaders.length; rep++) {
    let contactListHeadersIDs = contactListHeaders[rep].id;
    buttonCheck = document.getElementById(`${contactListHeadersIDs}`);
    if (contactListHeadersIDs) {
      if (buttonCheck.tagName == 'INPUT') {
        document
          .getElementById(`${contactListHeadersIDs}`)
          .addEventListener('focusin', function (e) {
            ['keyup', 'change'].forEach((ev) =>
              this.addEventListener(ev, function (e) {
                // console.log(data);
                search(data, e);
              })
            );
          });
      }
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

//populates the table with the data from the database
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
  data.reverse();
  data.forEach((contactInfo) => {
    populateTable(contactInfo);
  });
  searchDatabase(data);
  sortDataBase(data);
});

//creates a new contact
createContactButton.addEventListener('click', () => {
  for (let rep = 0; rep < contactListHeaders.length; rep++) {
    let contactListHeadersIDs = contactListHeaders[rep].id;
    buttonCheck = document.getElementById(`${contactListHeadersIDs}`);
    if (contactListHeadersIDs) {
      if (buttonCheck.tagName == 'INPUT') {
        column = buttonCheck.value ? buttonCheck.value : '';
        newContact.push(column);
      }
    }
  }
  console.log(newContact);
  fetch(ContactsURL, {
    method: 'POST',
    body: JSON.stringify({
      FirstName: newContact[0],
      LastName: newContact[1],
      BirthDate: newContact[2],
      SpouseName: newContact[3],
      SpouseLastName: newContact[4],
      SpouseBirthDate: newContact[5],
      Address: newContact[6],
      Address2: newContact[7],
      City: newContact[8],
      State: newContact[9],
      Zip: newContact[10],
      Phone: newContact[11],
      Email: newContact[12],
      Status: newContact[13],
      Source: newContact[14],
      EHV: newContact[15],
      Car1: newContact[16],
      Car2: newContact[17],
      Car3: newContact[18],
      Car4: newContact[19],
      CreatedBy: 'Bart',
      LastEditDate: '06/02/2020',
      Policy1Type: newContact[21],
      Policy1Number: newContact[22],
      Policy2Type: newContact[23],
      Policy2Number: newContact[24],
      Policy3Type: newContact[25],
      Policy3Number: newContact[26],
      Policy4Type: newContact[27],
      Policy4Number: newContact[28],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      window.location.reload();
    });
});
