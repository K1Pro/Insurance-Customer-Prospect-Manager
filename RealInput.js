'use strict';
const ContactsURL = 'http://192.168.54.22:4000/contacts';
const contactList = document.getElementById('contactList');
let rep = 0;

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

getJSON(ContactsURL).then((data) => {
  //   console.log(data);
  data.forEach((customer) => {
    rep++;
    let ul = document.createElement('ul');
    contactList.appendChild(ul);

    if (customer.FirstName) {
      let li1 = document.createElement('input');
      li1.value = customer.FirstName;
      // li1.style = 'display:inline';
      contactList.appendChild(li1);
    }

    if (customer.LastName) {
      let li2 = document.createElement('input');
      li2.value = customer.LastName;
      // li2.style = 'display:inline';
      contactList.appendChild(li2);
    }

    if (customer.Address) {
      let li3 = document.createElement('input');
      li3.value = customer.Address;
      // li3.style = 'display:inline';
      contactList.appendChild(li3);
    }

    if (customer.City) {
      let li4 = document.createElement('input');
      li4.value = customer.City;
      // li4.style = 'display:inline';
      contactList.appendChild(li4);
    }

    if (customer.Phone) {
      let li4 = document.createElement('input');
      li4.value = customer.Phone;
      // li4.style = 'display:inline';
      contactList.appendChild(li4);
    } else {
      let li4 = document.createElement('input');
      let message = 'No Phone #';
      li4.placeholder = message;
      // li4.style = 'display:inline';
      contactList.appendChild(li4);
    }
  });
});
