function TodoList(listName) {
 this.name = listName;
 this.items = [];
 this.getName = function(){
    return name;
  };

  // Create a monitor that periodically checks for overdue items.
  TodoList.prototype.overDueMonitor = function(todoList) {
    todoList.items.forEach(function(item){
      item.checkIfOverdue();
    });
  };
  setInterval(this.overDueMonitor, 4000, this);

  TodoList.prototype.getTodoList = function() {
    return this.items;
  };

  TodoList.prototype.printList = function() {
    console.log(`\n${this.name} ( ${this.items.length} items) \n-------------------- `);
    // Introduce arrow function
    // Use desconstruction in the function parameter list to extract
    // the values to be used.
    this.items.forEach(({description, priority, overdue}) =>
      console.log(`[${priority}] ${description} ${overdue ? "(Overdue)" : "" }`)
    );
  };

  TodoList.prototype.addItem = function(item) {

    if (item!== null && item.description!==""){
      this.items.push(item);
      console.log(`Added item '${item.description}' to my '${name}' todo list`);
    } else {
      console.log(`***ERR: Failed to add an item to the ${name} list as it is missing a description`);
    }
  };

  TodoList.prototype.removeItem = function(removeItem) {
     if(removeItem.description!==undefined) {

       this.items.splice(this.items.indexOf(removeItem),1);
     }
   };

}

function HighPriorityItem({itemDescription, dueIn}) {
  const itemPriority = "High";
  return new Item({itemDescription, itemPriority, dueIn});

}

function MediumPriorityItem({itemDescription, dueIn}) {
  const itemPriority = "Medium";
  return new Item({itemDescription, itemPriority, dueIn});

}

function LowPriorityItem({itemDescription, dueIn}) {
  const itemPriority = "Low";
  return new Item({itemDescription, itemPriority, dueIn});

}


// Create an item with
// description(mandatory)
// itemPriority (High, Medium, Low)
// dueIn number of seconds from now until item is due
function Item({itemDescription, itemPriority, dueIn = 0}) {

  // Use const instead of this. Hides the field from outside the
  // scope and makes it unchangeable
  const priorityTypes = ["High","Medium","Low"];

  // Pulic Fields
  this.description = "";
  this.priority = "Medium";
  this.overdue = false;

  // Use let to block scope.
  let dueDate = null;
  if (dueIn > 0) {
    dueDate = (Date.parse(new Date()) + (dueIn * 1000));
  }

  if (itemDescription === undefined || itemDescription === null || itemDescription.trim() === "") {
    console.log(`***ERR: Failed to create item, no description supplied`);
  } else {
    this.description = itemDescription;
  }

  if(itemPriority !== undefined) {
    // Ensure the priority is a valid selection
    priorityTypes.forEach((type) =>
      itemPriority == type ? this.priority = itemPriority : null
    );
  }

  Item.prototype.checkIfOverdue = function() {
      if(this.overdue) {
        return true;
      }
      if(this.dueDate == null) {
        return false;
      }
      var now = Date.parse(new Date());
      this.overdue = this.dueDate - now < 0;
      return this.overdue;
  };
}

var todoList = new TodoList("Housework");
todoList.name;
todoList.printList();
var item1 = new HighPriorityItem({itemDescription:'Take out the bins', dueIn:'20'});
todoList.addItem(item1);
var item2 = new MediumPriorityItem({itemDescription:'Cut the grass'});
todoList.addItem(item2);
todoList.printList();
var item3 = new Item({itemDescription:null, priority:"Low"});
todoList.addItem(item3);
var item4 = new LowPriorityItem({dueIn:5, itemDescription: 'Do the shop'});
todoList.addItem(item4);
todoList.printList();
todoList.removeItem(item2);
todoList.printList();

var todoList2 = new TodoList("Office");
todoList2.name;
todoList2.printList();
var item5 = new LowPriorityItem({itemDescription:'Fill out hours sheet', dueIn:2});
todoList2.addItem(item5);
todoList2.printList();
