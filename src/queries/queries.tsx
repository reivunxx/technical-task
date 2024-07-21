import {
    InfiniteData,
    keepPreviousData,
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    CommentType,
    GetCommentsResponseType,
} from "../types/getCommentsResponseType";
import getCommentsRequest from "../api/comments/getCommentsRequest";
import {GetAuthorsType} from "../types/getAuthorsType";
import getAuthorsRequest from "../api/authors/getAuthorsRequest";

export const useGetComments = () => {
    //По умолчанию включен рефетч при потере фокуса окна. Это означает, что если мы подгрузили несколько страниц, то будет обновлен кэш для каждой из них.
    return useInfiniteQuery<GetCommentsResponseType>({
        queryKey: ["comments"],
        queryFn: ({pageParam}) => getCommentsRequest(pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.pagination.total_pages === lastPageParam) {
                return undefined;
            }
            return (lastPageParam as number) + 1;
        },
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    });
};

export const useGetAuthors = () => {
    return useQuery<GetAuthorsType>({
        queryKey: ["authors"],
        queryFn: getAuthorsRequest,
        refetchOnMount: false, //верим в то, что апи возвращает полный список пользователей, и не делаем лишних запросов. При этом рефетч при потере фокуса окна остается
    });
};

type LikeActionType = "set" | "unset";
export const useLikeComment = () => {
    const client = useQueryClient();

    return useMutation({
        onMutate: async ({
            comment_id,
            action_type,
        }: {
            comment_id: CommentType["id"];
            action_type: LikeActionType;
        }) => {
            await client.cancelQueries({queryKey: ["comments"]});

            try {
                //Тут пересобираем весь кэш комментов, меняя количество лайков
                client.setQueryData(
                    ["comments"],
                    (currentData: InfiniteData<GetCommentsResponseType>) => ({
                        ...currentData,
                        pages: currentData.pages.map((page) => ({
                            ...page,
                            data: page.data.map((comment) =>
                                comment.id === comment_id
                                    ? {
                                          ...comment,
                                          likes:
                                              action_type === "set"
                                                  ? comment.likes + 1
                                                  : comment.likes - 1,
                                      }
                                    : comment,
                            ),
                        })),
                    }),
                );
            } catch (e) {
                console.log(e);
            }
        },
    });
};
