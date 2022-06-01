'use strict';
const ContactsURL = 'http://192.168.54.22:4000/contacts';
const contactList = document.getElementById('contactList');
// prettier-ignore
const contactListHeaders = document.getElementById('contactListHeaders').querySelectorAll('*');
// prettier-ignore
let tr, th, td, tdFirstName, tdLastName, tdAddress, tdAddress2, tdCity, tdState, tdZip, tdPhone, tdStatus, tdSource, tdLastEditDate, comparison;
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

          data.sort((a, b) =>
            a[contactListHeadersIDs]?.localeCompare(b[contactListHeadersIDs])
          );
          console.log(data);
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
  data.forEach((contactInfo) => {
    populateTable(contactInfo);
  });
});
