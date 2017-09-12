function TodoList(name) {
  this.name = name;
  this.items = [];

  // Create a monitor that periodically checks for overdue items.
  TodoList.prototype.overDueMonitor = function(todoList) {
    //console.log("Checking for overdue items in your " + todoList.name + " todo list...")
    items = todoList.items;
    items.forEach(function(item){
      item.checkIfOverdue();
    });
  };
  var intervalID = setInterval(this.overDueMonitor, 4000, this);

  TodoList.prototype.printList = function() {
    console.log("");
    console.log(name + "(" + this.items.length + " items)");
    console.log('-----------');
    this.items.forEach(function(item){
      var overdue = item.overdue ? "(Overdue)" : "";
      console.log("[" + item.priority + "]" +  item.description + overdue);
    }, this);
  };

  TodoList.prototype.addItem = function(item) {

    if (item!== null && item.description!==""){
      this.items.push(item);
      console.log("Added item '" + item.description + "' to my '" + name + "' todo list");
    } else {
      console.log("Failed to add an item to the " + name + " list as it is missing a description");
    }
  };

  TodoList.prototype.removeItem = function(removeItem) {
     if(removeItem.description!==undefined) {

       this.items.splice(this.items.indexOf(removeItem),1);
     }
   };

}

function HighPriorityItem(itemDescription, dueIn) {
  var priority = "High";
  return new Item(itemDescription, priority, dueIn);

}

function MediumPriorityItem(itemDescription, dueIn) {
  var priority = "Medium";
  return new Item(itemDescription, priority, dueIn);

}

function LowPriorityItem(itemDescription, dueIn) {
  var priority = "Low";
  return new Item(itemDescription, priority, dueIn);

}

// Create an item with
// description(mandatory)
// itemPriority (High, Medium, Low)
// dueIn number of seconds from now until item is due
function Item(itemDescription, itemPriority, dueIn=0){

  // Create instance variables using this
  this.description = "";
  this.priorityTypes = ["High","Medium","Low"];
  this.priority = "Medium";
  this.overdue = false;
  this.dueDate = null;
  if (dueIn > 0) {
    this.dueDate = (Date.parse(new Date()) + (dueIn * 1000));
  }

  if (itemDescription === undefined || itemDescription === null || itemDescription.trim() === "") {
    console.log("Error: Failed to create item, no description supplied");
  } else {
    this.description = itemDescription;
  }

  if(itemPriority !== undefined) {
    // Ensure the priority is a valid selection
    this.priorityTypes.forEach(function(type){
      if(itemPriority == type) {
        this.priority = itemPriority;

      }
    }, this);
  }

  // DELETE THESE AS THEY ARE NO LONGER REQUIRED BECAUSE THE CONSTRUCTOR
  // WILL RETURN AN OBJECT THAT HAS ACCESS TO THE VARIABLES IN THE GETTERS.
  // Share methods using the prototype reference.
  //Item.prototype.getDescription = function(){
  //  return this.description;
  //};
  //Item.prototype.updateDescription = function(description){
  //  this.description = description;
  //};
  //Item.prototype.getPriority = function(){
  //    return this.priority;
  //};
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
var item1 = new HighPriorityItem("Take out the bins",20);
todoList.addItem(item1);
var item2 = new MediumPriorityItem("Cut the grass", 40);
todoList.addItem(item2);
todoList.printList();
var item3 = new Item(null,"Low");
todoList.addItem(item3);
var item4 = new Item("Do the shop","Low");
todoList.addItem(item4);
todoList.printList();
todoList.removeItem(item2);
todoList.printList();

var todoList2 = new TodoList("Office");
todoList2.name;
todoList2.printList();
var item5 = new LowPriorityItem("Fill out hours sheet", 2);
todoList2.addItem(item5);
todoList2.printList();
