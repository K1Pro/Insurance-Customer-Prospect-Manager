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
      let li1 = document.createElement('li');
      li1.innerText = customer.FirstName.padEnd(50, '.').slice(0, 10) + ' | ';
      li1.style = 'display:inline';
      ul.appendChild(li1);
    }

    if (customer.LastName) {
      let li2 = document.createElement('li');
      li2.innerText = customer.LastName.padEnd(50, '.').slice(0, 10) + ' | ';
      li2.style = 'display:inline';
      ul.appendChild(li2);
    }

    if (customer.Address) {
      let li3 = document.createElement('li');
      li3.innerText = customer.Address.padEnd(50, '.').slice(0, 20) + ' | ';
      li3.style = 'display:inline';
      ul.appendChild(li3);
    }

    if (customer.City) {
      let li4 = document.createElement('li');
      li4.innerText = customer.City.padEnd(10, '.').slice(0, 10) + ' | ';
      li4.style = 'display:inline';
      ul.appendChild(li4);
    }

    if (customer.Phone) {
      let li4 = document.createElement('li');
      li4.innerText = customer.Phone.padEnd(10, '.').slice(0, 10) + ' | ';
      li4.style = 'display:inline';
      ul.appendChild(li4);
    } else {
      let li4 = document.createElement('li');
      let message = 'No Phone #';
      li4.innerText = message.padEnd(10, '.').slice(0, 10) + ' | ';
      li4.style = 'display:inline';
      ul.appendChild(li4);
    }
  });
});
