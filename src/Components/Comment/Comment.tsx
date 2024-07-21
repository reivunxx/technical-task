import {FC, useState} from "react";
import {
    Avatar,
    CommentText,
    CommentWrapper,
    HeaderLeft,
    HeadingContent,
    HeadingWrapper,
    LikesWrapper,
    SubCommentsWrapper,
    Wrapper,
} from "./Comment.styled";
import {CommentType} from "../../types/getCommentsResponseType";
import {
    useGetAuthors,
    useGetComments,
    useLikeComment,
} from "../../queries/queries";
import {ReactComponent as HeartActive} from "../../icons/heart-active.svg";
import {ReactComponent as Heart} from "../../icons/heart.svg";
import {timeFromNow} from "../../lib/date";

interface IComment extends CommentType {}

const Comment: FC<IComment> = ({text, created, id, parent, likes, author}) => {
    const {data: authors} = useGetAuthors();
    const {data: commentsData} = useGetComments();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const likeFn = useLikeComment();
    const allComments = commentsData?.pages.flatMap((page) => page.data);

    if (!authors) return null;
    const authorData = authors.find((item) => item.id === author);

    if (!authorData || !allComments) return null;
    const subcomments = allComments
        .filter((comment) => comment.parent === id)
        .map((comment) => <Comment {...comment} key={comment.id} />);

    const likeClickHandler = () => {
        setIsLiked((prev) => !prev);
        likeFn.mutate({
            comment_id: id,
            action_type: isLiked ? "unset" : "set",
        });
    };

    return (
        <Wrapper>
            <CommentWrapper>
                <HeadingWrapper>
                    <HeaderLeft>
                        <Avatar src={authorData.avatar} alt="" />
                        <HeadingContent>
                            <h3>{authorData.name}</h3>
                            <p title={new Date(created).toLocaleString()}>
                                {timeFromNow(created, 8)}
                            </p>
                        </HeadingContent>
                    </HeaderLeft>
                    <LikesWrapper onClick={likeClickHandler}>
                        {isLiked ? <HeartActive /> : <Heart />}
                        {likes}
                    </LikesWrapper>
                </HeadingWrapper>
                <CommentText>{text}</CommentText>
            </CommentWrapper>
            {subcomments.length > 0 && (
                <SubCommentsWrapper>{subcomments}</SubCommentsWrapper>
            )}
        </Wrapper>
    );
};

export default Comment;
