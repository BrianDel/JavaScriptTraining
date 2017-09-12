function newTodoList(name) {
 var name = name;
 var items = [];
 var todoList = {

  "getName": function(){
    return name;
  },

  "getTodoList" : function() {
    return items;
  },

  "printList" : function() {
    console.log("");
    console.log(name + "(" + items.length + " items)");
    console.log('-----------');
    items.forEach(function(item){
      console.log("[" + item.getPriority() + "]" +  item.getDescription());
    });
  },

  "addItem": function(item) {

    if (item!== null && item.getDescription() && item.getPriority){
      items.push(item);
      console.log("Added item '" + item.getDescription() + "' to my " + this.name);
    } else {
      console.log('Failed to add Item as missing description or priority');
    }
  },

  "removeItem" : function(removeItem) {
    if(removeItem.getDescription()!==undefined) {
      items.splice(items.indexOf(removeItem),1);
    }
   }
  }
  return todoList;

}

function newItem(itemDescription, itemPriority){
  var description;
  var somethingElse = "sadfd";
  var priorityTypes = ["High","Medium","Low"];
  var priority = "Medium";

  if (itemDescription === undefined || itemDescription === null || itemDescription.trim() === "") {
    console.log("Error: Failed to create item, no description supplied");
    return  null;
  } else {
      description = itemDescription;
  }

  if(itemPriority !== undefined) {
    // Ensure the priority is a valid selection
    priorityTypes.forEach(function(type){
      if(itemPriority == type) {
        priority = itemPriority;

      }
    });
  }
      console.log(priorityTypes);

  item = {
    "getDescription" : function(){
      return description;
    },
    "getPriority" : function(){
      return priority;
    },
    "updateDescription": function(desc) {
       description = desc;
    }
  }

  return item;
}

var todoList = newTodoList("My stuff to do");
todoList.getName;
todoList.printList();
var item1 = newItem("Take out the bins","High");
todoList.addItem(item1);
var item2 = newItem("Cut the grass","sdfsd");
todoList.addItem(item2);
var item3 = newItem(null,"Low");
todoList.addItem(item3);
todoList.printList();
//todoList.removeItem(item2);
todoList.printList();

// More to think about...
// can we change the values from  outside the function??
console.log("Can I directly access the value of description?")
console.log("Before we start lets print the object for item1");
console.log(item1);
console.log("Here you can see that there are only 3 properties of item, which are the 3 functions");

console.log("item1.description: " + item1.description);
console.log("This was undefined, as it doesn't exist on the item object returned by the newItem function");
console.log("Lets change description using item1.description='Take out the trash")
item1.description = "Take out the trash"
console.log("item1.description = " + item1.description);
console.log("....but....")
console.log("item1.getDescription() = " + item1.getDescription());
console.log('From this we can see that closures are at work, and without accessing the description through the closure you can\'t update the value on the object instance.');
console.log('Hey, but if I look at the object it shows me a description property updated.');
console.log(item1);
console.log("Ok, so what you have done is add a new property to the parent object with the same name as a property on the closure object. Confusing! Lets look at the closure values in Firebug...")
console.log("But first, lets print the list one more time to show that your update has not affected the list.")
todoList.printList();
console.log("Now lets look at the Closure. Set a breakpoint in Firebug after the creation of Item1.");
console.log("Once the debugger stops you can add a watch expression to 'item1' and inside the getDescription function you will see the Closure and the items in that scope.");
console.log("Here we can see that the Closure has captured the contents of the variables at the time the function was executed.")
console.log(item1);
console.log(item1.getDescription());
console.log(item1.description);
item1.description = "New desc";
item1.updateDescription("New desc");
todoList.printList();
console.log("the end!")
