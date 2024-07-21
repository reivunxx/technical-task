import {morph} from "./helpers";

export function subtractHours(date: Date, numOfHours: number) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setHours(dateCopy.getHours() - numOfHours);

    return dateCopy;
}

const pluralsSeconds = ["секунду", "секунды", "секунд"];
const pluralsMinutes = ["минуту", "минуты", "минут"];
const pluralsHours = ["час", "часа", "часов"];
export function timeFromNow(date: Date, limitInHours: number) {
    const currentTime = new Date().getTime();
    const comparingTime = new Date(date).getTime();

    const diff = currentTime - comparingTime;

    const sec = Math.round(diff / 1000);
    const min = Math.round(sec / 60);
    const hours = Math.round(min / 60);

    if (hours > limitInHours) return new Date(date).toLocaleString("ru-RU");
    if (min === 0) return `${sec} ${morph(sec, pluralsSeconds)} назад`;
    if (hours === 0) return `${min} ${morph(min, pluralsMinutes)} назад`;
    return `${hours} ${morph(hours, pluralsHours)} назад`;
}
