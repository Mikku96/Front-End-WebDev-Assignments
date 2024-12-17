var Warehouse = /** @class */ (function () {
    function Warehouse() {
        this.id = String.fromCharCode(this.getRandomIntInclusive(65, 90)) + // Letter + Letter + Number
            String.fromCharCode(this.getRandomIntInclusive(65, 90)) +
            String(this.getRandomIntInclusive(0, 9));
        this.containers = [];
        this.capacity = this.getRandomIntInclusive(10, 20); // Max. number of containers
        this.hazardClass = this.checkHazardous(this.containers);
    }
    Warehouse.prototype.getRandomIntInclusive = function (min, max) {
        var minCeiled = Math.ceil(min);
        var maxFloored = Math.floor(max);
        var randomValue = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        return randomValue;
    };
    // Method to add a container inside a warehouse
    Warehouse.prototype.addContainer = function (newContainer) {
        var newTotalAmount = this.containers.length + 1;
        if (newTotalAmount > this.capacity) {
            console.log("The new conatiner, ".concat(newContainer.id, ", pushes over the capacity of the warehouse."));
            return;
        }
        this.containers.push(newContainer);
        console.log("".concat(newContainer.id, " container added to the warehouse ").concat(this.id, "."));
        this.hazardClass = this.checkHazardous(this.containers);
        console.log("New hazard class: ".concat(this.hazardClass));
    };
    Warehouse.prototype.removeContainer = function (containerID) {
        // Find the container
        var itemIndex = this.containers.
            findIndex(function (container) { return container.id === containerID; });
        if (itemIndex === -1) {
            console.log("There is no ".concat(containerID, " cotainer in the warehouse ").concat(this.id, "."));
            return;
        }
        this.containers.splice(itemIndex, 1)[0];
        console.log("Container ".concat(containerID, " removed from the warehouse ").concat(this.id, "."));
        this.hazardClass = this.checkHazardous(this.containers);
        console.log("New hazard class: ".concat(this.hazardClass));
    };
    Warehouse.prototype.checkHazardous = function (setOfContainers) {
        var sumOfHazardItems = setOfContainers.reduce(function (accumulator, container) {
            var hazardousCount = container.items.reduce(function (singleContAccum, item) {
                return item.isHazardous ? singleContAccum + 1 : singleContAccum;
            }, 0);
            return accumulator + hazardousCount;
        }, 0);
        // In above, first we obtain hazard ITEMS inside a SINGLE container
        // This is then summed with all the other containers
        // Nested reduces basically
        // After re-reading what was asked... we actually want the percentage
        // No energy left to think about this, just repeat the loop without hazard checking
        var sumOfItems = setOfContainers.reduce(function (accumulator, container) {
            var containerItems = container.items.reduce(function (singleContAccum, item) {
                return singleContAccum + 1;
            }, 0);
            return accumulator + containerItems;
        }, 0);
        var classOfHazard = Math.ceil((sumOfHazardItems / sumOfItems) * 10); // 0.01 -> 0.1 -> 1; 0 -> 0 -> 0; 0.49 -> 4.9 -> 5; 0.9999 -> 9.999 -> 10 OK!
        return classOfHazard;
    };
    return Warehouse;
}());
var Container = /** @class */ (function () {
    function Container() {
        this.id = String.fromCharCode(this.getRandomIntInclusive(65, 90)) + // Letter + Number + Number
            String(this.getRandomIntInclusive(0, 9)) +
            String(this.getRandomIntInclusive(0, 9));
        this.items = [];
        this.maxWeight = this.getRandomIntInclusive(50, 100); // For test container, some times NOT everything fits
        this.maxVolume = this.getRandomIntInclusive(5, 20);
        this.containsHazardousItems = false;
    }
    Container.prototype.getRandomIntInclusive = function (min, max) {
        var minCeiled = Math.ceil(min);
        var maxFloored = Math.floor(max);
        var randomValue = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        return randomValue;
    };
    //  Total weight of ITEMS currently
    Container.prototype.getTotalWeight = function () {
        var currentWeight = this.items
            .reduce(function (total, item) { return total + item.weight; }, 0);
        return currentWeight;
    };
    // Total VOLUME of ITEMS currently
    Container.prototype.getTotalVolume = function () {
        var currentVolume = this.items
            .reduce(function (total, item) { return total + item.volume; }, 0);
        return currentVolume;
    };
    // Method to add an item to the container
    Container.prototype.addItem = function (item) {
        var newTotalWeight = this.getTotalWeight() + item.weight;
        var newTotalVolume = this.getTotalVolume() + item.volume;
        if (newTotalWeight > this.maxWeight) {
            console.log("The new item, ".concat(item.name, ", pushes over the weight limit of the container."));
            return;
        }
        if (newTotalVolume > this.maxVolume) {
            console.log("The new item, ".concat(item.name, ", pushes over the volume limit of the container."));
            return;
        }
        this.items.push(item);
        // Update hazardous status if the item is hazardous
        if (item.isHazardous) {
            this.containsHazardousItems = true;
        }
        console.log("".concat(item.name, " added to container ").concat(this.id, "."));
    };
    Container.prototype.removeItem = function (itemName) {
        var itemIndex = this.items.
            findIndex(function (item) { return item.name === itemName; });
        if (itemIndex === -1) {
            console.log("There is no ".concat(itemName, " in container ").concat(this.id, "."));
            return;
        }
        this.items.splice(itemIndex, 1)[0];
        console.log("".concat(itemName, " removed from container ").concat(this.id, "."));
        // Check if still hazardous
        var found = this.items.find(function (item) { return item.isHazardous === true; }); // Check if any of the items is hazardous
        if (found !== undefined) { // If found is not undefined, then the container is no more hazardous
            this.containsHazardousItems = true;
        }
        else {
            this.containsHazardousItems = false;
        }
    };
    return Container;
}());
var Item = /** @class */ (function () {
    function Item(name, weight, volume, isHazardous) {
        this.name = name;
        this.weight = weight;
        this.volume = volume;
        this.isHazardous = isHazardous;
    }
    return Item;
}());
// TESTING
// Run the program few times when checking, if items FIT inside
// The weight limit is set so that the limit can be reached
console.log("#####################");
console.log("###CLEAN WAREHOUSE###");
console.log("#####################");
var containerClean = new Container();
var warehouseClean = new Warehouse();
console.log("Capacity in warehouse:", warehouseClean.capacity);
console.log("Containers in warehouse:", warehouseClean.containers.length);
var itemClean1 = new Item("Cat1", 2.5, 0.003, false);
var itemClean2 = new Item("Cat2", 10, 0.02, false);
containerClean.addItem(itemClean1);
containerClean.addItem(itemClean2);
warehouseClean.addContainer(containerClean);
console.log("Total weight:", containerClean.getTotalWeight());
console.log("Total volume:", containerClean.getTotalVolume());
console.log("Contains hazardous items:", containerClean.containsHazardousItems);
console.log("-----------");
console.log("Containers in warehouse:", warehouseClean.containers.length);
console.log("Hazard class:", warehouseClean.hazardClass);
console.log("#####################");
console.log("###HAZARD WAREHOUSE##");
console.log("#####################");
var containerHazard = new Container();
var warehouseHazard = new Warehouse();
console.log("Capacity in warehouse:", warehouseHazard.capacity);
console.log("Containers in warehouse:", warehouseHazard.containers.length);
var itemHazard1 = new Item("Cat3", 2.5, 0.003, true);
var itemHazard2 = new Item("Cat4", 10, 0.02, false);
containerHazard.addItem(itemHazard1);
containerHazard.addItem(itemHazard2);
warehouseHazard.addContainer(containerHazard);
console.log("Total weight:", containerHazard.getTotalWeight());
console.log("Total volume:", containerHazard.getTotalVolume());
console.log("Contains hazardous items:", containerHazard.containsHazardousItems);
console.log("-----------");
console.log("Containers in warehouse:", warehouseHazard.containers.length);
console.log("Hazard class:", warehouseHazard.hazardClass);
console.log("#####################");
console.log("###HUGE CONTAINER####");
console.log("#####################");
var container1 = new Container();
var warehouse1 = new Container();
var item1 = new Item("Cat5", 2.5, 0.003, false); // Really, every item needs also an ID
var item2 = new Item("Cat6", 10, 0.02, true);
var item3 = new Item("Cat7", 1, 0.001, false);
var item4 = new Item("Cat8", 5, 0.005, true);
var item5 = new Item("Cat9", 10, 0.02, true);
var item6 = new Item("Cat10", 10, 0.02, true);
var item7 = new Item("Cat11", 10, 0.02, true);
var item8 = new Item("Cat12", 10, 0.02, true);
var item9 = new Item("Cat13", 10, 0.02, true);
var item10 = new Item("Cat14", 10, 0.02, true);
container1.addItem(item1);
container1.addItem(item2);
container1.addItem(item3);
container1.addItem(item4);
container1.addItem(item5);
container1.addItem(item6);
container1.addItem(item7);
container1.addItem(item8);
container1.addItem(item9);
container1.addItem(item10);
console.log("Total weight:", container1.getTotalWeight());
console.log("Total volume:", container1.getTotalVolume());
console.log("Contains hazardous items:", container1.containsHazardousItems);
container1.removeItem(item1.name);
console.log("Total weight:", container1.getTotalWeight());
console.log("Total volume:", container1.getTotalVolume());
console.log("#####################");
console.log("#####################");
console.log("#####################");
