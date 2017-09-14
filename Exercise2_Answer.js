function TodoList(name) {
  this.name = name;
  this.items = [];

  // The monitor needs to receive the 'this' object to ensure it is
  // working in the correct TodoList scope.
  setInterval(this.overDueMonitor, 4000, this);

}
// Create a monitor that periodically checks for overdue items.
// Move common functions to the prototype instead of creating for each instance.
TodoList.prototype.overDueMonitor = function(todoList) {
  //console.log("Checking for overdue items in your " + todoList.name + " todo list...")
  todoList.items.forEach(function(item) {
    item.checkIfOverdue();
  });
};

TodoList.prototype.printList = function() {
  console.log("");
  console.log(this.name + "(" + this.items.length + " items)");
  console.log('-----------');
  this.items.forEach(function(item) {
    var overdue = item.overdue ? "(Overdue)" : "";
    console.log("[" + item.priority + "]" + item.description + overdue);
  });
};

TodoList.prototype.addItem = function(item) {

  if (item !== null && item.description && (item.description !== "" || item.description !== null)) {
    this.items.push(item);
    console.log("Added item '" + item.description + "' to my '" + this.name + "' todo list");
  } else {
    console.log("Failed to add an item to the " + name + " list as it is missing a description");
  }
};

TodoList.prototype.removeItem = function(removeItem) {
  if (removeItem.description !== undefined) {

    this.items.splice(this.items.indexOf(removeItem), 1);
  }
};

// Use the call function to pass the HighPriorityItem object
// the the Item constructor.
function HighPriorityItem(description, dueIn) {
  Item.call(this, description,"High", dueIn);
}
// Need to call this to ensure we attach the
// Item as the prototype to get access to
// the checkIfOverdue() function.
// However, this isn't bullet proof, as it assumes that
// you can pass no values to the 'parent' constructor,
// and expect to get an object returned successfully.
// That might not be true!
HighPriorityItem.prototype = new Item();

function MediumPriorityItem(description, dueIn) {
  Item.call(this, description, "Medium", dueIn);
}
MediumPriorityItem.prototype = new Item();

// This works, but it does not create a hierarchy,
// it just returns an Item with a low priority.
function LowPriorityItem(itemDescription, dueIn) {
  this.priority = "Medium"; // This is ignored as we don't return 'this'.
  return new Item(itemDescription, "Low", dueIn);
}

// Create an item with
// description(mandatory)
// itemPriority (High, Medium, Low)
// dueIn number of seconds from now until item is due
function Item(description, priority, dueIn = 0) {

  // Uncommented this to see why the prototyal inheritance
  // used above is brittle.
  //if (arguments.length == 0) {
  //  throw new Error("Something went badly wrong!");
  //}
  // Create instance variables using this
  this.description;
  this.priorityTypes = ["High", "Medium", "Low"];
  this.priority;
  this.overdue = false;
  this.dueDate = null;
  if (dueIn > 0) {
    this.dueDate = (Date.parse(new Date()) + (dueIn * 1000));
  }

  if (description === undefined || description === null || description.trim() === "") {
    console.log("Error: Failed to create item, no description supplied");
    return null;
  } else {
    this.description = description;
  }

  if (priority !== undefined) {
    // Ensure the priority is a valid selection
    this.priorityTypes.forEach(function(type) {
      if (priority == type) {
        this.priority = priority;

      }
    }, this);
  }
}

Item.prototype.checkIfOverdue = function() {

  if (this.overdue) {
    return true;
  }
  if (this.dueDate == null) {
    return false;
  }
  var now = Date.parse(new Date());
  this.overdue = this.dueDate - now < 0;
  return this.overdue;
};

var todoList = new TodoList("Housework");
todoList.name;
todoList.printList();
var item1 = new HighPriorityItem("Take out the bins", 4);
todoList.addItem(item1);
var item2 = new MediumPriorityItem("Cut the grass", 8);
todoList.addItem(item2);
todoList.printList();
var item3 = LowPriorityItem("Clean the kitchen",2);
todoList.addItem(item3);
var item4 = new Item("Do the shop", "Low");
todoList.addItem(item4);
todoList.printList();
todoList.removeItem(item2);
todoList.printList();

var todoList2 = new TodoList("Office");
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
