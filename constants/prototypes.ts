export type Post = {
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        name: string;
    };
    meta:string,
    tags: string[],
    slug: string;
    thumbnail: string;
    likedBy: string[];
    timeStamp: string;
};
export type Pagination={
    currentPage: number;
    postsPerPage: number;
    totalPages: number;
    totalPosts: number;
}