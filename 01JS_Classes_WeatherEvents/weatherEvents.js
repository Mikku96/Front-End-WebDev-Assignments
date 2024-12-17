class WeatherEvent {
    constructor(timestamp) {
    this.timestamp = timestamp;
    }
    getInformation() {
        return "";
    }
    print() {
        console.log(this.timestamp + " " + this.getInformation());
    }
}

class TemperatureChangeEvent extends WeatherEvent {
    constructor(timestamp, temperature) {
    super(timestamp);
    this.temperature = temperature;
    }
    getInformation() {
        return `temperature: ${this.temperature}°C`;
    }
}

class HumidityChangeEvent extends WeatherEvent {    // Maybe could also use TemperatureChangeEvent as a frame
    constructor(timestamp, humidity) {
    super(timestamp);
    this.humidity = humidity;
    }
    getInformation() {
        return `humidity: ${this.humidity}%`;
    }
}

class WindStrengthEvent extends WeatherEvent {
    constructor(timestamp, windStrength) {
    super(timestamp);
    this.windStrength = windStrength;
    }
    getInformation() {
        return `wind strength: ${this.windStrength} m/s`;
    }
}

const weatherEvents = [];

weatherEvents.push(new TemperatureChangeEvent(new Date("2022-11-29 03:00"), -6.4)); // Tried the extra task
weatherEvents.push(new HumidityChangeEvent("2022-11-29 04:00", 95));    // No idea what "print properly" indicates
weatherEvents.push(new WindStrengthEvent("2022-11-30 13:00", 2.2)); // Some different form? Skipping it for now.

weatherEvents.forEach(weatherEvent => weatherEvent.print());