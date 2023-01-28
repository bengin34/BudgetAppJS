
    const budgetFeedback = document.querySelector(".budget-feedback");
    const expenseFeedback = document.querySelector(".expense-feedback");
    const budgetForm = document.getElementById("budget-form");
    const budgetInput = document.getElementById("budget-input");
    const budgetAmount = document.getElementById("budget-amount");
    const expenseAmount = document.getElementById("expense-amount");
    const balance = document.getElementById("balance");
    const balanceAmount = document.getElementById("balance-amount");
    const expenseForm = document.getElementById("expense-form");
    const expenseInput = document.getElementById("expense-input");
    const amountInput = document.getElementById("amount-input");
    const expenseList = document.getElementById("expense-list");
   
    let itemID = 0;
    let itemList = [];

    // //new instance of UI Class
    // const inst = new UI();


  //budget form submit
  budgetForm.addEventListener('submit', e =>{
    e.preventDefault();
    submitBudgetForm();
  })
  
  //expense form submit 
  expenseForm.addEventListener('submit', e =>{
    e.preventDefault();
    submitExpenseForm();

  })
  
  //expense list submit
  
  expenseList.addEventListener('click', e =>{
    if(e.target.parentElement.classList.contains('edit-icon')){
      editExpense(e.target.parentElement);
    }else if (e.target.parentElement.classList.contains('delete-icon')){
  
    }
  })
  


  //submit budget method
  
  function submitBudgetForm(){
    const value = budgetInput.value;
    if(value === '' || value < 0){
    budgetFeedback.classList.add('showItem');
    budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
      
      setTimeout(function(){
      budgetFeedback.classList.remove('showItem');
      }, 3000);
    } else {
      budgetAmount.textContent = value;
      budgetInput.value = '';
      showBalance();
    }
  }
  
// show balance
function  showBalance(){
    let expense = totalExpense();
    let total = parseInt(budgetAmount.innerText) - expense;
    balanceAmount.textContent = total;
    if(total < 0){
      balance.classList.remove('showGreen','showBlack')
      balance.classList.remove('showRed')
    }else if(total > 0){
      balance.classList.remove('showRed','showBlack')
      balance.classList.add('showGreen')
    } else if(total == 0){
      balance.classList.remove('showRed','showGreen');
      balance.classList.add('showBlack');
    }
    
  }
  
//submit expense form 
function   submitExpenseForm(){
    const expenseValue =expenseInput.value;
    const amountValue =amountInput.value;
    if(expenseValue == '' || amountValue == 0 || amountValue < 0) {
      expenseFeedback.classList.add('showItem');
      expenseFeedback.innerHTML = `<p> values cannot be empty or negative </p>`;
      
      setTimeout(function(){
      expenseFeedback.classList.remove('showItem')
      },3000)
    }else{
      let amount = parseInt(amountValue);
      expenseInput.value = '';
      amountInput.value = '';
     
      //!define new element as an expense
      let expense = {
        id:itemID,
        title: expenseValue,
        amount: amount
      }
      itemID++;
      itemList.push(expense);
      addExpense(expense);
      showBalance();

  }
}

//add expense

function   addExpense(expense){
    const expenseDiv = document.createElement('div');
    expenseDiv.classList.add('expense');
    expenseDiv.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

      <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
      <h5 class="expense-amount mb-0 list-item">$${expense.amount}</h5>

      <div class= "expense-icons list-item">
        <a href="#" class="edit-icon mx-2" data-id="${expense.id}" ><i class="fas fa-edit"></i></a>
        <a href="#" class="delete-icon" data-id="${expense.id}">
        <i class="fas fa-trash"></i></a>
      </div>
    </div
    `;
    expenseList.appendChild(expenseDiv)
  }


  //total expense
  function   totalExpense(){
      if(itemList.length > 0){
      
      }
     
    
    }

    // edit expense 

    function editExpense(){
      let id = parseInt(element.dataset.id);
      let parent = element.parentElement.parentelement.parentElement;
      //remove from DOM
      expenseList.removeChild(parent);
      //remove from the list
    let tempList = itemList.filter(item => {
      return item.id !==id;
    })
    itemList = tempList;
    showBalance();
    }
  
    

  

  

  