import axios from 'axios';


// const posts = axios.create({baseURL: 'http://localhost:3000/api/post/', withCredentials: true});
// const user = axios.create({baseURL: 'http://localhost:3000/api/user/', withCredentials: true});
const posts = axios.create({baseURL: 'https://codebyliaqat.site/api/post/', withCredentials: true});
const user = axios.create({baseURL: 'https://codebyliaqat.site/api/user/', withCredentials: true});

const SignIn = () => {
    window.location.href = `https://codebyliaqat.site/api/auth/google?state=${encodeURIComponent(window.location.href)}`;
    // window.location.href = 'https://codebyliaqat.site/api/auth/google';
    // window.location.href = `http://localhost:3000/api/auth/google?state=${encodeURIComponent(window.location.href)}`;

};
const SignOut = () => {
    window.location.href = `https://codebyliaqat.site//api/auth/logout?state=${encodeURIComponent(window.location.href)}`;
    // window.location.href = `http://localhost:3000/api/auth/logout?state=${encodeURIComponent(window.location.href)}`;
}


const createArticle = async (formData: FormData) => {
    try {
        const {data} = await posts.post(`/create`, formData);
        return {post: data};
    } catch (e) {
        return {error: e}
    }
}
const updateArticle = async (postId:string,formData: FormData) => {
    try {
        const {data} = await posts.put(`/${postId}`, formData);
        return {post: data};
    } catch (e) {
        return {error: e}
    }
}
const uploadImage = async (formData: FormData) => {
    try {
        const {data} = await posts.post(`/upload`, formData)
        return data.imageUrl;
    } catch (e) {
        console.error(e);
    }
}
const getArticles = async (pageNo: number, limit: number) => {
    try {
        const {data} = await posts.get(`/posts?pageNo=${pageNo}&limit=${limit}`);
        console.log(data)
        return data;

    } catch (e) {
        return {error: e}
    }
}
const getArticlesByTag = async (tag: string, pageNo: number, limit: number) => {
    try {
        const {data} = await posts.get(`/posts/${tag}?pageNo=${pageNo}&limit=${limit}`);
        return data;

    } catch (e) {
        return {error: e}
    }
}
const getArticlesByAuthor = async (authorId: string, pageNo: number, limit: number) => {
    try {
        const {data} = await posts.get(`/posts/author/${authorId}?pageNo=${pageNo}&limit=${limit}`);

        return data;

    } catch (e) {
        return {error: e}
    }
}
const removeArticle = async (articleId: string) => {
    return await posts.delete(`/${articleId}`)

}
const getArticleBySlug = async (slug: string) => {
    const {data} = await posts.get(`/single/${slug}`);
    return data.post
}

const getSimilarArticles = async (id: string) => {
    const {data} = await posts.get(`/similar-posts/${id}`);
    return data;
}
const likeArticle = async (postId: string,userId:string) => {
    const response= await posts.patch(`/like/${postId}/${userId}`);
    console.log(response);
}
const searchArticles = async (query: string) => {
    try {
        const {data} = await posts.get(`/search?title=${query}`);
        console.log(data)

    } catch (e) {
        console.error(e);
    }
}


const fetchCurrentUser = async () => {
    try {
        const res = await user.get('/me');
        if (res.status === 200) {
            return res.data.user;
        }

    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export {
    SignIn,
    SignOut,
    createArticle,
    updateArticle,
    getArticles,
    fetchCurrentUser,
    getArticleBySlug,
    getArticlesByTag,
    getArticlesByAuthor,
    getSimilarArticles,
    removeArticle,
    likeArticle,
    searchArticles,
    uploadImage
}