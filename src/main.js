var Item = require('./item.js')

function TodoList(listName) {
 this.name = listName;
 this.items = [];
 this.getName = function(){
    return name;
  };

  // Create a monitor that periodically checks for overdue items.
  this.__proto__.overDueMonitor = function(todoList) {
    todoList.items.forEach(function(item){
      item.checkIfOverdue();
    });
  };
  var intervalID = setInterval(this.overDueMonitor, 4000, this);

  this.__proto__.getTodoList = function() {
    return this.items;
  };

  this.__proto__.printList = function() {
    console.log(`\n${this.name} ( ${this.items.length} items) \n-------------------- `);
    this.items.forEach(({description, priority, overdue}) =>
      console.log(`[${priority}] .... ${description} ${overdue ? "(Overdue)" : "" }`)
    );
  };

  this.__proto__.addItem = function(item) {

    if (item!== null && item.getDescription()!==""){
      this.items.push(item);
      console.log("Added item '" + item.getDescription() + "' to my '" + this.name + "' todo list");
    } else {
      console.log("***ERR: Failed to add an item to the " + this.name + " list as it is missing a description");
    }
  };

  this.__proto__.removeItem = function(removeItem) {
     if(removeItem.getDescription()!==undefined) {

       this.items.splice(this.items.indexOf(removeItem),1);
     }
   };

}

function HighPriorityItem(itemDescription, dueIn) {
  const priority = "High";
  return new Item(itemDescription, priority, dueIn);

}

function MediumPriorityItem(itemDescription, dueIn) {
  const priority = "Medium";
  return new Item(itemDescription, priority, dueIn);

}

function LowPriorityItem(itemDescription, dueIn) {
  const priority = "Low";
  return new Item(itemDescription, priority, dueIn);

}

function main() {

console.log("Main");
  var todoList = new TodoList("Housework");
  todoList.getName;
  todoList.printList();
  var item1 = new HighPriorityItem("Take out the bins",20);
  todoList.addItem(item1);
  var item2 = new MediumPriorityItem("Cut the grass");
  todoList.addItem(item2);
  todoList.printList();
  var item3 = new Item(null,"Low");
  todoList.addItem(item3);
  var item4 = new Item("Do the shop","Low");
  todoList.addItem(item4);
  todoList.printList();
  console.log(`Remove '${item2.getDescription()}' `)
  todoList.removeItem(item2);
  todoList.printList();

  var todoList2 = new TodoList("Office");
  todoList2.getName;
  todoList2.printList();
  var item5 = new LowPriorityItem("Fill out hours sheet", 2);
  todoList2.addItem(item5);
  todoList2.printList();
}
main();
