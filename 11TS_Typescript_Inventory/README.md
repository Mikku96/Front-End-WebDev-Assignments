# Assignment - Inventory

0. ```npm install --save-dev typescript``` and ```npm start```... should work!

1. Create a Class "Item", with "name", "weight", "volume" and "izHazardous" properties.

2. Create a class "Container", with "id", "items" (list of Item objects), "maxWeight", "maxVolume" and "containsHazardousItems" properties

    - Constructor gives some values for "id", "maxWeight" and "maxVolume"

3. Add methods to Container:

    - getTotalWeight() - Returns sum of item weights

    - getTotalVolume() - Returns sum of item volumes

    - addItem(item: Item) - Adds a new Item to the Container, if there is space and weight limit has not been reached... IF the Item is hazardous, the Container must reflect this

    -removeItem(name) - Removes the Item from the Container... change hazardous state if necessary

4. (EXTRA) Add Warehouse Class, with its own "id", "containers" (list of Containers), "capacity" and "hazardClass".

    - Can hold Container objects as many as "capacity" allows

    - hazardClass is a integer between 0 - 10 - describes the overall danger level of the Warehouse.

    - 0 means, that not a single hazardous object is inside the warehouse

    - 1-10 are percentage based. "If 10% of items are hazardous, the value is 1"

        - No consideration for item mass or volume

6. (Comment) This is an extremely broad assignment at this point... some testing functions would be necessary!

    - Extra lecture, and other assigments need my attention too.