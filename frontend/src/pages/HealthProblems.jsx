import React from "react";
import { FaBrain } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { FaSadTear } from "react-icons/fa";
import { FaEyeDropper } from "react-icons/fa";
import { FaPuzzlePiece } from "react-icons/fa";

const HealthProblems = () => {
  const mentalHealthConditions = [
    {
      icon: <FaBrain className="text-4xl text-primary-teal" />,
      title: "Anxiety Disorders",
      description: "Anxiety disorders include generalized anxiety disorder, social phobias, and specific phobias. They can affect daily functioning and cause excessive worry.",
      fact: "Anxiety disorders affect over 18% of the population globally.",
      link: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/anxiety-disorders"
    },
    {
      icon: <FaChild className="text-4xl text-primary-teal" />,
      title: "Behavioral and Emotional Disorders in Children",
      description: "Bipolar affective disorder involves episodes of mania and depression, impacting mood regulation. Environmental stressors can trigger episodes.",
      fact: "Around 2% of children and adolescents experience bipolar disorder.",
      link: "https://www.betterhealth.vic.gov.au/health/healthyliving/behavioural-disorders-in-children"
    },
    {
      icon: <FaSadTear className="text-4xl text-primary-teal" />,
      title: "Depression",
      description: "Depression is a mood disorder marked by feelings of sadness, lack of interest, and reduced energy. It can result in significant impairment in daily life.",
      fact: "Depression affects more than 300 million people globally.",
      link: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/depression"
    },
    {
      icon: <FaEyeDropper className="text-4xl text-primary-teal" />,
      title: "Psychosis",
      description: "Psychosis involves a loss of contact with reality, with symptoms such as delusions or hallucinations. Treatment includes medication and therapy.",
      fact: "3% of people will experience psychosis at some point in their lives.",
      link: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/psychosis"
    },
    {
      icon: <FaPuzzlePiece className="text-4xl text-primary-teal" />,
      title: "Obsessive Compulsive Disorder",
      description: "OCD is characterized by intrusive thoughts and repetitive behaviors. Common treatments include cognitive behavioral therapy (CBT) and medication.",
      fact: "OCD affects about 1 in 40 adults and 1 in 100 children worldwide.",
      link: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/obsessive-compulsive-disorder"
    }
  ];

  return (
    <div className="bg-soft-bg min-h-screen font-sans">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-dark-accent mb-6">
            Understanding Mental Health Conditions
          </h1>
          <p className="text-xl text-gray-700 font-sans leading-relaxed max-w-3xl mx-auto">
            Learn about common mental health conditions, their symptoms, and available treatments. 
            Knowledge is the first step toward understanding and seeking help.
          </p>
        </div>

        {/* Mental Health Conditions */}
        <div className="space-y-8">
          {mentalHealthConditions.map((condition, index) => (
            <div key={index} className="card group">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-primary-teal/10 rounded-card">
                    {condition.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-serif font-extrabold text-dark-accent mb-4">
                    {condition.title}
                  </h3>
                  <p className="text-lg text-gray-700 font-sans leading-relaxed mb-6">
                    {condition.description}
                  </p>
                  <div className="bg-soft-bg p-4 rounded-card mb-6">
                    <p className="text-sm text-gray-600 font-sans">
                      <strong className="text-primary-teal">Did you know?</strong> {condition.fact}
                    </p>
                  </div>
                  <a
                    href={condition.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20">
          <div className="card text-center bg-gradient-to-r from-primary-teal to-dark-accent text-white">
            <h2 className="text-3xl font-serif font-extrabold mb-6">
              Need Professional Help?
            </h2>
            <p className="text-xl font-sans mb-8 opacity-90">
              If you or someone you know is struggling with mental health, 
              professional help is available and effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-secondary bg-white text-dark-accent hover:bg-gray-100">
                Find a Therapist
              </button>
              <button className="btn-secondary bg-white text-dark-accent hover:bg-gray-100">
                Emergency Resources
              </button>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-serif font-extrabold text-dark-accent text-center mb-12">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Crisis Helpline",
                description: "24/7 support for those in crisis",
                icon: "🆘"
              },
              {
                title: "Support Groups",
                description: "Connect with others facing similar challenges",
                icon: "🤝"
              },
              {
                title: "Educational Materials",
                description: "Learn more about mental health and wellness",
                icon: "📚"
              }
            ].map((resource, index) => (
              <div key={index} className="card text-center">
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-serif font-extrabold text-dark-accent mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-700 font-sans leading-relaxed">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthProblems;
