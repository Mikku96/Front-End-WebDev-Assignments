# Assignment - Weather events

1. Properties: ```temperature```, ```humidity``` ja ```wind strength```

2. When new event is triggered:

    - Add the event to a list

    - Event holds info about the time and what the event value is

    - Method prints the change

3. Events formed by classes:

    - "Base event"
    - "Temperature change"
    - "Humidity change"
    - "Wind strength change"

4. Practically, create a class ```WeatherEvent```

    - ```timestamp``` as a property

    - "Two" methods: ```getInformation``` and ```print```

5. Extend WeatherEvent to create TemperatureChangeEvent

    - Property: Temperature, and a timestamp (super)

    - ```getInformation``` defined to return a string of temperature

6. Similar Extensions for Humidity and Wind

7. Any changes are set into an empty array

8. (Extra) Using Date()...

    - Instructions were unclear about this... "Print properly" term was used

    - It is subjective