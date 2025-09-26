import React from 'react';
import { Heart, Zap, Shield, Users, ArrowRight, Play } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Advanced AI Analysis',
      description: 'State-of-the-art machine learning algorithms for precise medical imaging analysis.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive scan results in seconds, not hours.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Your medical data is protected with enterprise-grade security.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Expert medical professionals available around the clock.',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-up">
            {/* Main Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center animate-float shadow-2xl">
                  <Heart className="h-12 w-12 text-white animate-heartbeat" fill="currentColor" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse-ring"></div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold animated-bg-text">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
                MedScan AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in delay-300">
              Revolutionary AI-powered medical imaging analysis for faster, more accurate diagnoses
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-500">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animated-bg overflow-hidden">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start Scanning</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group flex items-center space-x-2 px-8 py-4 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 animated-bg">
                <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose MedScan AI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of medical imaging with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl animated-bg animate-fade-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 animated-bg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-up">
                <div className="text-4xl font-bold text-blue-600 mb-2 animate-counter" data-target="99">99%</div>
                <p className="text-gray-600 dark:text-gray-300">Accuracy Rate</p>
              </div>
              <div className="animate-fade-up delay-200">
                <div className="text-4xl font-bold text-cyan-600 mb-2 animate-counter" data-target="10000">10k+</div>
                <p className="text-gray-600 dark:text-gray-300">Scans Analyzed</p>
              </div>
              <div className="animate-fade-up delay-400">
                <div className="text-4xl font-bold text-purple-600 mb-2 animate-counter" data-target="500">500+</div>
                <p className="text-gray-600 dark:text-gray-300">Healthcare Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;