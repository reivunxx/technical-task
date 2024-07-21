import Comment from "../../Components/Comment/Comment";
import {
    ContentWrapper,
    CountersWrapper,
    Layout,
    LikesCounter,
    LoadMoreButton,
} from "./main.styled";
import {useGetAuthors, useGetComments} from "../../queries/queries";
import {morph} from "../../lib/helpers";
import {ReactComponent as Heart} from "../../icons/heart-counter.svg";
import {useEffect, useMemo} from "react";
import Loader from "../../Components/Loader/Loader";
const Main = () => {
    const {
        data: commentsData,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isLoading,
        failureReason,
    } = useGetComments();
    const {} = useGetAuthors(); // Убираем waterfall, запрашивая одновременно с комментами

    useEffect(() => {
        if (failureReason) {
            console.log(
                "Друг, что-то пошло не по плану, мы попробуем еще раз",
                {failureReason},
            );
        }
    }, [failureReason]);

    const allComments = useMemo(
        () => commentsData && commentsData.pages.flatMap((page) => page.data),
        [commentsData],
    );

    return (
        <Layout>
            {isLoading ? (
                <Loader />
            ) : (
                allComments && (
                    <ContentWrapper>
                        {/*По-хорошему для этого блока нужно отдельное апи*/}
                        <CountersWrapper>
                            <h3>
                                {allComments.length}{" "}
                                {morph(allComments.length, [
                                    "комментарий",
                                    "комментария",
                                    "комментариев",
                                ])}
                            </h3>
                            <LikesCounter>
                                <Heart />
                                <p>
                                    {allComments.reduce(
                                        (accumulator, currentValue) =>
                                            accumulator + currentValue.likes,
                                        0,
                                    )}
                                </p>
                            </LikesCounter>
                        </CountersWrapper>

                        {allComments
                            .filter((comment) => comment.parent === null)
                            .map((comment) => (
                                <Comment {...comment} key={comment.id} />
                            ))}

                        {hasNextPage && (
                            <LoadMoreButton
                                disabled={isFetching}
                                onClick={() => fetchNextPage()}
                            >
                                {isFetching ? "Загружаем..." : "Загрузить еще"}
                            </LoadMoreButton>
                        )}
                    </ContentWrapper>
                )
            )}
        </Layout>
    );
};

export default Main;
