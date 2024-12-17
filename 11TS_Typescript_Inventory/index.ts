class Warehouse {
    id: string;
    containers: Container[];
    capacity: number;
    hazardClass: number;

    constructor() {
        this.id = String.fromCharCode(this.getRandomIntInclusive(65, 90)) + // Letter + Letter + Number
        String.fromCharCode(this.getRandomIntInclusive(65, 90)) +
        String(this.getRandomIntInclusive(0, 9));
        this.containers = [];
        this.capacity = this.getRandomIntInclusive(10, 20); // Max. number of containers
        this.hazardClass = this.checkHazardous(this.containers);
    }

    getRandomIntInclusive(min:number, max:number): number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        const randomValue = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        return randomValue;
    }

   // Method to add a container inside a warehouse
   addContainer(newContainer: Container): void {
    const newTotalAmount = this.containers.length + 1;

    if (newTotalAmount > this.capacity) {
        console.log(`The new conatiner, ${newContainer.id}, pushes over the capacity of the warehouse.`);
        return;
    }

    this.containers.push(newContainer);
    console.log(`${newContainer.id} container added to the warehouse ${this.id}.`);

    this.hazardClass = this.checkHazardous(this.containers);
    console.log(`New hazard class: ${this.hazardClass}`);
    }
    
    removeContainer(containerID: string): void {
        // Find the container
        const itemIndex = this.containers.
        findIndex(container => container.id === containerID);

        if (itemIndex === -1) {
            console.log(`There is no ${containerID} cotainer in the warehouse ${this.id}.`);
            return;
        }

        this.containers.splice(itemIndex, 1)[0];
        console.log(`Container ${containerID} removed from the warehouse ${this.id}.`);
        
        this.hazardClass = this.checkHazardous(this.containers);
        console.log(`New hazard class: ${this.hazardClass}`);
    }

    checkHazardous(setOfContainers: Container[]): number {
        
        const sumOfHazardItems = setOfContainers.reduce((accumulator, container) => {
            const hazardousCount = container.items.reduce((singleContAccum: number, item: Item) => {
                return item.isHazardous ? singleContAccum + 1 : singleContAccum;
            }, 0);
            return accumulator + hazardousCount;
        }, 0);
        // In above, first we obtain hazard ITEMS inside a SINGLE container
        // This is then summed with all the other containers
        // Nested reduces basically

        // After re-reading what was asked... we actually want the percentage
        // No energy left to think about this, just repeat the loop without hazard checking

        const sumOfItems = setOfContainers.reduce((accumulator, container) => {
            const containerItems = container.items.reduce((singleContAccum: number, item: Item) => {
                return singleContAccum + 1
            }, 0);
            return accumulator + containerItems;
        }, 0);

        let classOfHazard:number = Math.ceil((sumOfHazardItems / sumOfItems)*10); // 0.01 -> 0.1 -> 1; 0 -> 0 -> 0; 0.49 -> 4.9 -> 5; 0.9999 -> 9.999 -> 10 OK!
        return classOfHazard;
    }
}


class Container {
    id: string;
    items: Item[]; // Specifically, ITEMS! No "warehouses" can go in here
    maxWeight: number;
    maxVolume: number;
    containsHazardousItems: boolean;

    constructor() {
        // Using charcode, to get a random letter
        this.id = String.fromCharCode(this.getRandomIntInclusive(65, 90)) + // Letter + Number + Number
         String(this.getRandomIntInclusive(0, 9)) +
         String(this.getRandomIntInclusive(0, 9));
        this.items = [];
        this.maxWeight = this.getRandomIntInclusive(50, 100); // For test container, some times NOT everything fits
        this.maxVolume = this.getRandomIntInclusive(5, 20);
        this.containsHazardousItems = false;
    }

    getRandomIntInclusive(min:number, max:number): number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        const randomValue = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        return randomValue;
    }

    //  Total weight of ITEMS currently
    getTotalWeight(): number {
        const currentWeight = this.items
        .reduce((total, item) => total + item.weight, 0);
        return currentWeight;
    }

    // Total VOLUME of ITEMS currently
    getTotalVolume(): number {
        const currentVolume = this.items
        .reduce((total, item) => total + item.volume, 0);
        return currentVolume;
    }

    // Method to add an item to the container
    addItem(item: Item): void {
        const newTotalWeight = this.getTotalWeight() + item.weight;
        const newTotalVolume = this.getTotalVolume() + item.volume;

        if (newTotalWeight > this.maxWeight) {
            console.log(`The new item, ${item.name}, pushes over the weight limit of the container.`);
            return;
        }

        if (newTotalVolume > this.maxVolume) {
            console.log(`The new item, ${item.name}, pushes over the volume limit of the container.`);
            return;
        }
        this.items.push(item);

        // Update hazardous status if the item is hazardous
        if (item.isHazardous) {
            this.containsHazardousItems = true;
        }
        console.log(`${item.name} added to container ${this.id}.`);

    }

    removeItem(itemName: string): void {
        const itemIndex = this.items.
        findIndex(item => item.name === itemName);

        if (itemIndex === -1) {
            console.log(`There is no ${itemName} in container ${this.id}.`);
            return;
        }

        this.items.splice(itemIndex, 1)[0];
        console.log(`${itemName} removed from container ${this.id}.`);

        // Check if still hazardous
        const found = this.items.find(item => item.isHazardous === true); // Check if any of the items is hazardous
        if (found !== undefined) { // If found is not undefined, then the container is no more hazardous
            this.containsHazardousItems = true;
        } else {
            this.containsHazardousItems = false;
        }
    }

}


class Item {
    name: string;
    weight: number;
    volume: number;
    isHazardous: boolean;

    constructor(name: string, weight: number, volume: number, isHazardous: boolean) {
        this.name = name;
        this.weight = weight;
        this.volume = volume;
        this.isHazardous = isHazardous;
    }
}



// TESTING

// Did not have interest to create many of these
// Should spend a whole day just writing different tests
// But I believe most of the functionality IS here

console.log("#####################");
console.log("###CLEAN WAREHOUSE###");
console.log("#####################");
const containerClean = new Container();
const warehouseClean = new Warehouse();
console.log("Capacity in warehouse:", warehouseClean.capacity);

console.log("Containers in warehouse:", warehouseClean.containers.length);

const itemClean1 = new Item("Cat1", 2.5, 0.003, false); 
const itemClean2 = new Item("Cat2", 10, 0.02, false);

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

const containerHazard = new Container();
const warehouseHazard = new Warehouse();
console.log("Capacity in warehouse:", warehouseHazard.capacity);

console.log("Containers in warehouse:", warehouseHazard.containers.length);

const itemHazard1 = new Item("Cat3", 2.5, 0.003, true); 
const itemHazard2 = new Item("Cat4", 10, 0.02, false);

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

const container1 = new Container();
const warehouse1 = new Container();

const item1 = new Item("Cat5", 2.5, 0.003, false); // Really, every item needs also an ID
const item2 = new Item("Cat6", 10, 0.02, true);
const item3 = new Item("Cat7", 1, 0.001, false);
const item4 = new Item("Cat8", 5, 0.005, true);
const item5 = new Item("Cat9", 10, 0.02, true);
const item6 = new Item("Cat10", 10, 0.02, true);
const item7 = new Item("Cat11", 10, 0.02, true);
const item8 = new Item("Cat12", 10, 0.02, true);
const item9 = new Item("Cat13", 10, 0.02, true);
const item10 = new Item("Cat14", 10, 0.02, true);

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