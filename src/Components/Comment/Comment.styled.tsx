import styled from "styled-components";
import {adaptiveProps} from "../../style/mixins";
import {palette} from "../../style/colors";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    ${adaptiveProps("gap", "24px", "32px")}
`;

export const Avatar = styled.img`
    object-fit: cover;
    border-radius: 100%;
    flex-shrink: 0;

    ${adaptiveProps("width", "40px", "68px")};
    ${adaptiveProps("height", "40px", "68px")};
`;

export const HeadingWrapper = styled.div`
    width: 100%;
    display: flex;

    align-items: center;
    justify-content: space-between;
`;

export const HeadingContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    & > h3 {
        font-weight: 600;
        ${adaptiveProps("font-size", "14px", "16px")}
    }

    & > p {
        color: ${palette.greyBlue};
        font-weight: 400;
        ${adaptiveProps("font-size", "14px", "16px")};
    }
`;

export const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const LikesWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    font-weight: 600;
    ${adaptiveProps("font-size", "14px", "15px")};
`;

export const CommentText = styled.p`
    ${adaptiveProps("margin-left", "60px", "88px")};
    word-break: break-word;
`;

export const SubCommentsWrapper = styled.div`
    ${adaptiveProps("margin-left", "20px", "34px")};
`;

export const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;

    ${adaptiveProps("gap", "8px", "0px")};
`;
