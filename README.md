# Test Task for a Frontend Developer

A simple expense and income tracker built using React and Ant Design.

## Features

📅 **Create, Edit, and Delete Transactions**
- Easily manage your expenses and income.
- Edit and delete transactions with a few clicks.

💰 **Income and Expense Tracking**
- Keep track of your financial transactions with income and expense categories.

📊 **Total Calculation**
- The table footer shows the difference between all income and expenses.

## Demo Screenshot

![demo-screenshot.png](https://github.com/viktoriabakun/money-money-money/blob/media/images/demo-screenshot.png)

## Try it live!

Deployed version is available [here](https://main--money-must-be-funny.netlify.app/)

Enjoy tracking your finances with "Money Must Be Funny"! 💸

## Getting Started

1. Clone the repository.
2. Install dependencies using `pnpm install`.
3. Run the app with `pnpm run dev`.

## Task Acceptance Criteria

**Preconditions:**

- UI library - [Ant Design](https://ant.design/)
- For store data use **localStorage**

1. **Create table with incomes and charges**
    1. Date column should show date in format ‘dd/mm/yyyy’, and user should be able to sort by date
    2. The “Amount” column should display income/expenses with a **“$”** after the value, and user should be able to sort by value
        1. if the type is charge, add **"-"** before the value
    3. Type column
    4. The notes column should display the notes added by the user for this transaction
    5. Action column Must contain a dropdown list with two items.
        1. **Edit**
        2. **Delete**
    6. The footer of the table should show the difference between all income and all expenses.
2. **Add new**
    1. When the user clicks the **Add New** button, the table should display a new row with inputs for each column:
        1. The Date column must contain input that, when clicked, displays a date picker.
        2. The Amount column must contain input with type number
        3. The Type column must contain select with 2 options - ‘income’ and ‘expense’
        4. The Note column must contain input with type text
        5. instead of Action dropdown should show 2 icon button **‘✕’** and ‘✓’
            1. When the user clicks "✕", this line should be removed and the data won’t be saved.
            2. When the user clicks "✓", the data should be added to localStorage and displayed in a table, and the Total value should be recalculated
3. **Edit existing data**
    1. When the user clicks the action button and selects **"Delete"**, this data should be removed from localStorage and should not appear in the table, and the Total value should be recalculated
    2. When the user clicks the action button and selects **"Edit"**, the current row should display editable cells with the default values of the edited transaction
        1. The Date column must contain input with **DatePicker**
        2. The amount column must contain input type number
        3. The Type column must contain select with 2 options
        4. The Note column should contain input type text
        5. instead of Action dropdown should show 2 icon button ‘✕’ and ‘✓’
            1. When the user presses "✕", the changes are not applied and the edit mode is exited
            2. When the user clicks "✓", the data should be updated in localStorage and displayed in the table, and the total value should be recalculated. and also exits the editing mode
