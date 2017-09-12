// Create an item with
// description(mandatory)
// itemPriority (High, Medium, Low)
// dueIn number of seconds from now until item is due
module.exports = function Item(itemDescription, itemPriority, dueIn = 10) {

  this.description = "";
  this.priorityTypes = ["High", "Medium", "Low"];
  this.priority = "Medium";
  this.overdue = false;
  this.dueDate = null;
  if (dueIn > 0) {
    this.dueDate = Date.parse(new Date()) + dueIn * 1000;
  }

  if (itemDescription === undefined || itemDescription === null || itemDescription.trim() === "") {
    console.log("***ERR: Failed to create item, no description supplied");
  } else {
    this.description = itemDescription;
  }

  if (itemPriority !== undefined) {
    // Ensure the priority is a valid selection
    this.priorityTypes.forEach(type => itemPriority == type ? this.priority = itemPriority : null);
  }

  this.__proto__.getDescription = function () {
    return this.description;
  };
  this.__proto__.getPriority = function () {
    return this.priority;
  };
  this.__proto__.checkIfOverdue = function () {
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
};