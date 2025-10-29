import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-soft-bg font-sans">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-teal/10 to-dark-accent/10">
        <div className="container mx-auto px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-primary-teal/20 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-teal" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-dark-accent mb-6">
            Welcome to MANOVISHLESHAN
          </h1>
          <p className="text-xl text-gray-700 font-sans leading-relaxed max-w-3xl mx-auto">
            Your trusted companion in understanding, managing, and overcoming mental health challenges. 
            We're dedicated to providing compassionate care and evidence-based support for your wellness journey.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-dark-accent mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 font-sans leading-relaxed">
              Mental health is a fundamental aspect of human well-being that affects every aspect of our lives. 
              At <strong className="text-primary-teal">MANOVISHLESHAN</strong>, we believe that everyone deserves 
              access to quality mental health support, regardless of their background or circumstances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Self-Assessment",
                description: "Take clinically validated self-screening tests to understand your mental health status.",
                icon: "🧠"
              },
              {
                title: "Guided Support",
                description: "Access mental health resources, expert articles, and evidence-based self-help strategies.",
                icon: "📚"
              },
              {
                title: "Professional Consultation",
                description: "Connect with certified mental health professionals for personalized guidance and support.",
                icon: "👨‍⚕️"
              },
              {
                title: "Community Support",
                description: "Join a safe, supportive community where you can share experiences and receive encouragement.",
                icon: "🤝"
              }
            ].map((feature, index) => (
              <div key={index} className="card text-center group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif font-extrabold text-dark-accent mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 font-sans leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-dark-accent text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Compassion",
                description: "We approach mental health with empathy, understanding, and unconditional positive regard for every individual.",
                icon: "💙"
              },
              {
                title: "Evidence-Based",
                description: "All our tools and resources are grounded in scientific research and clinical best practices.",
                icon: "🔬"
              },
              {
                title: "Accessibility",
                description: "We strive to make mental health support available to everyone, regardless of location or financial means.",
                icon: "🌍"
              }
            ].map((value, index) => (
              <div key={index} className="card text-center">
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-serif font-extrabold text-dark-accent mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-700 font-sans leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-dark-accent text-center mb-16">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Clinical Psychologist",
                description: "Specializes in anxiety disorders and cognitive behavioral therapy.",
                image: "👩‍⚕️"
              },
              {
                name: "Dr. Michael Chen",
                role: "Psychiatrist",
                description: "Expert in medication management and treatment-resistant depression.",
                image: "👨‍⚕️"
              },
              {
                name: "Dr. Emily Rodriguez",
                role: "Child & Adolescent Therapist",
                description: "Dedicated to supporting young people through their mental health journey.",
                image: "👩‍🏫"
              }
            ].map((member, index) => (
              <div key={index} className="card text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-serif font-extrabold text-dark-accent mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-teal font-sans font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-700 font-sans leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-teal to-dark-accent text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold mb-6">
            Ready to Take the First Step?
          </h2>
          <p className="text-xl font-sans mb-8 opacity-90 max-w-2xl mx-auto">
            Awareness is the first step toward healing. Begin your mental wellness journey with 
            MANOVISHLESHAN today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quiz"
              className="btn-secondary bg-white text-dark-accent hover:bg-gray-100 text-lg px-8 py-4"
            >
              Start Self-Assessment
            </a>
            <a
              href="/blogs"
              className="btn-secondary bg-white text-dark-accent hover:bg-gray-100 text-lg px-8 py-4"
            >
              Explore Resources
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="card max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-extrabold text-dark-accent mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-700 font-sans leading-relaxed mb-8">
              Have questions or need support? Our team is here to help you on your mental health journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-serif font-extrabold text-dark-accent mb-2">Email</h3>
                <p className="text-gray-700 font-sans">support@manovishleshan.com</p>
              </div>
              <div>
                <h3 className="text-lg font-serif font-extrabold text-dark-accent mb-2">Phone</h3>
                <p className="text-gray-700 font-sans">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-lg font-serif font-extrabold text-dark-accent mb-2">Emergency</h3>
                <p className="text-gray-700 font-sans">988 - Suicide & Crisis Lifeline</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
