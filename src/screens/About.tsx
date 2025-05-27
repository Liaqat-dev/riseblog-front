import {FaGithub, FaInstagram, FaLinkedin, FaWhatsapp} from "react-icons/fa";

function About() {
    return (
        <div className="flex flex-col items-center bg-white-1 min-h-screen  p-6 p-6 pb-10">
            <h1 className="text-5xl font-bold mb-4 text text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                About RiseBlog
            </h1>
            <p className="text-lg text-gray-700 text-center max-w-2xl mb-6">
                RiseBlog is a modern blogging platform designed to empower writers and readers alike.
                With an intuitive interface, powerful tag-based recommendations, and seamless authentication,
                RiseBlog offers an unparalleled reading and writing experience.
            </p>
            <div className="max-w-4xl text-gray-700 text-lg leading-relaxed">
                <h2 className="text-3xl font-semibold text-secondary mb-4">Our Mission</h2>
                <p>
                    Our goal is to provide a space where creators can share their thoughts, ideas, and stories
                    with the world. We believe in the power of words and strive to create a community that
                    values insightful content and meaningful discussions. Whether you're an aspiring writer
                    or an avid reader, RiseBlog provides the perfect platform to engage with high-quality content.
                </p>
                <h2 className="text-3xl font-semibold text-secondary mt-6 mb-4">Why Choose RiseBlog?</h2>
                <p>
                    Unlike traditional blogging platforms, RiseBlog focuses on intelligent content curation
                    and user engagement. Our recommendation system ensures that you discover relevant articles
                    tailored to your interests. We also provide seamless social sharing and an interactive
                    comment section to foster discussions within the community.
                </p>
                <h2 className="text-3xl font-semibold text-secondary mt-6 mb-4">Features of RiseBlog</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>🔥 Tag-based recommendation system for personalized reading</li>
                    <li>📝 Rich-text editing for beautiful and engaging posts</li>
                    <li>🔐 Secure authentication with Google OAuth</li>
                    <li>📈 Trending articles and daily topic highlights</li>
                    <li>🎨 Clean and modern user interface</li>
                    <li>💬 Interactive comment section to engage with readers</li>
                    <li>📲 Mobile-friendly design for seamless browsing on any device</li>
                </ul>
                <h2 className="text-3xl font-semibold text-secondary mt-6 mb-4">Meet the Developer</h2>
                <p>
                    Hi, I'm Liaqat, the creator of RiseBlog. I'm a passionate developer who loves
                    building intuitive and scalable web applications. My goal with RiseBlog is to create
                    a platform that makes content creation and discovery easy and enjoyable for everyone.
                    I specialize in full-stack development, focusing on modern frameworks and best practices
                    to deliver high-performance applications. Feel free to connect with me and share your thoughts!
                </p>
                <div className="flex mx-auto w-fit gap-4 mt-6 mb-10 ">
                    <a href="https://wa.me/+923044016143" target="_blank" rel="noopener noreferrer"
                       className="text-secondary text-2xl hover:opacity-80 hover:scale-125">
                        <FaWhatsapp className={'text-green-500'}/>
                    </a>
                    <a href="https://instagram.com/liaqat_ali6143" target="_blank" rel="noopener noreferrer"
                       className="text-secondary text-2xl hover:opacity-80 hover:scale-125">
                        <FaInstagram className={'text-pink-500'}/>
                    </a>
                    <a href="https://github.com/liaqat-dev" target="_blank" rel="noopener noreferrer"
                       className="text-secondary text-2xl hover:opacity-80 hover:scale-125">
                        <FaGithub className={'text-black'}/>
                    </a>
                    <a href="https://linkedin.com/in/dev-liaqat-ali" target="_blank" rel="noopener noreferrer"
                       className="text-secondary text-2xl hover:opacity-80 hover:scale-125">
                        <FaLinkedin/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default About;
