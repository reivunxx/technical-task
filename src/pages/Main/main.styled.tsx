import styled from "styled-components";
import {adaptiveProps} from "../../style/mixins";
import {palette} from "../../style/colors";

export const Layout = styled.div`
    background-color: #101f25;
    background-image: url("/bg.png");
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: white;
    padding: 52px 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${adaptiveProps("padding", "32px 24px", "52px 24px")};

    min-height: 100vh;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    margin: 0 auto;
    z-index: 2;
    width: 100%;

    ${adaptiveProps("gap", "24px", "32px")};
    ${adaptiveProps("width", undefined, "562px")};
`;

export const CountersWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(118, 118, 118, 0.2);

    & > h3 {
        font-weight: 600;
        ${adaptiveProps("font-size", "14px", "16px")}
    }
`;

export const LikesCounter = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    & > p {
        font-weight: 600;
        ${adaptiveProps("font-size", "14px", "16px")};
    }
`;

export const LoadMoreButton = styled.button`
    width: 234px;
    height: 36px;
    border-radius: 4px;
    transition: 0.3s;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${palette.grey};

    color: white;
    align-self: center;
    cursor: pointer;

    &:hover {
        background: ${palette.greyHover};
    }

    &:disabled {
        cursor: wait;
    }
`;
