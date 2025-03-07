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
    // MAIN LOGIC


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