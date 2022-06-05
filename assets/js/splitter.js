/* Global Variables */

var contributors = new Array();

/* --------------- */

/* Data Structures / Classes */

class Contributor {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }

  getName() {
    return this.name;
  }

  getAmount() {
    return this.amount;
  }
}

/* ------------------------ */

/* DOM Elements */

function _getContributionDetailsTable() {
  return document.getElementById("contributionDetailsTable");
}

function _getContributionDetailsTableBody() {
  let contributionDetailsTable = _getContributionDetailsTable();
  return contributionDetailsTable.tBodies.contributionDetailsTableBody;
}

function _getContributionDetailsTableHead() {
  let contributionDetailsTable = _getContributionDetailsTable();
  return contributionDetailsTable.tHead;
}

function _getContributionDetailsTableInputForm() {
  return document.getElementById("contributionDetailsTableInputForm");
}

function _getContributionDetailsTableTotal() {
  return document.getElementById("total");
}

function _getContributionDetailsTableEach() {
  return document.getElementById("each");
}

/* ------------ */

/* DOM Helpers */

function _newTableRow() {
  return document.createElement("tr");
}

function _newTableDataCell() {
  return document.createElement("td");
}

function _newTextNode(text) {
  return document.createTextNode(String(text));
}

function _newTableHeading() {
  let th = document.createElement("th");
  th.scope = "col";

  return th;
}

/* ----------- */

/* ContributionDetailsTable Helpers */

function _resetContributionDetailsTableBody() {
  let contributionDetailsTableBody = _getContributionDetailsTableBody();
  while (contributionDetailsTableBody.firstChild) {
    contributionDetailsTableBody.removeChild(
      contributionDetailsTableBody.firstChild
    );
  }
}

function _resetContributionDetailsTableHead() {
  let contributionDetailsTableHeader = _getContributionDetailsTableHead();
  while (contributionDetailsTableHeader.firstChild) {
    contributionDetailsTableHeader.removeChild(
      contributionDetailsTableHeader.firstChild
    );
  }
}

function _createNewContributionDetailsTableRowElement() {
  let newContributionDetailsTableRowElement = {
    name: _newTableDataCell(),
    amount: _newTableDataCell(),
  };

  newContributionDetailsTableRowElement.name.id = "name";
  newContributionDetailsTableRowElement.amount.id = "amount";

  return newContributionDetailsTableRowElement;
}

function _populateTableRowWithTableDataCells(row, rowData) {
  row.appendChild(rowData.name);
  row.appendChild(rowData.amount);
}

function _createNewContributionDetailsTableRow(name, amount) {
  let row = _newTableRow();
  let rowData = _createNewContributionDetailsTableRowElement();

  rowData.name.appendChild(_newTextNode(String(name)));
  rowData.amount.appendChild(_newTextNode(Number(amount)));

  _populateTableRowWithTableDataCells(row, rowData);

  return row;
}

function _appendChildToContributionDetailsTableBody(row) {
  let contributionDetailsTableBody = _getContributionDetailsTableBody();

  contributionDetailsTableBody.appendChild(row);
}

function _createNewContributionDetailsTableHeading() {
  let row = _newTableRow();

  let name = _newTableHeading();
  let amount = _newTableHeading();

  name.id = "name";
  amount.id = "amount";

  name.appendChild(_newTextNode("Name"));
  amount.appendChild(_newTextNode("Amount ($)"));

  row.appendChild(name);
  row.appendChild(amount);

  return row;
}

function _createNewContributionDetailsTableEmptyMessageHeading() {
  let row = _newTableRow();
  let heading = _newTableHeading();

  let message = _newTextNode(
    "No friends have been added to the contributors list!"
  );

  heading.classList.add("text-muted","text-center", "fw-normal");

  heading.appendChild(message);

  row.appendChild(heading);

  return row;
}

function _appendChildToContributionDetailsTableHead(row) {
  let contributionDetailsTableHead = _getContributionDetailsTableHead();

  contributionDetailsTableHead.appendChild(row);
}

/* ----------- */

/* ContributionDetailsTable Rederers */

function _renderContributionDetailsTableHead() {
  let contributionDetailsTableHeading =
    _createNewContributionDetailsTableHeading();
  _appendChildToContributionDetailsTableHead(contributionDetailsTableHeading);
}

function _renderContributionDetailsTableEmptyMessage() {
  let contributionDetailsTableHeading =
    _createNewContributionDetailsTableEmptyMessageHeading();
  _appendChildToContributionDetailsTableHead(contributionDetailsTableHeading);
}

function _renderContributionDetailsTable() {
  _resetContributionDetailsTableHead();
  _resetContributionDetailsTableBody();

  if (contributors.length < 1) {
    _renderContributionDetailsTableEmptyMessage();
  } else {
    _renderContributionDetailsTableHead();

    contributors.forEach((contributor) => {
      _appendChildToContributionDetailsTableBody(
        _createNewContributionDetailsTableRow(
          contributor.getName(),
          contributor.getAmount()
        )
      );
    });
  }
}

function _renderContributionDetails() {
  let contributionDetailsTableTotal = _getContributionDetailsTableTotal();
  let contributionDetailsTableEach = _getContributionDetailsTableEach();
  let numberOfContributors = contributors.length;

  let total = contributors
    .map((contributor) => contributor.getAmount())
    .reduce(
      (fistAmount, secondAmount) => Number(fistAmount) + Number(secondAmount),
      Number(0)
    );

  if (numberOfContributors == 0) {
    contributionDetailsTableEach.innerHTML = 0;
  } else {
    contributionDetailsTableEach.innerHTML = (
      total / numberOfContributors
    ).toLocaleString();
  }

  contributionDetailsTableTotal.innerHTML = total.toLocaleString();
}

/* ----------- */

/* Public Functions */

function resetContributionDetailsTable() {
  contributors = new Array();

  _renderContributionDetailsTable();
  _renderContributionDetails();
}
/* ---------------- */

/* Event Listeners */

var contributionDetailsTableInputForm = _getContributionDetailsTableInputForm();
contributionDetailsTableInputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const inputData = Object.fromEntries(formData);

  contributors.push(new Contributor(inputData.name, inputData.amount));

  _renderContributionDetailsTable();
  _renderContributionDetails();

  e.target.reset();
});

/* -------------- */
