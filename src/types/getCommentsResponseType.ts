export type GetCommentsResponseType = {
    data: CommentType[];
    pagination: {
        page: number;
        size: number;
        total_pages: number;
    };
};

export type CommentType = {
    id: number;
    created: Date; //Дата формата "2024-07-15T09:18:01.481Z"
    text: string;
    author: number; //id автора коммента
    likes: number; //Может быть 0
    parent?: number; //id коммента-родителя
};
