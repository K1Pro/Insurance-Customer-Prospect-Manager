'use strict';
const ContactsURL = 'http://192.168.54.22:4000/contacts';
const contactList = document.getElementById('contactList');
// prettier-ignore
const contactListHeaders = document.getElementById('contactListHeaders').querySelectorAll('*');
// prettier-ignore
let tr, th, td, tdFirstName, tdLastName, tdAddress, tdAddress2, tdCity, tdState, tdZip, tdPhone, tdStatus, tdSource, tdLastEditDate, comparison, inputFirstName,  tdInputFirstName, inputLastName, tdInputLastName, inputAddress, tdInputAddress, inputAddress2, tdInputAddress2, inputCity, tdInputCity, inputState, tdInputState, inputZip, tdInputZip, inputPhone, tdInputPhone, inputStatus, tdInputStatus, inputSource, tdInputSource, inputLastEditDate, tdInputLastEditDate, filteredFirstName, TempInputValue;
let alternate = 0;
// Example: FirstName = document.getElementById('FirstName').addEventListener('change, function(e){...});
for (let rep = 0; rep < contactListHeaders.length; rep++) {
  let contactListHeadersIDs = contactListHeaders[rep].id;
  if (contactListHeadersIDs) {
    document
      .getElementById(`${contactListHeadersIDs}`)
      .addEventListener('click', () => {
        console.log(contactListHeadersIDs);
        contactList.innerHTML = '';
        comparison = this.id;
        getJSON(ContactsURL).then((data) => {
          console.log(contactListHeadersIDs);
          alternate++;

          if (alternate % 2) {
            data.sort((a, b) =>
              a[contactListHeadersIDs]?.localeCompare(b[contactListHeadersIDs])
            );
          } else {
            data.sort((a, b) =>
              b[contactListHeadersIDs]?.localeCompare(a[contactListHeadersIDs])
            );
          }
          console.log(data);
          filterInputs();
          data.forEach((contactInfo) => {
            populateTable(contactInfo);
          });
        });
      });
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
    TempInputValue = inputFirstName.value;
    contactList.innerHTML = '';
    let filteredData = JsonDB.filter(
      (userData) =>
        userData.FirstName?.toLowerCase().slice(
          0,
          inputFirstName.value.length
        ) == inputFirstName.value.toLowerCase()
    );

    filterInputs();
    inputFirstName.value = TempInputValue;
    filteredData.forEach((contactInfo) => {
      populateTable(contactInfo);
    });
    console.log(filteredData);
    inputFirstName.focus();
  }
}

function filterInputs() {
  tr = document.createElement('tr');
  contactList.appendChild(tr);
  th = document.createElement('th');
  th.scope = 'row';
  th.innerHTML = '0';
  tr.appendChild(th);

  inputFirstName = document.createElement('input');
  tdInputFirstName = document.createElement('td');
  inputFirstName.placeholder = 'First Name';
  tdInputFirstName.appendChild(inputFirstName);
  tr.appendChild(tdInputFirstName);
  inputFirstName.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputFirstName.addEventListener('keyup', function (e) {
        search(data, e);
      });
    });
  });

  inputLastName = document.createElement('input');
  tdInputLastName = document.createElement('td');
  inputLastName.placeholder = 'Last Name';
  tdInputLastName.appendChild(inputLastName);
  tr.appendChild(tdInputLastName);
  inputLastName.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputLastName.addEventListener('keyup', function (e) {
        console.log(inputLastName.value);
      });
    });
  });

  inputAddress = document.createElement('input');
  tdInputAddress = document.createElement('td');
  inputAddress.placeholder = 'Address';
  tdInputAddress.appendChild(inputAddress);
  tr.appendChild(tdInputAddress);
  inputAddress.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputAddress.addEventListener('keyup', function (e) {
        console.log(inputAddress.value);
      });
    });
  });

  inputAddress2 = document.createElement('input');
  tdInputAddress2 = document.createElement('td');
  inputAddress2.placeholder = 'Address 2';
  tdInputAddress2.appendChild(inputAddress2);
  tr.appendChild(tdInputAddress2);
  inputAddress2.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputAddress2.addEventListener('keyup', function (e) {
        console.log(inputAddress2.value);
      });
    });
  });

  inputCity = document.createElement('input');
  tdInputCity = document.createElement('td');
  inputCity.placeholder = 'City';
  tdInputCity.appendChild(inputCity);
  tr.appendChild(tdInputCity);
  inputCity.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputCity.addEventListener('keyup', function (e) {
        console.log(inputCity.value);
      });
    });
  });

  inputState = document.createElement('select');
  tdInputState = document.createElement('td');
  tdInputState.appendChild(inputState);
  tr.appendChild(tdInputState);
  inputState.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputState.addEventListener('keyup', function (e) {
        console.log(inputState.value);
      });
    });
  });

  inputZip = document.createElement('input');
  tdInputZip = document.createElement('td');
  inputZip.placeholder = 'Zip';
  tdInputZip.appendChild(inputZip);
  tr.appendChild(tdInputZip);
  inputZip.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputZip.addEventListener('keyup', function (e) {
        console.log(inputZip.value);
      });
    });
  });

  inputPhone = document.createElement('input');
  tdInputPhone = document.createElement('td');
  inputPhone.placeholder = 'Phone';
  tdInputPhone.appendChild(inputPhone);
  tr.appendChild(tdInputPhone);
  inputPhone.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputPhone.addEventListener('keyup', function (e) {
        console.log(inputPhone.value);
      });
    });
  });

  inputStatus = document.createElement('select');
  tdInputStatus = document.createElement('td');
  tdInputStatus.appendChild(inputStatus);
  tr.appendChild(tdInputStatus);
  inputStatus.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputStatus.addEventListener('keyup', function (e) {
        console.log(inputStatus.value);
      });
    });
  });

  inputSource = document.createElement('select');
  tdInputSource = document.createElement('td');
  tdInputSource.appendChild(inputSource);
  tr.appendChild(tdInputSource);
  inputSource.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputSource.addEventListener('keyup', function (e) {
        console.log(inputSource.value);
      });
    });
  });

  inputLastEditDate = document.createElement('input');
  tdInputLastEditDate = document.createElement('td');
  inputLastEditDate.placeholder = 'Last Edit Date';
  tdInputLastEditDate.appendChild(inputLastEditDate);
  tr.appendChild(tdInputLastEditDate);
  inputLastEditDate.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      inputLastEditDate.addEventListener('keyup', function (e) {
        console.log('Just pressed Last Edit Date');
      });
    });
  });
}

function populateTable(contactInfo) {
  tr = document.createElement('tr');
  contactList.appendChild(tr);
  th = document.createElement('th');
  th.scope = 'row';
  th.innerHTML = contactInfo.id;
  tr.appendChild(th);

  tdFirstName = document.createElement('td');
  tdFirstName.innerHTML = contactInfo.FirstName ? contactInfo.FirstName : '';
  tr.appendChild(tdFirstName);

  tdLastName = document.createElement('td');
  tdLastName.innerHTML = contactInfo.LastName ? contactInfo.LastName : '';
  tr.appendChild(tdLastName);

  tdAddress = document.createElement('td');
  tdAddress.innerHTML = contactInfo.Address ? contactInfo.Address : '';
  tr.appendChild(tdAddress);

  tdAddress2 = document.createElement('td');
  tdAddress2.innerHTML = contactInfo.Address2 ? contactInfo.Address2 : '';
  tr.appendChild(tdAddress2);

  tdCity = document.createElement('td');
  tdCity.innerHTML = contactInfo.City ? contactInfo.City : '';
  tr.appendChild(tdCity);

  tdState = document.createElement('td');
  tdState.innerHTML = contactInfo.State ? contactInfo.State : '';
  tr.appendChild(tdState);

  tdZip = document.createElement('td');
  tdZip.innerHTML = contactInfo.Zip ? contactInfo.Zip : '';
  tr.appendChild(tdZip);

  tdPhone = document.createElement('td');
  tdPhone.innerHTML = contactInfo.Phone ? contactInfo.Phone : '';
  tr.appendChild(tdPhone);

  tdStatus = document.createElement('td');
  tdStatus.innerHTML = contactInfo.Status ? contactInfo.Status : '';
  tr.appendChild(tdStatus);

  tdSource = document.createElement('td');
  tdSource.innerHTML = contactInfo.Source ? contactInfo.Source : '';
  tr.appendChild(tdSource);

  tdLastEditDate = document.createElement('td');
  tdLastEditDate.innerHTML = contactInfo.LastEditDate
    ? contactInfo.LastEditDate
    : '';
  tr.appendChild(tdLastEditDate);
}

getJSON(ContactsURL).then((data) => {
  //   console.log(data);
  filterInputs();
  data.forEach((contactInfo) => {
    populateTable(contactInfo);
  });
});
