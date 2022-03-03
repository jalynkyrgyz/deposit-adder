class Deposit {
  constructor(name, period, sum) {
    this.name = name;
    this.period = period;
    this.sum = sum;
  }
};

class UI {
  addSumToList(deposit){
    // Find the table
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement("tr");
 // Insert cols
  row.innerHTML = `
    <td>${deposit.name}</td>
    <td>${deposit.period}</td>
    <td>${deposit.sum}</td>
    <td><a href = "#" class = "delete">X</a></td>
  `; 
  // Append to table
  list.appendChild(row);
  };

  showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    const container =  document.querySelector(".container");
    const form =  document.querySelector("#book-form");  
    container.insertBefore(div,form);  
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    };
  };

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
};

/* Event Listeners */
document.getElementById("book-form").addEventListener("submit", (e) => {
  // Get form values
  const name = document.getElementById("title").value,
        period = document.getElementById("author").value,
        sum = document.getElementById("isbn").value;
  // Instance of book
  const book = new Deposit(name, period, sum);
  // Instance of UI
  const ui = new UI();
  // validation
  if (name === "" || period === "" || sum === "") {
    ui.showAlert("Заполните все поля", "error");
  } else {
    if (!isNaN(parseFloat(sum)) && isFinite(sum)) {
      // Add book to list
    ui.addSumToList(book);
    ui.showAlert("Список включен", "success");
    ui.clearFields();
    } else {
      ui.showAlert("Заполните все поля", "error")
      }
    }   
  e.preventDefault();
  // Clear fields
});

//event listener for delete
document.getElementById("book-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Список удален!", "success");
  e.preventDefault();
}) ;