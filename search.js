'use strict';
const ContactsURL = 'http://192.168.54.22:4000/contacts';
let BartDate = new Date();
// prettier-ignore
const bartsMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',];
// prettier-ignore
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',];
const todaysDay = BartDate.getDate();
const todaysMonth = BartDate.getMonth() + 1;
const todaysYear = BartDate.getFullYear();
// prettier-ignore
const todaysFullDate = ('0' + todaysMonth).slice(-2) + '/' + ('0' +todaysDay).slice(-2) + '/' + todaysYear;
let fourWeeksLater = '';
let fourWeeksLaterDate = '';
let fourWeeksLaterMonth = '';
let fourWeeksLaterYear = '';
const BartkaTestButton = document.getElementById('BartkaTestButton');
const message = document.getElementById('message');
const contactSearch = document.getElementById('contactSearch');
const TaskList = document.getElementById('TaskList');
const contactTasksTextArea = document.getElementById('contactTasksTextArea');
let contactTasksTextAreaValue = contactTasksTextArea.value;
const createEvent = document.getElementById('createEvent');
const reviewed = document.getElementById('Reviewed');
const inputGroupSelect101 = document.getElementById('inputGroupSelect101');
const inputGroupSelect102 = document.getElementById('inputGroupSelect102');
const inputGroupSelect103 = document.getElementById('inputGroupSelect103');
const inputGroupSelect104 = document.getElementById('inputGroupSelect104');
const inputGroupSelect105 = document.getElementById('inputGroupSelect105');
const dailyTaskListDate = document.getElementById('dailyTaskListDate');
inputGroupSelect101.selectedIndex = todaysMonth - 1;
inputGroupSelect102.selectedIndex = todaysDay - 1;
inputGroupSelect103.selectedIndex = 1;
// prettier-ignore
let totalDaysInMonth, checkBoxArray,checkBoxSortedArray, removedCheckedEvent, newCheckedArray, li, checkedEvents, custTextAreaArray,custTextAreaSortedArray, removedCustTextAreaEvent, custTextAreaValue, custEventHour, removedCustEventHour, custEventYear, removedCustEventYear, yearSelect, monthSelect, daySelect, custEventDay, removedCustEventDay, custEventMonth, removedCustEventMonth, firstDate, secondDate, firstDateYear, secondDateYear, YYYYMMDD, YYYYMMDDTemp, daySquareNumber, contactLastEditDate, selectedDate, renewalChecked, selectedDateTemp, contactLastEditDateTemp, currentDate, currentDateArray;
function dailyTaskListCurrentDate() {
  let currentdailyTaskListDate = document.getElementById('dailyTaskListDate');
  currentDate = currentdailyTaskListDate.innerText;
  currentDateArray = currentDate.split('/');
  return currentDateArray;
}
function auto_grow(element) {
  element.style.height = '5px';
  element.style.height = element.scrollHeight + 'px';
}
let whichRenewal = '';
let calEvtListMthDays = 0;
let eventPlaceHolder = 0;
// loadContactsOnce should start as Zero
let loadContactsOnce = 0;

let inputGroupSelect101Value = inputGroupSelect101.value;
let inputGroupSelect102Value = inputGroupSelect102.value;
let inputGroupSelect103Value = inputGroupSelect103.value;
let inputGroupSelect104Value = inputGroupSelect104.value;
let inputGroupSelect105Value = inputGroupSelect105.value;
let list = document.getElementById('myList');
let contactTaskList = document.getElementById('contactTaskList');
let rep = 0;
let count = 0;
let nav = 0;
let clicked = null;
const calendar = document.getElementById('calendar');
const openHours = 8;
const closeHours = 18;
// Programmatically assigning Contact Fields to variable name and adding EventListener
// prettier-ignore
const ContactFields = document.getElementById('ContactFields').querySelectorAll('*');

// Example: FirstName = document.getElementById('FirstName').addEventListener('change, function(e){...});
for (let rep = 0; rep < ContactFields.length; rep++) {
  let ContactFieldsIDs = ContactFields[rep].id;
  if (ContactFieldsIDs) {
    // console.log(ContactFieldsIDs);
    document
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
  if (id.value) {
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
  } else {
    alert('Please search for and choose a customer.');
  }
}

function renderContactFields(userData) {
  for (let SecondRep = 0; SecondRep < ContactFields.length; SecondRep++) {
    let ContactFieldsIDs = ContactFields[SecondRep].id;
    if (ContactFieldsIDs) {
      document.getElementById(`${ContactFieldsIDs}`).value = userData[
        ContactFieldsIDs
      ]
        ? `${userData[ContactFieldsIDs]}`
        : '';
    }
  }
}

//Reviewed Button
reviewed.addEventListener('click', function () {
  if (id.value != '') {
    console.log('this is calculated:');
    console.log(todaysFullDate);
    console.log('this is from the daily tasklist: ');
    console.log(dailyTaskListDate.innerText);
    fetch(`${ContactsURL}/${id.value}`, {
      method: 'PATCH',
      body: JSON.stringify({
        // This creates a key-value pair to be patached, ex: "FirstName": Bart
        LastEditDate: todaysFullDate,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then(() => {
        getJSON(ContactsURL).then((data) => {
          while (TaskList.firstChild) {
            TaskList.removeChild(TaskList.firstChild);
          }
          renderDailyTaskList(
            dailyTaskListCurrentDate()[1],
            dailyTaskListCurrentDate()[0],
            dailyTaskListCurrentDate()[2]
          );
        });
      });
  }
});

//Create Button
createEvent.addEventListener('click', function () {
  contactTasksTextAreaValue = contactTasksTextArea.value;
  inputGroupSelect101Value = inputGroupSelect101.value;
  inputGroupSelect102Value = inputGroupSelect102.value;
  inputGroupSelect103Value = inputGroupSelect103.value;
  inputGroupSelect104Value = inputGroupSelect104.value;
  inputGroupSelect105Value = inputGroupSelect105.value;

  if (contactTasksTextAreaValue && id.value) {
    let contactTasksTextAreaDate = `${inputGroupSelect103Value}/${inputGroupSelect101Value}/${inputGroupSelect102Value}`;

    getJSON(ContactsURL).then((data) => {
      const findEvents = data
        .filter((userData) => {
          if (userData.id == id.value) return userData.CalendarEvents;
        })
        .flatMap((userData) => userData.CalendarEvents);
      let NewEventID = findEvents.length + 1;
      let obj = {};
      findEvents.push(
        (obj = {
          id: id.value,
          EventID: NewEventID,
          Date: contactTasksTextAreaDate,
          Time: inputGroupSelect104Value,
          Description: contactTasksTextAreaValue,
        })
      );

      fetch(`${ContactsURL}/${id.value}`, {
        method: 'PATCH',
        body: JSON.stringify({
          // This creates a key-value pair to be patached, ex: "FirstName": Bart
          CalendarEvents: findEvents,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.text())
        .then(() => {
          getJSON(ContactsURL).then((data) => {
            console.log(data);
            contactTasksTextArea.value = '';

            const createdEvent = data.find((element) => element.id == id.value);
            console.log(createdEvent);
            renderContactTaskList(createdEvent);
            inputGroupSelect101.selectedIndex = todaysMonth - 1;
            inputGroupSelect102.selectedIndex = todaysDay - 1;
            inputGroupSelect103.selectedIndex = 1;
            renderDailyTaskList(
              dailyTaskListCurrentDate()[1],
              dailyTaskListCurrentDate()[0],
              dailyTaskListCurrentDate()[2]
            );
            loadCalendar();
          });
        });
    });
  } else {
    alert("Please choose a customer and add today's events.");
  }
});

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
        // userData inserted into Contact Fields, ex: document.getElementByID(FirstName).value = userData.FirstName
        document
          .getElementById(`list${userData.id}`)
          .addEventListener('click', () => {
            renderContactFields(userData);
            renderContactTaskList(userData);
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

function renderDailyTaskList(todaysDay, todaysMonth, todaysYear) {
  TaskList.innerHTML = '';
  // prettier-ignore
  const todaysDate = ('0' + todaysMonth).slice(-2) + '/' + ('0' + todaysDay).slice(-2) + '/' + todaysYear;
  //compares renewal to 4 weeks later
  fourWeeksLater = new Date(todaysYear, todaysMonth, todaysDay);
  fourWeeksLater.setDate(fourWeeksLater.getDate() + 28);
  fourWeeksLaterDate = fourWeeksLater.getDate();
  fourWeeksLaterMonth = fourWeeksLater.getMonth();
  fourWeeksLaterYear = fourWeeksLater.getFullYear() + 1;

  // prettier-ignore
  let todaysDateAndMonth = ('0' + fourWeeksLaterMonth).slice(-2) + '/' + ('0' + fourWeeksLaterDate).slice(-2);

  //original, do not delete this!!!!!!! compares renewals to todays date
  // let todaysDateAndMonth = ('0' + todaysMonth).slice(-2) + '/' + ('0' + todaysDay).slice(-2);
  let todaysEventsBckgrd = 0;

  getJSON(ContactsURL).then((data) => {
    const todaysEvents = data
      .filter((userData) => {
        if (userData.CalendarEvents) return userData.CalendarEvents;
      })
      .flatMap((userData) => userData.CalendarEvents)
      .sort((a, b) => a.Time - b.Time);

    for (const todaysEvent of todaysEvents) {
      YYYYMMDDTemp = todaysEvent.Date;
      YYYYMMDD = YYYYMMDDTemp.slice(5, 10) + '/' + YYYYMMDDTemp.slice(0, 4);

      if (YYYYMMDD == todaysDate) {
        let li = document.createElement('li');
        // if you want inputs in the daily tasklist, use the following code:
        // let li = document.createElement('input');
        todaysEventsBckgrd++;
        if (todaysEventsBckgrd % 2) {
          li.classList.add(`EventAlternate`);
        }
        contactLastEditDateTemp = todaysEvent.Completed;
        console.log(contactLastEditDateTemp);

        if (contactLastEditDateTemp == 'True') {
          li.classList.add(`TaskCompleted`);
        } else {
          li.classList.add(`TaskNotCompleted`);
        }

        const findContactInfo = data.find((bartEntry) => {
          return bartEntry.id == todaysEvent.id;
        });
        li.id = `TimeSlot${todaysEvent.id}${todaysEvent.EventID}`;
        li.innerText = `${todaysEvent.Time}:00 (${findContactInfo.LastName}) ${todaysEvent.Description}`;

        TaskList.appendChild(li);
        document
          .getElementById(`TimeSlot${todaysEvent.id}${todaysEvent.EventID}`)
          .addEventListener('click', () => {
            console.log(`${todaysEvent.id}`);
            console.log(findContactInfo);
            renderContactFields(findContactInfo);
            renderContactTaskList(findContactInfo);
            //add here focusin
            console.log(`Event${todaysEvent.id}${todaysEvent.EventID}`);
            // setTimeout((
            document
              .getElementById(`Event${todaysEvent.id}${todaysEvent.EventID}`)
              .focus();
            //   5000
            // );
          });
      }
    }
    //The following populates renewals into the daily tasklist
    const renewals = data.filter((userData) => {
      let renewal1 = `${userData.Policy1RenewMonth}/${userData.Policy1RenewDay}`;
      let renewal2 = `${userData.Policy2RenewMonth}/${userData.Policy2RenewDay}`;
      let renewal3 = `${userData.Policy3RenewMonth}/${userData.Policy3RenewDay}`;
      let renewal4 = `${userData.Policy4RenewMonth}/${userData.Policy4RenewDay}`;
      if (
        renewal1 == todaysDateAndMonth ||
        renewal2 == todaysDateAndMonth ||
        renewal3 == todaysDateAndMonth ||
        renewal4 == todaysDateAndMonth
      ) {
        whichRenewal = '';
        if (renewal1 == todaysDateAndMonth) {
          whichRenewal += userData.Policy1Type + ', ';
        }
        if (renewal2 == todaysDateAndMonth) {
          whichRenewal += userData.Policy2Type + ', ';
        }
        if (renewal3 == todaysDateAndMonth) {
          whichRenewal += userData.Policy3Type + ', ';
        }
        if (renewal4 == todaysDateAndMonth) {
          whichRenewal += userData.Policy4Type + ', ';
        }

        let li = document.createElement('li');
        todaysEventsBckgrd++;
        if (todaysEventsBckgrd % 2) {
          li.classList.add(`EventAlternate`);
        }

        contactLastEditDateTemp = userData.LastEditDate;
        // prettier-ignore
        contactLastEditDate = contactLastEditDateTemp.slice(6, 10) + '/' + contactLastEditDateTemp.slice(0, 5);
        console.log(contactLastEditDate);

        selectedDateTemp = dailyTaskListDate.innerText;
        // prettier-ignore
        selectedDate = selectedDateTemp.slice(6, 10) + '/' + selectedDateTemp.slice(0, 5);
        console.log(selectedDate);

        renewalChecked = contactLastEditDate.localeCompare(selectedDate);
        console.log(renewalChecked);

        if (renewalChecked >= 0) {
          li.classList.add(`TaskCompleted`);
        } else {
          li.classList.add(`TaskNotCompleted`);
        }

        li.innerText = `Renewal for ${userData.FirstName} ${
          userData.LastName
        } in 4 weeks: ${whichRenewal.slice(0, -2)}`;
        li.id = `renewal${userData.id}`;
        console.log(userData);
        TaskList.appendChild(li);
        if (loadContactsOnce == 0) {
          loadContactsOnce++;
          renderContactFields(userData);
          renderContactTaskList(userData);
        }
        document
          .getElementById(`renewal${userData.id}`)
          .addEventListener('click', () => {
            renderContactFields(userData);
            renderContactTaskList(userData);
          });
      }
    });
  });
}

function updateCustEvents(itemUpdated) {
  fetch(`${ContactsURL}/${id.value}`, {
    method: 'PATCH',
    body: JSON.stringify({
      // This creates a key-value pair to be patached, ex: "FirstName": Bart
      CalendarEvents: itemUpdated,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then(() => {
      getJSON(ContactsURL).then((data) => {
        console.log(data);
      });
    });
}

function renderContactTaskList(userData) {
  contactTaskList.innerHTML = '';

  //sorts the Data in reverse chronological order
  const customerCalEvents = userData.CalendarEvents?.sort((a, b) =>
    b.Date.localeCompare(a.Date)
  );

  customerCalEvents?.forEach((element) => {
    eventPlaceHolder++;

    //splits the date into three distict parts
    let splitDate = element.Date.split('/');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('input-group', 'mb-3');
    contactTaskList.appendChild(inputDiv);

    // First Input: Month
    const inputSelect1 = document.createElement('select');
    inputSelect1.id = `MonthSelect${element.id}${element.EventID}`;
    inputSelect1.classList.add(`DateBorder`);
    inputDiv.appendChild(inputSelect1);

    for (let i = 1; i <= 12; i++) {
      let inputOption1All = document.createElement('option');
      inputOption1All.value = ('0' + i).slice(-2);
      inputOption1All.innerHTML = bartsMonths[i - 1];
      inputSelect1.appendChild(inputOption1All);
    }
    inputSelect1.selectedIndex = splitDate[1] - 1;
    document
      .getElementById(`MonthSelect${element.id}${element.EventID}`)
      .addEventListener('change', (trial) => {
        daySelect = document.getElementById(
          `DaySelect${element.id}${element.EventID}`
        ).value;
        yearSelect = document.getElementById(
          `YearSelect${element.id}${element.EventID}`
        ).value;
        custEventMonth = userData.CalendarEvents;
        removedCustEventMonth = custEventMonth.findIndex(
          (bartElement) => bartElement.EventID == element.EventID
        );
        custEventMonth[removedCustEventMonth].Date =
          yearSelect + '/' + trial.target.value + '/' + daySelect;
        console.log(custEventMonth);
        updateCustEvents(custEventMonth);
      });

    // Second Input: Day
    const inputSelect2 = document.createElement('select');
    inputSelect2.id = `DaySelect${element.id}${element.EventID}`;
    inputSelect2.classList.add(`DateBorder`);
    inputDiv.appendChild(inputSelect2);

    totalDaysInMonth = new Date(splitDate[0], splitDate[1], 0);
    calEvtListMthDays = totalDaysInMonth.getDate();

    for (let i = 1; i <= calEvtListMthDays; i++) {
      let inputOption2All = document.createElement('option');
      inputOption2All.value = ('0' + i).slice(-2);
      inputOption2All.innerHTML = ('0' + i).slice(-2);
      inputSelect2.appendChild(inputOption2All);
    }
    inputSelect2.selectedIndex = splitDate[2] - 1;
    document
      .getElementById(`DaySelect${element.id}${element.EventID}`)
      .addEventListener('change', (trial) => {
        monthSelect = document.getElementById(
          `MonthSelect${element.id}${element.EventID}`
        ).value;
        yearSelect = document.getElementById(
          `YearSelect${element.id}${element.EventID}`
        ).value;
        custEventDay = userData.CalendarEvents;
        removedCustEventDay = custEventDay.findIndex(
          (bartElement) => bartElement.EventID == element.EventID
        );
        custEventDay[removedCustEventDay].Date =
          yearSelect + '/' + monthSelect + '/' + trial.target.value;
        console.log(custEventDay);
        updateCustEvents(custEventDay);
      });

    // Third Input: Year
    const inputSelect3 = document.createElement('select');
    inputSelect3.id = `YearSelect${element.id}${element.EventID}`;
    inputSelect3.classList.add(`DateBorder`);
    inputDiv.appendChild(inputSelect3);

    for (let i = 2011; i <= 2026; i++) {
      let inputOption3All = document.createElement('option');
      inputOption3All.value = i;
      inputOption3All.innerHTML = i;
      inputSelect3.appendChild(inputOption3All);
    }
    inputSelect3.selectedIndex = splitDate[0] - 2011;
    document
      .getElementById(`YearSelect${element.id}${element.EventID}`)
      .addEventListener('change', (trial) => {
        daySelect = document.getElementById(
          `DaySelect${element.id}${element.EventID}`
        ).value;
        monthSelect = document.getElementById(
          `MonthSelect${element.id}${element.EventID}`
        ).value;
        custEventYear = userData.CalendarEvents;
        removedCustEventYear = custEventYear.findIndex(
          (bartElement) => bartElement.EventID == element.EventID
        );
        custEventYear[removedCustEventYear].Date =
          trial.target.value + '/' + monthSelect + '/' + daySelect;
        console.log(custEventYear);
        updateCustEvents(custEventYear);
      });

    let timeSeparator = document.createElement('span');
    timeSeparator.classList.add(`input-group-text`);
    timeSeparator.innerHTML = '@';
    inputDiv.appendChild(timeSeparator);

    const inputSelect4 = document.createElement('select');
    inputSelect4.id = `HourSelect${element.id}${element.EventID}`;
    inputSelect4.classList.add(`DateBorder`);
    inputDiv.appendChild(inputSelect4);

    for (let i = 7; i <= 20; i++) {
      let inputOption4All = document.createElement('option');
      inputOption4All.value = ('0' + i).slice(-2);
      inputOption4All.innerHTML = ('0' + i).slice(-2);
      inputSelect4.appendChild(inputOption4All);
    }
    inputSelect4.selectedIndex = element.Time - 7;
    document
      .getElementById(`HourSelect${element.id}${element.EventID}`)
      .addEventListener('change', (trial) => {
        custEventHour = userData.CalendarEvents;
        removedCustEventHour = custEventHour.findIndex(
          (bartElement) => bartElement.EventID == element.EventID
        );
        custEventHour[removedCustEventHour].Time = trial.target.value;
        console.log(custEventHour);
        updateCustEvents(custEventHour);
      });

    li = document.createElement('textarea');
    // li.type = 'text';
    li.id = `Event${element.id}${element.EventID}`;
    li.classList.add(`form-control`);
    li.rows = 1;
    li.value = element.Description;
    inputDiv.appendChild(li);
    document
      .getElementById(`Event${element.id}${element.EventID}`)
      .addEventListener('change', (trial) => {
        custTextAreaSortedArray = userData.CalendarEvents;
        removedCustTextAreaEvent = custTextAreaSortedArray.findIndex(
          (bartElement) => bartElement.EventID == element.EventID
        );
        custTextAreaSortedArray[removedCustTextAreaEvent].Description =
          trial.target.value;
        console.log(custTextAreaSortedArray);
        updateCustEvents(custTextAreaSortedArray);
        //still need to work on updating the daily Task List when textarea is updated
        renderDailyTaskList(
          dailyTaskListCurrentDate()[1],
          dailyTaskListCurrentDate()[0],
          dailyTaskListCurrentDate()[2]
        );
      });

    let checkBox = document.createElement('input');
    checkBox.id = `ContactEventCheckBox${element.id}${element.EventID}`;
    checkBox.type = 'checkbox';
    checkBox.classList.add('form-check-input', 'mt-0', 'bartkaCheckbox');
    if (element.Completed == 'True') {
      checkBox.checked = true;
    }

    inputDiv.appendChild(checkBox);
    // Checkbox Function on each contact's tasklist
    document
      .getElementById(`ContactEventCheckBox${element.id}${element.EventID}`)
      .addEventListener('click', () => {
        checkBoxArray = element;
        checkBoxSortedArray = userData.CalendarEvents;
        removedCheckedEvent = checkBoxSortedArray.filter(
          (dataEvents) => dataEvents.EventID != element.EventID
        );
        if (element.Completed == 'True') {
          checkBoxArray.Completed = 'False';
          removedCheckedEvent.push(checkBoxArray);
          updateCustEvents(removedCheckedEvent);
          loadCalendar();
        } else {
          checkBoxArray.Completed = 'True';
          removedCheckedEvent.push(checkBoxArray);
          updateCustEvents(removedCheckedEvent);
          loadCalendar();
        }
      });
  });
}

function loadCalendar() {
  //found bug: need to decrease amount of days for next month if current month has more days than next month, otherwise it throws off the next and previous buttons...
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
  // prettier-ignore
  dailyTaskListDate.innerText = `${('0' + (month + 1)).slice(-2)}/${('0' + (day)).slice(-2)}/${year}`;
  //Long Form of Date, replace this eventually to show in the Daily Task list
  // document.getElementById('dailyTaskListDate').innerText = `${dt.toLocaleDateString(
  //   'en-us',
  //   { month: 'long' }
  // )} ${day}, ${year}`;

  calendar.innerHTML = '';

  getJSON(ContactsURL).then((data) => {
    const eventsForDay = data.filter((entry) => {
      if (entry.CalendarEvents) return entry.CalendarEvents;
    });

    for (let rep = 1; rep <= 42; rep++) {
      // original: for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement('div');
      daySquare.classList.add('day');
      // prettier-ignore
      const dayString = `${('0' + (month + 1)).slice(-2)}/${('0' + (rep - paddingDays)).slice(-2)}/${year}`;
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
        // originally was here, moved it down: daySquare.innerText = rep - paddingDays;
        daySquareNumber = document.createElement('div');
        daySquareNumber.classList.add('daySquareNumber');
        daySquareNumber.innerText = rep - paddingDays;
        daySquare.appendChild(daySquareNumber);
        // const eventsForDay = data.filter((e) => e.CalendarEvents);

        for (const eventForDay of eventsForDay) {
          for (let eventDetails in eventForDay.CalendarEvents) {
            // console.log(eventForDay.CalendarEvents); try to input the renewals here into the calendar
            YYYYMMDDTemp = eventForDay.CalendarEvents[eventDetails].Date;
            YYYYMMDD =
              YYYYMMDDTemp.slice(5, 10) + '/' + YYYYMMDDTemp.slice(0, 4);
            if (YYYYMMDD === dayString) {
              //original:  const eventsForDay = data?.find((e) => e.Date === dayString);

              if (eventsForDay) {
                const eventDiv = document.createElement('div');
                checkedEvents = eventForDay.CalendarEvents;
                if (checkedEvents[eventDetails].Completed == 'True') {
                  eventDiv.classList.add('completedEvent');
                } else {
                  // console.log('false');
                  eventDiv.classList.add('event');
                }
                eventDiv.innerText = eventForDay.LastName;
                //original:  eventDiv.innerText = eventsForDay.Title;

                daySquare.appendChild(eventDiv);
                daySquare.addEventListener('click', () => {
                  // prettier-ignore
                  dailyTaskListDate.innerText = `${tasklistDate.toLocaleDateString('en-us', {month: 'long',})} ${rep - paddingDays}, ${year}`;
                });
              }
            }
          }
        }

        daySquare.addEventListener('click', () => {
          console.log(`${dayString}`);
          dailyTaskListDate.innerText = `${dayString}`;
          renderDailyTaskList(rep - paddingDays, month + 1, year);
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
renderDailyTaskList(todaysDay, todaysMonth, todaysYear);
