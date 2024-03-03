const meal = [];    // Array to store information about food products consumed in a meal
let totalCalories = 0;  // Variable to store the total consumed calories

// Event listener for the form element with id 'product-form', listening for the "submit" event. 
// When the form is submitted, the event handler function is called.
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // The event handler function retrieves the values entered by the user: product name and weight of the product. 
    const product = document.getElementById('product').value;
    const weight = parseFloat(document.getElementById('weight').value);

    // Then, it checks if the provided data is valid (product is not empty, weight is a number greater than zero).
    if (!product || isNaN(weight) || weight <= 0) {
        alert('Please enter valid product and weight.');
        return;
    }

    // If the data is valid, a POST request is sent to the server to get information about the calories for the given product and weight.
    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product, weight })
    })
    // After receiving the response from the server (which contains information about the calories), 
    .then(response => response.json())
    .then(data => {
        // the calorie view for the given product is updated
        const caloriesContainer = document.getElementById('calories-container');
        caloriesContainer.innerHTML = `${data.calories}`;

        // user interfaces are updated: an entry is added to the meal list, 
        const entry = { product, weight, calories: data.calories };
        meal.push(entry);
        updateMealUI();

        // the total number of consumed calories is updated.
        totalCalories += data.calories;
        updateTotalCaloriesUI();
    })
    .catch(error => {
        console.error('Error calculating calories:', error);
        alert('An error occurred while calculating calories. Please try again.');
    });
});

// Updating the user interface related to the meal list
function updateMealUI() {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '<h3>Meal</h3>';
    meal.forEach((entry, index) => {
        const productEntry = document.createElement('div');
        productEntry.classList.add('product-entry');
        productEntry.innerHTML = `
            <p>Product: ${entry.product}, Weight: ${entry.weight}g, Calories: ${entry.calories}
            <button onclick="deleteProduct(${index})" style="border: none; background: none; padding: 0;"><i class="fa-solid fa-trash" style="font-size: 20px; color: white;"></i></button>
            </p>
        `;
        mealContainer.appendChild(productEntry);
    });
}

// Deleting products from the list
function deleteProduct(index) {
    const deletedEntry = meal.splice(index, 1)[0];
    totalCalories -= deletedEntry.calories;
    updateMealUI();
    updateTotalCaloriesUI();
}

// Updating the total consumed calories
function updateTotalCaloriesUI() {
    document.getElementById('total-calories').textContent = totalCalories;
}
