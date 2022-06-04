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

function _getContributionDetailsTableBody() {
  let contributionDetailsTable = _getContributionDetailsTable();
  return contributionDetailsTable.tBodies.contributionDetailsTableBody;
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

  rowData.name.appendChild(document.createTextNode(String(name)));
  rowData.amount.appendChild(document.createTextNode(Number(amount)));

  _populateTableRowWithTableDataCells(row, rowData);

  return row;
}

function _appendChildToContributionDetailsTableBody(row) {
  let contributionDetailsTableBody = _getContributionDetailsTableBody();

  contributionDetailsTableBody.appendChild(row);
}

/* ----------- */

/* ContributionDetailsTable Rederers */

function _renderContributionDetailsTable() {
  _resetContributionDetailsTableBody();

  contributors.forEach((contributor) => {
    _appendChildToContributionDetailsTableBody(
      _createNewContributionDetailsTableRow(
        contributor.name,
        contributor.amount
      )
    );
  });
}

function _renderContributionDetails() {
  let contributionDetailsTableBody = _getContributionDetailsTableBody();
  let contributionDetailsTableTotal = _getContributionDetailsTableTotal();
  let contributionDetailsTableEach = _getContributionDetailsTableEach();
  let numberOfRows = Number(contributionDetailsTableBody.rows.length);

  let total = 0;

  for (let i = 0, row; (row = contributionDetailsTableBody.rows.item(i)); i++) {
    total += Number(row.cells.amount.innerText.valueOf());
  }

  if (numberOfRows == 0) {
    contributionDetailsTableEach.innerHTML = 0;
  } else {
    contributionDetailsTableEach.innerHTML = (
      total / numberOfRows
    ).toLocaleString();
  }

  contributionDetailsTableTotal.innerHTML = total.toLocaleString();
}

/* ----------- */

/* Public functions */

function resetContributionDetailsTable() {
  contributors = new Array();

  _renderContributionDetailsTable();
  _renderContributionDetails();
}

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
