import {css} from "styled-components";

const BREAKPOINTS = [1024];

//Стили идут от ширины 0, и дальше по массиву BREAKPOINTS вверх
export function adaptiveProps(
    property: string,
    mobileSize?: string,
    desktopSize?: string,
) {
    const result = css`
        ${property} : ${mobileSize};

        //Такая странная запись на случай если брейкпоинтов станет больше
        ${[desktopSize].map(
            (value, index) =>
                css`
                    @media (min-width: ${BREAKPOINTS[index]}px) {
                        ${property} : ${value}
                    }
                `,
        )}
    `;

    return result;
}
