/**
 * @class Respresents a list, which contains items that you have 'to do'.
 * @param {String} name - The name of this todo list.
 */
class TodoList {
  constructor(name) {
    this.name = name;
    this.items = [];
    console.log(`\nCreating new todo list ${this.name}`);
    // This is an example of an anonymous function, an IIFE (immediately invoke function
    // expression) and an arrow function. On the first line we create the
    // function with no name, and pass no parameters. In between the curly
    // braces we define what the function will do. After the curly braces we use
    // () notation to execute the function immediately.
    // This has the affect of starting the monitor during construction of the
    // todo list with out having to define a separate function.
    (() => {
      console.log(`Starting overdue monitor for ${this.name}...`)
      setInterval(this.overdueMonitor, 4000, this);
    })();
  }

  /**
   * Runs periodically to check if any item in this list is overdue.
   */
  overdueMonitor(todoList) {
    todoList.items.forEach(function(item) {
      item.checkIfOverdue();
    });
  }

  /**
   * Print the entire list.
   */
  printList() {
    // Use template strings to make string concatenation easier
    console.log(`\n${this.name} ( ${this.items.length} items) \n-------------------- `);
    // Introduce arrow function
    // Use desconstruction in the function parameter list to extract
    // the values to be used.
    this.items.forEach((item) => item.printThis());
  }
  /**
   * Add an item to the list.
   * @param {Item} item - a todo item.
   */
  addItem (item) {

    if (item!== null && item.description!==""){
      this.items.push(item);
      console.log(`Added item '${item.description}' to my '${this.name}' todo list`);
    } else {
      console.log(`***ERR: Failed to add an item to the ${name} list as it is missing a description`);
    }
  }

  /**
   * Removes an item from the list.
   * @param {Item} removeItem - the item to remove.
   */
  removeItem (removeItem) {
    if (removeItem.description !== undefined) {
      this.items.splice(this.items.indexOf(removeItem), 1);
    }
  }
}

/**
 * @class Represents an item in a todo list. An item has a due time, after
 * which the item becomes 'Overdue'.
 * @param {String} description - what has to be done.
 * @param {String} priority - how important is it.
 * @param {Number} dueIn - how many seconds before it is overdue. Defaults to 0,
 * meaning there is no due date.
 */
class Item {

  constructor(description, priority, dueIn = 0) {

    this.priorityTypes = ["High","Medium","Low"];
    this.description = "";
    this.priority;
    this.overdue = false;
    this.dueDate = null;

    if (dueIn > 0) {
      this.dueDate = (Date.parse(new Date()) + (dueIn * 1000));
    }

    if (description === undefined || description === null || description.trim() === "") {
      console.log(`***ERR: Failed to create item, no description supplied`);
    } else {
      this.description = description;
    }

    if(priority !== undefined) {
      // Ensure the priority is a valid selection
      // Use arrow function to condense code.
      this.priorityTypes.forEach(
        (priorityType) => priority === priorityType ? this.priority = priority : 'Medium');
    }
  }

  /**
   * Prints an item.
   */
  printThis(){
    let printOverdue = ( this.overdue ? '(Overdue)' : '');
    console.log(`[${this.priority}] ${this.description} ${printOverdue}`);
  }


  /**
   * Check if this item is overdue.
   */
  checkIfOverdue() {
    if (this.overdue) {
      return true;
    }
    if (this.dueDate == null) {
      return false;
    }
    var now = Date.parse(new Date());
    this.overdue = this.dueDate - now < 0;
    return this.overdue;
  }

}



/**
 * @class Represents a HighPriorityItem, a type of Item with a priority of
 * high.
 * @augments Item
 * @param {String} description - what has to be done.
 * @param {Number} dueIn - how many seconds before it is overdue.
 */
 class HighPriorityItem extends Item {
  constructor(description, dueIn){
    super(description, 'High', dueIn);
  }
}

/**
 * @class Represents a MediumPriorityItem, a type of Item with a priority of
 * medium.
 * @augments Item
 * @param {String} description - what has to be done.
 * @param {Number} dueIn - how many seconds before it is overdue.
 */
class MediumPriorityItem extends Item {
  constructor(description, dueIn){
    super(description, 'Medium', dueIn);
  }
}
/**
 * @class Represents a LowPriorityItem, a type of Item with a priority of
 * low.
 * @augments Item
 * @param {String} description - what has to be done.
 * @param {Number} dueIn - how many seconds before it is overdue.
 */
class LowPriorityItem extends Item {
  constructor(description, dueIn){
    super(description, 'Low', dueIn);
  }
}

/**
 * @function Run a test to create items and add them to todo lists..
 */
function mainTest() {
  //=====================
  todoList = new TodoList("Housework");
  todoList.name;
  todoList.printList();
  var item1 = new HighPriorityItem("Take out the bins", 4);
  todoList.addItem(item1);
  var item2 = new MediumPriorityItem("Cut the grass", 8);
  todoList.addItem(item2);
  todoList.printList();
  var item3 = new LowPriorityItem("Clean the kitchen",2);
  todoList.addItem(item3);
  var item4 = new Item("Do the shop", "Low");
  todoList.addItem(item4);
  todoList.printList();
  todoList.removeItem(item2);
  todoList.printList();

  todoList2 = new TodoList("Office");
  todoList2.ame;
  todoList2.printList();
  var item5 = new LowPriorityItem("Fill out hours sheet", 2);
  todoList2.addItem(item5);
  todoList2.printList();
  // You can use the logging below to explore the prototypal inheritance.
  //console.log("Item1 instanceof Item: " + (item1 instanceof Item));
  //console.log("Item1 instanceof HighPriorityItem: " + (item1 instanceof HighPriorityItem));
  //console.log("Item1 instanceof MediumPriorityItem: " + (item1 instanceof MediumPriorityItem));
  //console.log("Item2 instanceof Item: " + (item2 instanceof Item));
  //console.log("Item3 instanceof LowPriorityItem: " + (item3 instanceof LowPriorityItem));
  //console.log("Item3 instanceof Item: " + (item3 instanceof Item));
  //console.log("Item4 instanceof Item: " + (item4 instanceof Item));
  //console.log("Item4 instanceof LowPriorityItem: " + (item4 instanceof LowPriorityItem));
  //console.log("Item5 instanceof LowPriorityItem: " + (item5 instanceof LowPriorityItem));
}

mainTest();
