import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScrollAnimation from "../Components/ScrollAnimation";

const images = [
  "/images/calm1.jpg",
  "/images/calm2.jpg",
  "/images/calm3.jpg",
  "/images/calm4.jpg",
  "/images/calm5.png",
];

const CombinedHomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-soft-bg font-sans overflow-hidden">
      {/* Hero Section - Enhanced with bubble effects and cursor tracking */}
      <main className="relative h-screen w-full">
        <img
          src={images[currentImage]}
          alt="Healthcare Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`
          }}
        />
        
        {/* Enhanced overlay with gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40 animate-gradient" />
        
        {/* Simple elegant bubble effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/8 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white/6 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-white/7 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
          <ScrollAnimation animationType="scale-in" className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 animate-fade-in-up">
              Welcome to <span className="text-white font-bold drop-shadow-lg animate-pulse-slow">MANOVISHLESHAN</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-sans mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Your trusted digital companion for mental wellness and emotional well-being
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={() => navigate("/diary")}
                className="btn-primary text-lg px-8 py-4 font-medium animate-pulse-slow"
              >
                Get Started
              </button>
              <Link 
                to="/healthProblems" 
                className="btn-secondary text-lg px-8 py-4 font-medium bg-white text-accent hover:bg-accent hover:text-white"
              >
                Learn More
              </Link>
            </div>
          </ScrollAnimation>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </main>

      {/* Floating Diary Button - Original functionality preserved */}
      <button
        onClick={() => navigate("/diary")}
        className="fab"
        title="Start Writing Diary"
      >
        +
      </button>

      {/* Features Section - Enhanced with staggered animations */}
      <section className="section">
        <div className="container mx-auto">
          <ScrollAnimation animationType="fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-text text-center mb-16">
              Our Core Features
            </h2>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Self-Assessment",
                description: "Use our validated tools to check your mental health status and get personalized insights.",
                icon: "🧠",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Daily Mood Diary",
                description: "Log your emotions and identify patterns to better understand your mental health journey.",
                icon: "📝",
                color: "from-green-500 to-green-600"
              },
              {
                title: "Expert Consultation",
                description: "Book appointments with certified mental health professionals easily and securely.",
                icon: "👨‍⚕️",
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Progress Reports",
                description: "Visualize your journey and growth through detailed charts and analytics.",
                icon: "📊",
                color: "from-orange-500 to-orange-600"
              },
              {
                title: "Resources & Blogs",
                description: "Stay informed with doctor-approved articles, tips, and mental health resources.",
                icon: "📚",
                color: "from-pink-500 to-pink-600"
              },
              {
                title: "Secure & Confidential",
                description: "We ensure top-tier privacy and security for your sensitive mental health data.",
                icon: "🔒",
                color: "from-indigo-500 to-indigo-600"
              },
            ].map((item, index) => (
              <ScrollAnimation 
                key={index} 
                animationType="fade-in" 
                delay={index * 100}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <div className="card group relative overflow-hidden h-64 flex flex-col">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-dark-text mb-4 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-text-muted font-sans leading-relaxed relative z-10 flex-grow">
                    {item.description}
                  </p>
                  
                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent to-accent-light transition-all duration-300 group-hover:w-full"></div>
              </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Mental Health Tips - Enhanced with interactive elements */}
      <section className="section bg-white relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--accent) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <ScrollAnimation animationType="fade-in">
            <h2 className="text-4xl font-serif font-bold text-dark-text text-center mb-16">
              Daily Mental Health Tips
            </h2>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation animationType="fade-in-left">
              <div className="card group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 animate-pulse-slow">
                    <span className="text-white text-xl">🌅</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-dark-text">Morning Routine</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Start your day with 10 minutes of deep breathing or meditation",
                    "Journal your thoughts to release emotional tension",
                    "Spend at least 30 minutes outdoors or in sunlight"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start group/item">
                      <span className="text-accent mr-3 mt-1 group-hover/item:scale-125 transition-transform duration-200">•</span>
                      <span className="font-sans text-text-muted group-hover/item:text-dark-text transition-colors duration-200">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animationType="fade-in-right">
              <div className="card group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-4 animate-pulse-slow">
                    <span className="text-white text-xl">🌙</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-dark-text">Evening Routine</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Unplug from screens and social media for mental clarity",
                    "Practice gratitude by listing three things you're thankful for",
                    "Talk to a friend or counselor if you're feeling overwhelmed"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start group/item">
                      <span className="text-accent mr-3 mt-1 group-hover/item:scale-125 transition-transform duration-200">•</span>
                      <span className="font-sans text-text-muted group-hover/item:text-dark-text transition-colors duration-200">{tip}</span>
                    </li>
                  ))}
          </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced with 3D card effect */}
      <section className="section">
        <div className="container mx-auto">
          <ScrollAnimation animationType="fade-in">
            <h2 className="text-4xl font-serif font-bold text-dark-text text-center mb-16">
              What Our Users Say
            </h2>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: "Aarav", 
                quote: "MANOVISHLESHAN gave me hope during tough times. The interface is so calming and easy to use.",
                avatar: "👨‍💼"
              },
              { 
                name: "Riya", 
                quote: "I love the daily diary feature. It helped me understand my emotional patterns better.",
                avatar: "👩‍💼"
              },
              { 
                name: "Zoya", 
                quote: "Clean interface and amazing tools. Highly recommend to anyone struggling with mental health.",
                avatar: "👩‍🎓"
              },
              { 
                name: "Kabir", 
                quote: "It felt like someone was finally listening to me without judgment. The privacy features are excellent.",
                avatar: "👨‍🎓"
              },
              { 
                name: "Mira", 
                quote: "The self-assessment tools gave me a lot of clarity about my mental health status.",
                avatar: "👩‍⚕️"
              },
              { 
                name: "Jay", 
                quote: "My favorite part is how calm and peaceful the entire experience feels. It's truly therapeutic.",
                avatar: "👨‍⚕️"
              },
            ].map((t, i) => (
              <ScrollAnimation key={i} animationType="scale-in" delay={i * 100}>
                <div className="card group perspective-1000">
                  <div className="relative transform transition-transform duration-500 group-hover:rotate-y-12">
                    <div className="text-6xl mb-4 text-center animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                      {t.avatar}
                    </div>
                    <p className="text-text-muted italic mb-6 font-sans leading-relaxed relative z-10">
                      "{t.quote}"
                    </p>
                    <h4 className="text-dark-text font-serif font-semibold text-center relative z-10">
                      – {t.name}
                    </h4>
                  </div>
              </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced with accordion-like animations */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <ScrollAnimation animationType="fade-in">
            <h2 className="text-4xl font-serif font-bold text-dark-text text-center mb-16">
              Frequently Asked Questions
            </h2>
          </ScrollAnimation>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { 
                q: "Is MANOVISHLESHAN free to use?", 
                a: "Yes, all basic features including self-assessment and diary are completely free. Premium features may require a subscription." 
              },
              { 
                q: "Is my data private and secure?", 
                a: "Absolutely. We use enterprise-grade encryption and never share your data without explicit consent. Your privacy is our top priority." 
              },
              { 
                q: "Can I talk to a real mental health professional?", 
                a: "Yes! You can book appointments with licensed therapists and counselors through our platform." 
              },
              { 
                q: "How accurate are the mental health assessments?", 
                a: "Our assessments are based on validated clinical tools and research. However, they are not a substitute for professional diagnosis." 
              },
            ].map((faq, idx) => (
              <ScrollAnimation key={idx} animationType="fade-in" delay={idx * 150}>
                <div className="card group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-serif font-semibold text-dark-text mb-4 group-hover:text-accent transition-colors duration-300">
                    {faq.q}
                  </h3>
                  <p className="text-text-muted font-sans leading-relaxed group-hover:text-dark-text transition-colors duration-300">
                    {faq.a}
                  </p>
              </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Enhanced with text reveal */}
      <section className="section">
        <div className="container mx-auto text-center">
          <ScrollAnimation animationType="fade-in">
            <h2 className="text-4xl font-serif font-bold text-dark-text mb-8 text-reveal">
              About MANOVISHLESHAN
            </h2>
          </ScrollAnimation>
          <ScrollAnimation animationType="fade-in" delay={200}>
            <p className="text-lg text-text-muted font-sans leading-relaxed max-w-3xl mx-auto">
              We're dedicated to providing individuals with comprehensive tools to assess, understand, and improve their mental health.
              Our platform combines clinical expertise with interactive and user-friendly features to create a safe and supportive 
              mental health journey. MANOVISHLESHAN is more than just an app – it's your companion in mental wellness.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Call to Action - Enhanced with gradient animation */}
      <section className="section bg-gradient-to-r from-accent to-accent-light text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/8 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimation animationType="scale-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Start Your Mental Wellness Journey
            </h2>
          </ScrollAnimation>
          <ScrollAnimation animationType="fade-in" delay={200}>
            <p className="text-xl font-sans mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of users who have transformed their mental health with MANOVISHLESHAN
            </p>
          </ScrollAnimation>
          <ScrollAnimation animationType="fade-in" delay={400}>
            <button
              onClick={() => navigate("/diary")}
              className="btn-secondary bg-white text-accent hover:bg-accent hover:text-white text-lg px-10 py-4 font-medium inline-block animate-pulse-slow"
            >
              Begin Your Journey
            </button>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default CombinedHomePage;
