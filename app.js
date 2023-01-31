
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


  budgetForm.addEventListener('submit', e =>{
    e.preventDefault();
    submitBudgetForm();
  })
  

  expenseForm.addEventListener('submit', e =>{
    e.preventDefault();
    submitExpenseForm();

  })
  
  
  expenseList.addEventListener('click', e =>{
    if(e.target.parentElement.classList.contains('edit-icon')){
      editExpense(e.target.parentElement);
      expenseInput.focus();
      showBalance();
    }else if (e.target.parentElement.classList.contains('delete-icon')){
      removeExpense(e.target.parentElement)
      showBalance();
    }
  })
  


  
  function submitBudgetForm(){
    const value = budgetInput.value;
    if(value === '' || value < 0){
    budgetFeedback.classList.add('showItem');
    budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
      
      setTimeout(function(){
      budgetFeedback.classList.remove('showItem');
      }, 2000);
    } else {
      budgetAmount.textContent = value;
      budgetInput.value = '';
      showBalance();
    }
  }
  

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
     
      //todo new element as an expense
      let expense = {
        id:itemID,
        title: expenseValue,
        amount: amount
      }

      itemID++;
      // itemList.push(expense);
      itemList = [expense,...itemList]
      addExpense(expense);
      showBalance();

  }
}

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


  function   totalExpense(){
    let total = 0;
      if(itemList.length > 0){
      total = itemList.reduce(function(acc,curr){
        acc += curr.amount
        return acc;
      },0)
      }
      expenseAmount.innerHTML = total
      return total;
    }


    function editExpense(element){
      let id = parseInt(element.dataset.id);
      let parent = element.parentElement.parentElement.parentElement;
      expenseList.removeChild(parent);
    
      let expense = itemList.filter(item => item.id === id)
      expenseInput.value = expense[0].title;
      amountInput.value = expense[0].amount;
    let tempList = itemList.filter(item => {
      return item.id !==id;
    })
    itemList = tempList;
    showBalance();
    }

  function removeExpense(element){
    let id = parseInt(element.dataset.id)
    let parent = element.parentElement.parentElement.parentElement;

    expenseList.removeChild(parent);
  
    let tempList = itemList.filter(item => item.id !== id)
    itemList = tempList;
    showBalance();
  }
