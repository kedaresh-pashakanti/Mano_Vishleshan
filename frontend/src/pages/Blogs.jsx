import React, { useState } from "react";

const blogData = [
  {
    title: "How to help the Children: Covid-19 and Health Anxiety",
    image: "images/children.jpg",
    category: "Mental Health",
    description: "The Covid-19 pandemic has changed the life of children in profound ways. The safety measures like: Isolation,...",
    link: "https://mpowerminds.com/blog/How-to-help-the-children-COVID-19-and-health-anxiety-Need-for-child-counselling-in-Kolkata"
  },
  {
    title: "Common questions people ask about depression and mental health disorders",
    image: "images/questions.jpg",
    category: "Mental Health",
    description: "Seeking help for your mental health as early as possible can make a big...",
    link: "https://mpowerminds.com/blog/Common-questions-people-ask-about-depression-and-mental-health-disorders-and-Finding-a-good-psychiatrist-in-Mumbai"
  },
  {
    title: "Be kind to others as not every struggle is visible",
    image: "images/beKind.jpg",
    category: "Wellness",
    description: "My first experience of anxiety wasn't until I started my second year at sixth form and wow did it hit me hard!...",
    link: "https://www.rethink.org/news-and-stories/blogs/2021/09/be-kind-to-others-as-not-every-struggle-is-visible-harriets-story/"
  },
  {
    title: "The Importance of Mental Wellness: How to Prioritize Your Mental Health",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4MxndZ99EaxS7TpM0KA0-W8BzqPG2RTB32A&s  ",
    category: "Wellness",
    description: "Prioritizing your mental health is just as important as physical health. This blog provides tips on...",
    link: "https://www.mentalhealthfirstaid.org/2021/07/the-importance-of-mental-wellness-how-to-prioritize-your-mental-health/"
  },
  {
    title: "Self-Care Strategies for Managing Anxiety",
    image: "https://fastercapital.com/i/Anxiety-Awareness-Services--How-to-Cope-with-and-Overcome-Anxiety--Self-Care-Strategies-for-Managing-Anxiety.webp",
    category: "Self-Care",
    description: "Self-care is essential in managing anxiety. In this blog, we explore techniques that can help you cope...",
    link: "https://psychcentral.com/anxiety/anxiety-self-care"
  },
  {
    title: "Overcoming Social Anxiety: Practical Tips",
    image: "https://img1.wsimg.com/isteam/ip/a69ba507-9b7b-415f-864a-6ec8bf7ad6d0/How-to-overcome-social-anxiety-1024x1024.webp",
    category: "Anxiety",
    description: "Social anxiety affects millions of people. This blog shares practical tips and techniques to overcome it...",
    link: "https://www.healthline.com/health/mental-health/social-anxiety-tips"
  },
];

const categories = ["All", "Mental Health", "Self-Care", "Anxiety", "Wellness"];

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs =
    selectedCategory === "All"
      ? blogData
      : blogData.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="bg-soft-bg min-h-screen font-sans">
      <main className="p-6">
        {/* Featured Blog */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-extrabold text-dark-accent mb-8">Featured Blog</h2>
          <div className="card max-w-4xl mx-auto overflow-hidden">
            <img 
              src="https://www.yashodahospitals.com/wp-content/uploads/2020/05/Understanding-Mental-Health-and-Mental-illness-1-1200x720.jpg" 
              alt="Featured Blog" 
              className="w-full h-80 object-cover rounded-t-card" 
            />
            <div className="p-8">
              <h3 className="text-3xl font-serif font-extrabold text-dark-accent mb-4">
                Understanding Mental Health: A Beginner's Guide
              </h3>
              <p className="text-gray-700 font-sans leading-relaxed mb-6">
                Mental health is a crucial aspect of our overall well-being. In this comprehensive guide, we cover the basics of mental health, 
                common misconceptions, and practical steps you can take to maintain good mental wellness.
              </p>
              <a
                href="https://www.mind.org.uk/information-support/types-of-mental-health-problems/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Read More
              </a>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-extrabold text-dark-accent text-center mb-8">Blog Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-button font-sans font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-primary-teal text-white shadow-lg"
                    : "bg-white text-primary-teal border-2 border-primary-teal hover:bg-primary-teal hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards */}
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif font-extrabold text-dark-accent text-center mb-12">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <div key={index} className="card group overflow-hidden">
                <div className="aspect-video overflow-hidden rounded-t-card">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary-teal/10 text-primary-teal text-sm font-sans font-medium rounded-full mb-4">
                    {blog.category}
                  </span>
                  <h4 className="text-xl font-serif font-extrabold text-dark-accent mb-4 leading-tight">
                    {blog.title}
                  </h4>
                  <p className="text-gray-700 font-sans leading-relaxed mb-6">
                    {blog.description}
                  </p>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-teal font-sans font-medium hover:text-dark-accent transition-colors inline-flex items-center"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="mt-20">
          <div className="card max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-extrabold text-dark-accent mb-8">Recent Articles</h2>
            <div className="space-y-6">
              {[
                {
                  title: "10 Simple Ways to Manage Stress",
                  link: "https://www.verywellmind.com/tips-to-reduce-stress-3145195"
                },
                {
                  title: "The Science of Mental Wellness",
                  link: "https://www.psychologytoday.com/us/blog/urban-survival/202107/the-science-mental-wellness"
                },
                {
                  title: "5 Signs You May Have Anxiety",
                  link: "https://www.healthline.com/health/anxiety/signs-you-have-anxiety"
                },
                {
                  title: "Building Resilience in Difficult Times",
                  link: "https://www.apa.org/topics/resilience"
                },
                {
                  title: "Mindfulness Techniques for Daily Life",
                  link: "https://www.mindful.org/mindfulness-practice/"
                }
              ].map((article, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-soft-bg rounded-card hover:bg-white transition-colors">
                  <h3 className="text-lg font-serif font-extrabold text-dark-accent">
                    {article.title}
                  </h3>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-teal font-sans font-medium hover:text-dark-accent transition-colors"
                  >
                    Read →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20">
          <div className="card max-w-2xl mx-auto text-center bg-gradient-to-r from-primary-teal to-dark-accent text-white">
            <h2 className="text-3xl font-serif font-extrabold mb-4">Stay Updated</h2>
            <p className="text-lg font-sans mb-6 opacity-90">
              Get the latest mental health insights and tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-button text-dark-accent font-sans flex-1 max-w-md"
              />
              <button className="btn-secondary bg-white text-dark-accent hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blogs;
