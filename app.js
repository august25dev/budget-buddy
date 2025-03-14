// OVERVIEW
    // INITIAL DATA
        // - categories array
    // MODALS
        // - modal for displaying expenses
        // - modal2 for expense input
        // - modal for settings
    // FUNCTIONS
        // - loadBudgetTable
        // - saveExpense
        // - getExpenses
        // - displayExpenses
        // - deleteExpenseFromLocalStorage
        // - updateAmounts
        // - openModal
        // - handleCategoryClick
        // - enableDynamicDecimalInput
        // - settings
        // - updateBudget
        // - getBudgets
        // - updateCategories
        // - initializeBudgets
        // - updateCategoryNames
        // - loadTermsModalContent
    // MAIN LOGIC
        // - initialize
        // - make table cells clickable


// INITIAL DATA 
    // categories array
    const categories = [
    { name: "empty", budget: 0.00 },
    { name: "empty", budget: 0.00 },
    { name: "empty", budget: 0.00 },
    { name: "empty", budget: 0.00 },
    { name: "empty", budget: 0.00 }
    ];


// MODALS
    // modal for displaying expenses
        // Get the modal and close button elements and heading
        const modal = document.getElementById("myModal");
        const closeButton = document.getElementById("closeModal");
        const modalHeading = document.getElementById("modalHeading");

        // Event listener for the close button
        closeButton.onclick = () => {
        modal.style.display = "none"; // Hide the modal
        };

        // Close the modal when clicking outside of it
        window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        };

    // modal2 for expense input
        // Get the modal and close button elements and heading
        const modal2 = document.getElementById("myModal2");
        const closeButton2 = document.getElementById("closeModal2");
        const modalHeading2 = document.getElementById("modalHeading2");

        // disable scrolling
        document.getElementById("myModal2").addEventListener("touchmove", function(event) {
        event.preventDefault();
        }, { passive: false }); // Disable touch scrolling

        // Event listener for the close button
        closeButton2.onclick = () => {
        modal2.style.display = "none"; // Hide the modal
        };

        // Close the modal when clicking outside of it
        window.onclick = (event) => {
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
        };

    // modal for settings
        // Get the button and modal elements
        const settingsButton = document.getElementById("settingsButton");
        const settingsModal = document.getElementById("settingsModal");
        const closeSettingsModal = document.getElementById("closeSettingsModal");
        const settingsModalHeading = document.getElementById("settingsModalHeading");

        // Close the modal when the close button is clicked
        closeSettingsModal.addEventListener("click", () => {
        settingsModal.style.display = "none";
        });

        // Close the modal when clicking outside the modal content
        window.addEventListener("click", (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = "none";
        }
        });

    // modal for showing terms
      const termsModal = document.getElementById("termsModal");
      // close modal if agree button is pressed
        // ...


// FUNCTIONS
  // function to load categories and budgets into the table
  function loadBudgetTable() {
    const tableBody = document.getElementById("budgetTableBody");
    tableBody.innerHTML = ""; // Clear any existing rows

    // Variable to store the total budget amount
    let totalBudget = 0;

    // Add each category row
    categories.forEach(category => {
      const row = document.createElement("tr");

      // Category Name
      const nameCell = document.createElement("td");
      nameCell.textContent = category.name;
      row.appendChild(nameCell);

      // Amount Left (Initial budget for now)
      const budgetCell = document.createElement("td");
      budgetCell.textContent = category.budget.toFixed(2);
      row.appendChild(budgetCell);

      // Append row to table
      tableBody.appendChild(row);

      // Add to total budget
      totalBudget += category.budget;
    });

    // Add the total row
    const totalRow = document.createElement("tr");

    const totalLabelCell = document.createElement("td");
    totalLabelCell.textContent = "total";
    totalLabelCell.style.fontWeight = "bold";
    totalRow.appendChild(totalLabelCell);

    const totalAmountCell = document.createElement("td");
    totalAmountCell.textContent = totalBudget.toFixed(2);
    totalAmountCell.style.fontWeight = "bold";
    totalRow.appendChild(totalAmountCell);

    tableBody.appendChild(totalRow);
  }

  // function to save an expense to local storage
  function saveExpense(rowIndex, amount) {
    const expenses = getExpenses();
    const expense = {
      id: Date.now(), // Unique ID based on timestamp
      rowIndex,
      amount
    };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }  

  // function to retrieve all expenses
  function getExpenses() {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  }

  // function to display expenses 
  function displayExpenses(rowIndex) {
    // Get modal content element
    const modalContent = document.getElementById("modalContent");
  
    // Clear previous content
    modalContent.innerHTML = "";
  
    // Retrieve expenses for the selected category
    const expenses = getExpenses().filter(expense => expense.rowIndex === rowIndex);
  
    // Create checkboxes for each expense
    expenses.forEach((expense, index) => {
      // Create a container div for the checkbox
      const expenseDiv = document.createElement("div");
      expenseDiv.style.display = "flex";
      expenseDiv.style.alignItems = "center";
      expenseDiv.style.marginBottom = "10px";
      
      // Create the checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `expense-${index}`;
      checkbox.style.marginRight = "10px";
  
      // Create the label
      const label = document.createElement("label");
      label.htmlFor = `expense-${index}`;
      label.textContent = expense.amount;
  
      // Append checkbox and label to the container div
      expenseDiv.appendChild(checkbox);
      expenseDiv.appendChild(label);
  
      // Append the container div to the modal content
      modalContent.appendChild(expenseDiv);
    });
  
    // Add a delete button at the bottom
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete selected expenses";
    deleteButton.style.marginTop = "20px";
    deleteButton.style.padding = "10px 20px";
    deleteButton.style.border = "none";
    deleteButton.style.backgroundColor = "#e74c3c";
    deleteButton.style.color = "white";
    deleteButton.style.borderRadius = "5px";
    deleteButton.style.cursor = "pointer";
  
    // Add event listener to handle deletion
    deleteButton.addEventListener("click", () => {
      const checkboxes = modalContent.querySelectorAll("input[type='checkbox']");
      const confirmed = confirm("Are you sure you want to delete the selected expenses?");
      if (confirmed) {
        checkboxes.forEach((checkbox, index) => {
          if (checkbox.checked) {
            const expenseToDelete = expenses[index];
            deleteExpenseFromLocalStorage(expenseToDelete); // Custom function to remove expense
            updateAmounts();
          }
        });
        displayExpenses(rowIndex); // Refresh the modal content after deletion
      }
    });
  
    // Append delete button to modal content
    modalContent.appendChild(deleteButton);
  }
  
  // function to delete expense from localStorage
  function deleteExpenseFromLocalStorage(expenseToDelete) {
    const expenses = getExpenses();
    
    // Filter out the expense with the same unique ID
    const updatedExpenses = expenses.filter(
      expense => expense.id !== expenseToDelete.id
    );
    
    // Update localStorage with the new array
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  }  

  // function to calculate and update the amount left for each category
  function updateAmounts() {
    const tableRows = document.querySelectorAll("tr"); // Assume categories are in table rows
    let totalAmount = 0;  // Variable to hold the total sum of all amounts
    let totalBudget = 0; // Variable to hold the total sum of all budgets
  
    tableRows.forEach((row) => {
      const categoryCell = row.querySelector("td:first-child");
      const amountCell = row.querySelector("td:last-child");

      // get row index
      rowIndex = Array.from(tableRows).indexOf(row)-1; // starts at 0 !!!
  
      if (categoryCell && amountCell) {
        // Find the category in the categories array
        const categoryData = categories[rowIndex];
  
        if (categoryData) {
          // Calculate total expenses for this category
          const expenses = getExpenses()
            .filter((expense) => expense.rowIndex === rowIndex)
            .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
          
          // Calculate amount left
          const amountLeft = categoryData.budget - expenses;

          // Update the amount cell
          amountCell.textContent = `${amountLeft.toFixed(2)} / ${categoryData.budget.toFixed(2)}`;
  
          // Add the amount left to the totalAmount
          totalAmount += amountLeft;

          // Add the budget to the totalBudget
          totalBudget += categoryData.budget;
        }
      }
    });
  
    // Now update the total amount cell (last td in the table)
    const totalAmountCell = document.querySelector("table tr:last-child td:last-child");
    if (totalAmountCell) {
      totalAmountCell.textContent = `${totalAmount.toFixed(2)} / ${totalBudget.toFixed(2)}`;
    }
  }

  // function to open the modal with a dynamic heading
  function openModal(rowIndex) {
    const category = categories[rowIndex]; // Access category data using the index
    modalHeading.textContent = `${category.name}`; // Set the modal heading to the category name
    modal.style.display = "block"; // Show the modal
    // Set heading for settings modal
    settingsModalHeading.textContent = `Category ${rowIndex + 1}`; // Use index to label the category
  }

  // function to handle category click: user input of expenses
  function handleCategoryClick(rowIndex) {
    // set heading
    const category = categories[rowIndex];
    modalHeading2.textContent = `${category.name}`;

    // show modal2
    modal2.style.display = "block";

    // Get modal content element
    const modalContent2 = document.getElementById("modalContent2");
  
    // Clear previous content
    modalContent2.innerHTML = "";

    const inputContainer = document.getElementById('input-container');
    const expenseInput = document.getElementById('expense-input');
  
    // Show input container
    inputContainer.style.display = 'block';
  
    // Focus on the input field automatically
    expenseInput.value = ''; // Clear previous input
    expenseInput.focus();
    
    // Enable dynamic decimal input (calls function)
    enableDynamicDecimalInput(expenseInput);

    // submit button (is this a weird place for a button?)
    const submitButton = document.createElement("button");
    submitButton.textContent = "submit expense";
    submitButton.style.marginTop = "20px";
    submitButton.style.fontSize = "26px"; // Adjust size as needed: original: 16px
    submitButton.style.padding = "20px 40px"; // original: 10px 20px
    submitButton.style.border = "none";
    submitButton.style.backgroundColor = "#e74c3c";
    submitButton.style.color = "white";
    submitButton.style.borderRadius = "5px";
    submitButton.style.cursor = "pointer";

    // Append submit button to modal content
    modalContent2.appendChild(submitButton);

    // Submit button handler
    submitButton.addEventListener("click", () => {
      const value = parseFloat(expenseInput.value);
      if (!isNaN(value)) {
        // Save the expense
        saveExpense(rowIndex, value.toFixed(2));
        updateAmounts();
      } else {
        alert('Please enter a valid amount');
      }
      inputContainer.style.display = 'none'; // Hide the input container after submission
      modal2.style.display = "none"; // hide modal2 after submission
    });

  }

  // function that enables dynamic input
  function enableDynamicDecimalInput(inputElement) {
    inputElement.addEventListener("input", () => {
      // Get the raw value (digits only)
      const rawValue = inputElement.value.replace(/\D/g, ""); 
  
      // Format the value as a decimal (e.g., 123 -> 1.23)
      const formattedValue = (parseInt(rawValue, 10) / 100).toFixed(2);
  
      // Update the input with the formatted value
      inputElement.value = formattedValue;
    });
  
    // Clear the value when the user focuses on the input
    inputElement.addEventListener("focus", () => {
      inputElement.value = "";
    });
  
    // Reformat the value when the input loses focus
    inputElement.addEventListener("blur", () => {
      if (inputElement.value === "") {
        inputElement.value = "0.00";
      }
    });
  }

  // function that handles settings
  function settings(rowIndex) {
    // define category
    const category = categories[rowIndex];

    // Get modal content element
    const modalContent = document.getElementById("SettingsModalContent");
    // Get 2nd modal content element
    const modalContent2 = document.getElementById("SettingsModalContent2");
    // Clear previous content
    modalContent.innerHTML = "";
    modalContent2.innerHTML = "";
    // Open the settings modal
    settingsModal.style.display = "block";
    // heading set in openModal fct

    // set budget
      const inputContainer = document.getElementById('input-container-budget');
      const budgetInput = document.getElementById('budget-input');
    
      // Show input container
      inputContainer.style.display = 'block';
    
      // Focus on the input field automatically
      budgetInput.value = ''; // Clear previous input
      // budgetInput.focus();
      
      // Enable dynamic decimal input (calls function)
      enableDynamicDecimalInput(budgetInput);

      // submit button (is this a weird place for a button?)
      const submitButton = document.createElement("button");
      submitButton.textContent = "update budget";
      submitButton.style.marginTop = "20px";
      submitButton.style.marginBottom = "20px";
      submitButton.style.padding = "10px 20px";
      submitButton.style.border = "none";
      submitButton.style.backgroundColor = "#e74c3c";
      submitButton.style.color = "white";
      submitButton.style.borderRadius = "5px";
      submitButton.style.cursor = "pointer";

      // Append submit button to modal content
      SettingsModalContent.appendChild(submitButton);

      // Submit button handler
      submitButton.addEventListener("click", () => {
        const value = parseFloat(budgetInput.value);
        if (!isNaN(value)) {
          updateBudget(rowIndex, value)
        } else {
          alert('Please enter a valid amount');
        }
        inputContainer.style.display = 'none'; // Hide the input container after submission
        settingsModal.style.display = "none"; // hide settings after submission
      });

    // set name
      const inputContainer2 = document.getElementById('input-container-name');
      const nameInput = document.getElementById('name-input');

      // Show input container 2
      inputContainer2.style.display = 'block';

      // Focus on the input field automatically
      nameInput.value = ''; // Clear previous input
      // nameInput.focus();

      // submit button 2 (is this a weird place for a button?)
      const submitButton2 = document.createElement("button");
      submitButton2.textContent = "update name";
      submitButton2.style.marginTop = "20px";
      submitButton2.style.padding = "10px 20px";
      submitButton2.style.border = "none";
      submitButton2.style.backgroundColor = "#e74c3c";
      submitButton2.style.color = "white";
      submitButton2.style.borderRadius = "5px";
      submitButton2.style.cursor = "pointer";

      // Append submit button 2 to modal content 2
      SettingsModalContent2.appendChild(submitButton2);

      // Submit button 2 handler
      submitButton2.addEventListener("click", () => {
        let newCategoryName = nameInput.value.trim();
      
        // Update the category name in the categories array
        if (category) {
          if (newCategoryName === "") {
            newCategoryName = "empty";
          } 
          category.name = newCategoryName;
        }
      
        // Update budgets with the new category name
        updateBudget(rowIndex, category.budget, newCategoryName);
      
        // Close modal
        inputContainer2.style.display = "none";
        settingsModal.style.display = "none";
      });      
  }

  // function to update budget or name
  function updateBudget(rowIndex, newBudget, newCategoryName = null) {
    const budgets = getBudgets();

    // Update existing budget and category name if provided
    budgets[rowIndex].newBudget = newBudget;
    if (newCategoryName) {
      budgets[rowIndex].categoryName = newCategoryName;
    }
  
    // Save updated budgets to local storage
    localStorage.setItem("budgets", JSON.stringify(budgets));
  
    // Update the in-memory categories
    updateCategories();
  
    // Update displayed amounts
    updateAmounts();

    // Update displayed category names
    updateCategoryNames();
  }   

  // function to retrieve all budgets
  function getBudgets() {
    return JSON.parse(localStorage.getItem("budgets")) || [];
  }
  
  // function to update categories array with values from local storage
  function updateCategories() {
    const storedBudgets = getBudgets();

    categories.forEach((category, index) => {
      // Directly access the stored budget using the index
      const storedBudget = storedBudgets[index];
    
      // If a budget is found, update the category's budget
      if (storedBudget) {
        category.budget = storedBudget.newBudget;
      } else {
        // If no budget is found in local storage, set a default value (e.g., 0)
        category.budget = 0;
      }
    });    
  }

  // function to initialize budgets
  function initializeBudgets() {
    let budgets = getBudgets();
    if (budgets.length !== 5) {
      budgets = Array.from({ length: 5 }, (_, index) => ({
        id: index, // Use static indices
        categoryName: `empty`,
        newBudget: 0,
      }));
      localStorage.setItem("budgets", JSON.stringify(budgets));
    }
    // set categories array to stored values
    for (let i = 0; i < 5; i++) {
      categories[i].name = budgets[i].categoryName;
      categories[i].budget = budgets[i].newBudget;
    }
  }  

  // function to update category names in table
  function updateCategoryNames() {
    const tableRows = document.querySelectorAll("tr");
    tableRows.forEach((row) => {
      const categoryCell = row.querySelector("td:first-child");
      rowIndex = Array.from(tableRows).indexOf(row)-1; // starts at 0 !!!
      if (categoryCell) {
        const categoryData = categories[rowIndex];
        if (categoryData) {
          categoryCell.textContent = `${categoryData.name}`;
        }
      }
    });
  }

  // function to load termsModal content
  function loadTermsModalContent(){
    // Get modal content element
    const modalContent = document.getElementById("termsModalContent");

    // Clear previous content
    modalContent.innerHTML = "";

    // checkbox to not show terms again --> TODO: TEST THIS!!!   
      // variable to store choice of showing terms (1: show, 0: don't show)
      let showTerms;
      showTerms = localStorage.getItem("showTerms"); // get the value from localStorage

      // Create a container div for the checkbox
      const checkboxDiv = document.createElement("div");
      checkboxDiv.style.display = "flex";
      checkboxDiv.style.alignItems = "center";
      checkboxDiv.style.marginBottom = "10px";
      
      // Create the checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `show_terms_checkbox`;
      checkbox.style.marginRight = "10px";

      // Create the label
      const label = document.createElement("label");
      label.htmlFor = `show_terms_checkbox`;
      label.textContent = "do not show again";

      // check checkbox if choice was made before
      if (showTerms == 0) {
        checkbox.checked = 1;
      }

      // Append checkbox and label to the container div
      checkboxDiv.appendChild(checkbox);
      checkboxDiv.appendChild(label);

      // Append the container div to the modal content
      modalContent.appendChild(checkboxDiv);

      // Do not show terms again if checkbox is checked
      checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
          showTerms = 0;
          localStorage.setItem("showTerms", JSON.stringify(showTerms));
        } else {
          showTerms = 1;
          localStorage.setItem("showTerms", JSON.stringify(showTerms));
        }
      });

    // agree button
      // Add a agree button at the bottom
      const agreeButton = document.createElement("button");
      agreeButton.textContent = "agree";
      agreeButton.style.marginTop = "20px";
      agreeButton.style.padding = "10px 20px";
      agreeButton.style.border = "none";
      agreeButton.style.backgroundColor = "#e74c3c";
      agreeButton.style.color = "white";
      agreeButton.style.borderRadius = "5px";
      agreeButton.style.cursor = "pointer";
    
      // Append agree button to modal content
      modalContent.appendChild(agreeButton);

      // close termsModal if agree button is pressed
      agreeButton.addEventListener("click", () => {
        termsModal.style.display = "none";
      });
  }


// MAIN LOGIC
    // show terms modal after loading finished
    document.addEventListener("DOMContentLoaded", () => {
      // variable to store choice of showing terms (1: show, 0: don't show)
      let showTerms;
      if (localStorage.getItem("showTerms") !== null) {
          showTerms = localStorage.getItem("showTerms"); // If it exists, get the value from localStorage
      } else {
        showTerms = 1;
        localStorage.setItem("showTerms", showTerms); // If it doesn't exist, set showTerms to 1 and save it in localStorage
      }
      if (showTerms == 1) {
        loadTermsModalContent();
        termsModal.style.display = "block";
      }
    });

    // initialize
        initializeBudgets(); // initialize budgets
        loadBudgetTable(); // Load table
        updateCategories(); // set categories array to local storage values
        updateAmounts(); // update amounts so that amount left is up to date after page refresh

    // make table cells clickable
        // Select all the rows in the budgetTableBody
        const rows = document.querySelectorAll("#budgetTableBody tr");
        // Convert rows to an array and exclude the last one
        const allRowsExceptLast = Array.from(rows).slice(0, -1);
        // Loop through each row except the last one
        allRowsExceptLast.forEach((row) => {
            // make category clickable
                // Select the first cell (category) in each row
                const categoryCell = row.querySelector("td:first-child");
                // Add a click event listener if the categoryCell exists: expense input
                if (categoryCell) {
                    categoryCell.addEventListener("click", () => {
                        // get row index
                        rowIndex = Array.from(allRowsExceptLast).indexOf(row); // starts at 0
                        // Call the function to handle category click with the category name
                        handleCategoryClick(rowIndex);
                    });
                }
            // make amount left clickable
                // Select the second cell (amount left) in each row
                const amountLeftCell = row.querySelector("td:nth-child(2)");
                // Add a click event listener if the amountCell exists
                if (amountLeftCell) {
                    amountLeftCell.addEventListener("click", () => {
                        // get row index
                        rowIndex = Array.from(allRowsExceptLast).indexOf(row); // starts at 0
                        openModal(rowIndex);
                        displayExpenses(rowIndex); // Shows expenses for the selected category
                        // open settings modal if gear icon is pressed
                        settingsButton.addEventListener("click", () => {
                            // Close the current modal for displaying expenses
                            modal.style.display = "none";
                            settings(rowIndex)
                        });
                    });
                }
        });