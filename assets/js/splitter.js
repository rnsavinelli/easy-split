function resetFriendsTable() {
  let friendsTableChildNodes =
    document.getElementById("friendsTableBody").childNodes;
  friendsTableChildNodes.forEach((friend) =>
    friend.parentNode.removeChild(friend)
  );

  updateTotal();
  updateEach();
}

function createNewTableTextData(content) {
  let td = document.createElement("td");
  let text = document.createTextNode(String(content));

  td.appendChild(text);

  return td;
}

function createNewFriendsTableRow(data) {
  let numberOfFriendsTableChildNodes =
    document.getElementById("friendsTableBody").childNodes.length;

  let newFriendsTableRow = document.createElement("tr");

  let number = createNewTableTextData(numberOfFriendsTableChildNodes);
  newFriendsTableRow.appendChild(number);

  let name = createNewTableTextData(data.name);
  newFriendsTableRow.appendChild(name);

  let amount = createNewTableTextData(data.amount);
  newFriendsTableRow.appendChild(amount);

  let contribution = createNewTableTextData(0);
  newFriendsTableRow.appendChild(contribution);

  return newFriendsTableRow;
}

function addFriend(data) {
  let friendsTable = document.getElementById("friendsTableBody");

  let newTableRow = createNewFriendsTableRow(data);

  friendsTable.appendChild(newTableRow);
}

function updateContributions() {
  let friendsTableChildNodes =
    document.getElementById("friendsTableBody").childNodes;

  let total = Number(document.getElementById("total").innerText);

  friendsTableChildNodes.forEach((friend) => {
    let amount = friend.cells[2].innerText.valueOf();
    friend.cells[3].innerText = (Number(amount / total) * 100).toLocaleString();
  });
}

function updateTotal() {
  let friendsTableChildNodes =
    document.getElementById("friendsTableBody").childNodes;

  let textTotal = document.getElementById("total");
  let total = 0;

  friendsTableChildNodes.forEach(
    (friend) => (total += Number(friend.cells[2].innerText.valueOf()))
  );

  textTotal.innerText = total.toLocaleString();
}

function updateEach() {
  let total = Number(document.getElementById("total").innerText);
  let numberOfFriendsTableChildNodes = document
    .getElementById("friendsTableBody")
    .childNodes.length.valueOf();

  let each = document.getElementById("each");

  each.innerHTML = (total / numberOfFriendsTableChildNodes).toLocaleString();
}

function updateContributionDetails() {
  updateTotal();
  updateEach();
  updateContributions();
}

var friendsInputForm = document.getElementById("friendsInputForm");
friendsInputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const inputData = Object.fromEntries(formData);

  addFriend(inputData);

  updateContributionDetails();

  e.target.reset();
});
