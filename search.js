const ContactsURL = 'http://192.168.54.22:4000/contacts';
const BartkaTestButton = document.getElementById('BartkaTestButton');
const message = document.getElementById('message');
const contactSearch = document.getElementById('contactSearch');
const TaskList = document.getElementById('TaskList');
let list = document.getElementById('myList');
let CalendarEventsList = document.getElementById('CalendarEventsList');
let rep = 0;
let count = 0;
let nav = 0;
let clicked = null;
const calendar = document.getElementById('calendar');
const openHours = 8;
const closeHours = 18;
// prettier-ignore
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',];
// Programmatically assigning Contact Fields to variable name and adding EventListener
// prettier-ignore
const ContactFields = document.getElementById('ContactFields').querySelectorAll('*');

// Example: FirstName = document.getElementById('FirstName').addEventListener('change, function(e){...});
for (let rep = 0; rep < ContactFields.length; rep++) {
  let ContactFieldsIDs = ContactFields[rep].id;
  if (ContactFieldsIDs) {
    // console.log(ContactFieldsIDs);
    window['ContactFieldsIDs'] = document
      .getElementById(`${ContactFieldsIDs}`)
      .addEventListener('change', function (e) {
        let ContactFieldID = this.id;
        let ContactFieldValue = this.value;
        updateContactInfo(id.value, ContactFieldID, ContactFieldValue);
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

//////////  Adding Database and Retrieving Data
function updateContactInfo(contactID, updateThisKey, updateThisValue) {
  console.log(`${ContactsURL}/${contactID}`);

  fetch(`${ContactsURL}/${contactID}`, {
    method: 'PATCH',
    body: JSON.stringify({
      // This creates a key-value pair to be patached, ex: "FirstName": Bart
      [updateThisKey]: updateThisValue,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then(() => {
      getJSON(ContactsURL).then((data) => {
        showSearchList(data);
      });
    });
}

const showSearchList = function (JsonDB) {
  message.innerText = '';
  list.innerText = '';
  rep = 0;
  count = 0;

  JsonDB.filter((userData) => {
    let FullName = userData.FirstName + ' ' + userData.LastName;
    let SpouseFullName = userData.SpouseName + ' ' + userData.SpouseLastName;
    if (
      // prettier-ignore
      userData.FirstName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      userData.LastName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      FullName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      userData.SpouseName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      userData.SpouseLastName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      SpouseFullName?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      userData.Phone?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase() ||
      // prettier-ignore
      userData.Address?.toLowerCase().slice(0, contactSearch.value.length) == contactSearch.value.toLowerCase()
    ) {
      count++;
      if (rep < 10) {
        let li = document.createElement('li');
        li.setAttribute('id', `list${userData.id}`);
        li.innerText = userData.FirstName + ' ' + userData.LastName;
        list.appendChild(li);
        // programmatically userData inserted into Contact Fields, ex: document.getElementByID(FirstName).value = userData.FirstName
        window['list' + userData.id] = document
          .getElementById(`list${userData.id}`)
          .addEventListener('click', function () {
            console.log(`Contact ID from Search List: ${userData.id}`);
            for (
              let SecondRep = 0;
              SecondRep < ContactFields.length;
              SecondRep++
            ) {
              let ContactFieldsIDs = ContactFields[SecondRep].id;
              if (ContactFieldsIDs) {
                document.getElementById(`${ContactFieldsIDs}`).value = userData[
                  ContactFieldsIDs
                ]
                  ? `${userData[ContactFieldsIDs]}`
                  : '';
              }
            }
            calendarEventsList(userData);
          });
        rep++;
      }
    }
  });

  contactSearch.value.length == 0
    ? (message.innerText = '')
    : (message.innerText += 'Found ' + count + ' results');
};

////////// Event Listeners For First Name Search
contactSearch.addEventListener('focusin', function (e) {
  getJSON(ContactsURL).then((data) => {
    contactSearch.addEventListener('keyup', function (e) {
      if (
        // e.key !== 'Backspace' &&
        e.key !== 'Shift' &&
        e.key !== 'CapsLock' &&
        e.key !== 'Control' &&
        e.key !== 'Alt'
      ) {
        showSearchList(data);
      }
    });
  });
});
let BartDate = new Date();
const todaysDay = BartDate.getDate();
const todaysMonth = BartDate.getMonth() + 1;
const todaysYear = BartDate.getFullYear();

function dailyEvents(todaysDay, todaysMonth, todaysYear) {
  const todaysDate = todaysMonth + '/' + todaysDay + '/' + todaysYear;
  let todaysEventsBckgrd = 0;

  getJSON(ContactsURL).then((data) => {
    const todaysEvents = data
      .filter((userData) => {
        if (userData.CalendarEvents) return userData.CalendarEvents;
      })
      .flatMap((userData) => userData.CalendarEvents)
      .sort((a, b) => a.Time - b.Time);

    for (const todaysEvent of todaysEvents) {
      if (todaysEvent.Date == todaysDate) {
        let li = document.createElement('input');
        todaysEventsBckgrd++;
        if (todaysEventsBckgrd % 2) {
          li.classList.add(`EventAlternate`);
        }
        const findContactInfo = data.find((bartEntry) => {
          return bartEntry.id == todaysEvent.id;
        });
        li.id = `${todaysEvent.Time}TimeSlot${todaysEventsBckgrd}`;
        li.classList.add(`form-control`);
        li.placeholder = `${todaysEvent.Time}:00`;
        li.value = `${todaysEvent.Time}:00 (${findContactInfo.LastName}) ${todaysEvent.Description}`;
        li.type = 'text';
        TaskList.appendChild(li);
        window[todaysEvent.Time + 'TimeSlot' + todaysEventsBckgrd] = document
          .getElementById(`${todaysEvent.Time}TimeSlot${todaysEventsBckgrd}`)
          .addEventListener('focusin', function (e) {
            console.log(`${todaysEvent.id}`);

            console.log(findContactInfo);
            // console.log(`${JSON.stringify(data)}`);
            //try to compress this as this is being repeated
            for (
              let SecondRep = 0;
              SecondRep < ContactFields.length;
              SecondRep++
            ) {
              let ContactFieldsIDs = ContactFields[SecondRep].id;
              if (ContactFieldsIDs) {
                document.getElementById(`${ContactFieldsIDs}`).value =
                  findContactInfo[ContactFieldsIDs]
                    ? `${findContactInfo[ContactFieldsIDs]}`
                    : '';
              }
            }
            calendarEventsList(findContactInfo);
          });
      }
    }
  });
}

function calendarEventsList(userData) {
  //sorts the Data in reverse chronological order
  const customerCalEvents = userData.CalendarEvents?.sort((a, b) =>
    b.Date.localeCompare(a.Date)
  );
  CalendarEventsList.innerHTML = '';

  // FInished here on 5/18/2022, add rest of styling from https://getbootstrap.com/docs/5.2/forms/input-group/
  //<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>

  customerCalEvents?.forEach((element) => {
    //splits the date into three distict parts
    let splitDate = element.Date.split('/');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('input-group', 'mb-3');
    CalendarEventsList.appendChild(inputDiv);

    // First Input: Month
    const inputSelect1 = document.createElement('select');
    // inputSelect1.id = `inputGroupSelect01${element.id}`;
    inputDiv.appendChild(inputSelect1);

    const inputOption1 = document.createElement('option');
    inputOption1.setAttribute('selected', 'selected');
    inputOption1.innerHTML = splitDate[0];
    inputSelect1.appendChild(inputOption1);

    for (let i = 1; i <= 12; i++) {
      let inputOption1All = document.createElement('option');
      inputOption1All.value = i;
      inputOption1All.innerHTML = i;
      inputSelect1.appendChild(inputOption1All);
    }

    // Second Input: Day
    const inputSelect2 = document.createElement('select');
    // inputSelect2.id = 'inputGroupSelect02';
    inputDiv.appendChild(inputSelect2);

    const inputOption2 = document.createElement('option');
    inputOption2.setAttribute('selected', 'selected');
    inputOption2.innerHTML = splitDate[1];
    inputSelect2.appendChild(inputOption2);

    // Third Input: Year
    const inputSelect3 = document.createElement('select');
    // inputSelect3.id = 'inputGroupSelect03';
    inputDiv.appendChild(inputSelect3);

    const inputOption3 = document.createElement('option');
    inputOption3.setAttribute('selected', 'selected');
    inputOption3.innerHTML = splitDate[2];
    inputSelect3.appendChild(inputOption3);

    for (let i = 2021; i <= 2026; i++) {
      let inputOption3All = document.createElement('option');
      inputOption3All.value = i;
      inputOption3All.innerHTML = i;
      inputSelect3.appendChild(inputOption3All);
    }

    console.log(element);
    console.log(splitDate);

    let li = document.createElement('input');
    li.type = 'text';
    li.id = `Event${element.EventID}`;
    li.classList.add(`form-control`);
    li.value = element.Description;
    inputDiv.appendChild(li);
  });
}

function loadCalendar() {
  const dt = new Date();
  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }
  let nextMonth = 1;
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString(
    'en-us',
    { month: 'long' }
  )} ${day}, ${year}`;
  calendar.innerHTML = '';

  getJSON(ContactsURL).then((data) => {
    const eventsForDay = data.filter((entry) => {
      if (entry.CalendarEvents) return entry.CalendarEvents;
    });

    for (let rep = 1; rep <= 42; rep++) {
      // original: for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement('div');
      daySquare.classList.add('day');
      const dayString = `${month + 1}/${rep - paddingDays}/${year}`;
      let tasklistDate = new Date();
      tasklistDate.setMonth(month);
      tasklistDate.setDate(rep - paddingDays);
      tasklistDate.setFullYear(year);

      if (rep <= paddingDays) {
        daySquare.classList.add('notActiveDay');
        daySquare.innerText = lastDayOfPreviousMonth + rep - paddingDays;
      }

      if (rep > paddingDays) {
        daySquare.classList.add('ActiveDay');
        daySquare.innerText = rep - paddingDays;
        // const eventsForDay = data.filter((e) => e.CalendarEvents);

        // console.log(eventsForDay);

        for (const eventForDay of eventsForDay) {
          // console.log(eventForDay);
          for (let eventDetails in eventForDay.CalendarEvents) {
            if (eventForDay.CalendarEvents[eventDetails].Date === dayString) {
              //original:  const eventsForDay = data?.find((e) => e.Date === dayString);

              if (eventsForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.LastName;
                //original:  eventDiv.innerText = eventsForDay.Title;
                daySquare.appendChild(eventDiv);
                daySquare.addEventListener('click', () => {
                  // console.log(eventForDay.LastName);
                  // console.log(eventForDay.CalendarEvents[eventDetails].Date);
                  // console.log(eventForDay.CalendarEvents[eventDetails].Time);
                  // console.log(
                  //   eventForDay.CalendarEvents[eventDetails].Description
                  // );
                  // console.log('==============');
                  document.getElementById(
                    'monthDisplay'
                  ).innerText = `${tasklistDate.toLocaleDateString('en-us', {
                    month: 'long',
                  })} ${rep - paddingDays}, ${year}`;
                  // oiginally using this for date: = `${dayString}`;
                  // Resets Tasklist

                  // for (
                  //   let timeSlots = openHours;
                  //   timeSlots <= closeHours;
                  //   timeSlots++
                  // ) {
                  //   document.getElementById(`${timeSlots}TimeSlot`).value = '';
                  // }
                  // function populateTaskList() {
                  //   // console.log(eventsForDay);
                  //   // console.log(eventForDay.CalendarEvents[eventDetails]);
                  //   for (
                  //     let timeSlots = openHours;
                  //     timeSlots <= closeHours;
                  //     timeSlots++
                  //   ) {
                  //     if (
                  //       timeSlots ==
                  //       eventForDay.CalendarEvents[eventDetails].Time
                  //     ) {
                  //       document.getElementById(`${timeSlots}TimeSlot`).value =
                  //         eventForDay.CalendarEvents[eventDetails].Time
                  //           ? `${eventForDay.CalendarEvents[eventDetails].Description}`
                  //           : '';
                  //     }
                  //   }
                  // }
                  // setTimeout(populateTaskList, 1);
                });
              }
            }
          }
        }
        daySquare.addEventListener('click', () => {
          console.log(`${dayString}`);
          document.getElementById('monthDisplay').innerText = `${dayString}`;
          TaskList.innerHTML = '';
          dailyEvents(rep - paddingDays, month + 1, year);
        });
        //uncomment to hear for testing
      }

      if (rep - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }
      // } else {
      //   daySquare.classList.add('padding');

      if (rep > paddingDays + daysInMonth) {
        daySquare.innerText = nextMonth;
        daySquare.classList.add('notActiveDay');
        nextMonth++;
      }
      calendar.appendChild(daySquare);
    }
  });
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    loadCalendar();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    loadCalendar();
  });
}
loadCalendar();
initButtons();
dailyEvents(todaysDay, todaysMonth, todaysYear);
