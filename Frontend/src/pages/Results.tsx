import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, User, Clock, TrendingUp } from 'lucide-react';

const Results: React.FC = () => {
  const [selectedResult, setSelectedResult] = useState<number | null>(null);

  const results = [
    {
      id: 1,
      date: '2024-12-14',
      type: 'Chest X-Ray',
      status: 'Normal',
      confidence: 98.5,
      patient: 'John Doe',
      findings: 'No acute cardiopulmonary abnormalities detected. Heart size and pulmonary vasculature appear within normal limits.',
      recommendations: ['Continue routine screening', 'Maintain healthy lifestyle'],
      statusColor: 'green'
    },
    {
      id: 2,
      date: '2024-12-13',
      type: 'MRI Brain',
      status: 'Abnormal',
      confidence: 94.2,
      patient: 'Jane Smith',
      findings: 'Small hyperintense lesion noted in the left frontal lobe. Further evaluation recommended.',
      recommendations: ['Follow-up with neurologist', 'Additional imaging in 3 months'],
      statusColor: 'orange'
    },
    {
      id: 3,
      date: '2024-12-12',
      type: 'CT Abdomen',
      status: 'Normal',
      confidence: 96.8,
      patient: 'Mike Johnson',
      findings: 'Abdominal organs appear normal. No signs of inflammation or abnormal masses.',
      recommendations: ['No immediate action required', 'Routine follow-up as scheduled'],
      statusColor: 'green'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center animate-float shadow-xl">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Scan Results
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            View and manage your medical imaging analysis results
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results List */}
          <div className="lg:col-span-2 space-y-6 animate-fade-up delay-200">
            {results.map((result, index) => (
              <div
                key={result.id}
                className={`group bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02] animated-bg cursor-pointer ${
                  selectedResult === result.id ? 'ring-2 ring-blue-500 shadow-2xl' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setSelectedResult(selectedResult === result.id ? null : result.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${
                      result.statusColor === 'green' ? 'from-green-500 to-emerald-400' : 'from-orange-500 to-yellow-400'
                    } rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                        {result.type}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{result.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{result.patient}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.statusColor === 'green' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                    }`}>
                      {result.status}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <TrendingUp className="h-4 w-4" />
                      <span>{result.confidence}%</span>
                    </div>
                  </div>
                </div>

                {selectedResult === result.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Findings:</h4>
                        <p className="text-gray-600 dark:text-gray-300">{result.findings}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Recommendations:</h4>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec, i) => (
                            <li key={i} className="text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex space-x-4 pt-4">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fade-up delay-400">
            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 animated-bg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Total Scans</span>
                  <span className="text-2xl font-bold text-blue-600">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">This Month</span>
                  <span className="text-2xl font-bold text-green-600">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Avg. Confidence</span>
                  <span className="text-2xl font-bold text-purple-600">96.5%</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 animated-bg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Chest X-Ray analyzed', time: '2 hours ago' },
                  { action: 'Report downloaded', time: '5 hours ago' },
                  { action: 'MRI scan completed', time: '1 day ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{activity.action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full group relative px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl animated-bg overflow-hidden">
                <span className="relative z-10">New Scan</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="w-full px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 animated-bg">
                Export All Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;