import Home from "@screens/Home/Home.tsx";
import ForYouPage from "@screens/Article/ForYouPage.tsx";
import About from "@screens/About.tsx";
import Contact from "@screens/Contact.tsx";
import ArticleTopics from "@screens/Home/ArticleTopics.tsx";
import CreatePost from "@screens/Home/CreatePost.tsx";
import MyArticles from "@screens/MyArticles/MyArticles.tsx";
import NewArticle from "@screens/MyArticles/NewArticle.tsx";
import ReadArticle from "@screens/ReadArticle.tsx";

export const Home_Section1_Components = [
    { element: <CreatePost/>, name: 'Create Post' },
    {element: <ArticleTopics />, name: 'Article Topics' },
];

export const Screen_Routes = [
    { path: '*', element: <Home /> },
     { path: '/article', element: <ForYouPage /> },
    {path: '/myArticles', element: <MyArticles /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },

    {path: '/new', element: <NewArticle /> },
    {path: '/single/:slug', element: <ReadArticle /> },
];
