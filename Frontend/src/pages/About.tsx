import React from 'react';
import { Heart, Users, Award, Globe, Shield, Zap, Target, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Medical Officer',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      bio: 'Leading radiologist with 15+ years of experience in medical imaging and AI applications.'
    },
    {
      name: 'Alex Rodriguez',
      role: 'CTO & AI Lead',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      bio: 'Former Google AI researcher specializing in computer vision and medical image analysis.'
    },
    {
      name: 'Dr. Michael Park',
      role: 'Head of Research',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      bio: 'Published researcher in machine learning applications for healthcare diagnostics.'
    },
    {
      name: 'Emma Thompson',
      role: 'Product Director',
      image: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      bio: 'Healthcare product expert focused on user experience and clinical workflow integration.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient First',
      description: 'Every decision we make is guided by improving patient outcomes and healthcare accessibility.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'We maintain the highest standards of data protection and HIPAA compliance.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Accuracy',
      description: 'Our AI models are rigorously tested and validated to ensure medical-grade precision.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuous research and development to stay at the forefront of medical AI technology.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const milestones = [
    { year: '2020', event: 'MedScan AI founded with initial research grant' },
    { year: '2021', event: 'First AI model deployed for chest X-ray analysis' },
    { year: '2022', event: 'FDA approval for diagnostic imaging assistance' },
    { year: '2023', event: 'Partnership with 100+ healthcare facilities' },
    { year: '2024', event: 'Launch of comprehensive imaging analysis platform' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-up">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full flex items-center justify-center animate-float shadow-2xl">
                <Heart className="h-10 w-10 text-white animate-heartbeat" fill="currentColor" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse-ring"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
              About MedScan AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 animate-fade-in delay-300">
            Revolutionizing medical imaging with artificial intelligence to improve diagnostic accuracy, 
            reduce healthcare costs, and save lives worldwide.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20 animate-fade-up delay-400">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 animated-bg">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                To democratize access to advanced medical imaging analysis through AI, enabling healthcare 
                providers worldwide to deliver faster, more accurate diagnoses while reducing costs and 
                improving patient outcomes. We believe that every patient deserves access to world-class 
                diagnostic tools, regardless of their location or economic circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide every aspect of our work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl animated-bg animate-fade-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key milestones in our mission to transform medical imaging
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 animated-bg animate-fade-up delay-500">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-8 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/5 rounded-2xl p-6 group-hover:bg-white/10 transition-colors duration-300">
                      <p className="text-lg text-gray-700 dark:text-gray-300">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              World-class experts in AI, medicine, and healthcare technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl animated-bg animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {member.name}
                </h3>
                
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 animated-bg animate-fade-up delay-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2 animate-counter">1M+</div>
              <p className="text-gray-600 dark:text-gray-300">Images Analyzed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2 animate-counter">500+</div>
              <p className="text-gray-600 dark:text-gray-300">Healthcare Partners</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2 animate-counter">50</div>
              <p className="text-gray-600 dark:text-gray-300">Countries Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2 animate-counter">98.5%</div>
              <p className="text-gray-600 dark:text-gray-300">Accuracy Rate</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 animate-fade-up delay-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Join Us in Transforming Healthcare
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Whether you're a healthcare provider, researcher, or technology partner, 
            let's work together to make advanced medical imaging accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animated-bg overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="px-8 py-4 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 animated-bg">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;