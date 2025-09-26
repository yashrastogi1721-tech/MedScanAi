import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, Download, Filter } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');

  const chartData = [
    { name: 'Normal', value: 78, color: 'bg-green-500' },
    { name: 'Abnormal', value: 15, color: 'bg-orange-500' },
    { name: 'Critical', value: 7, color: 'bg-red-500' }
  ];

  const monthlyData = [
    { month: 'Jan', scans: 45, accuracy: 96.2 },
    { month: 'Feb', scans: 52, accuracy: 97.1 },
    { month: 'Mar', scans: 38, accuracy: 95.8 },
    { month: 'Apr', scans: 61, accuracy: 98.3 },
    { month: 'May', scans: 47, accuracy: 96.9 },
    { month: 'Jun', scans: 55, accuracy: 97.5 }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 animate-fade-up">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full flex items-center justify-center shadow-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Analytics & Reports
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive insights into your medical imaging data
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 animated-bg"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            
            <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl animated-bg overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Scans', value: '1,247', change: '+12%', icon: BarChart3, color: 'from-blue-500 to-cyan-400' },
            { label: 'Accuracy Rate', value: '97.3%', change: '+0.8%', icon: TrendingUp, color: 'from-green-500 to-emerald-400' },
            { label: 'Processing Time', value: '2.3s', change: '-15%', icon: Calendar, color: 'from-purple-500 to-pink-400' },
            { label: 'Critical Cases', value: '23', change: '-5%', icon: PieChart, color: 'from-orange-500 to-red-400' }
          ].map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl animated-bg animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-green-600 text-sm font-medium">{metric.change}</span>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {metric.value}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Scan Distribution */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 animated-bg animate-fade-up delay-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Scan Results Distribution
              </h3>
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {item.name}
                      </span>
                      <span className="text-gray-900 dark:text-white font-bold">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out animate-progress`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Insight:</strong> Normal results increased by 8% this month, indicating improved patient health trends.
              </p>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 animated-bg animate-fade-up delay-600">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Monthly Performance
              </h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            
            <div className="space-y-6">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 dark:text-gray-400 font-medium w-12">
                      {data.month}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {data.scans} scans
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white font-medium">
                          {data.accuracy}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(data.scans / 70) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-green-50/50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-200 text-sm">
                <strong>Trend:</strong> Average accuracy has improved consistently, reaching a peak of 98.3% in April.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Reports Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 animated-bg animate-fade-up delay-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Reports
            </h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                    Patient
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                    Result
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                    Confidence
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-12-14', type: 'Chest X-Ray', patient: 'John Doe', result: 'Normal', confidence: '98.5%', status: 'green' },
                  { date: '2024-12-13', type: 'MRI Brain', patient: 'Jane Smith', result: 'Abnormal', confidence: '94.2%', status: 'orange' },
                  { date: '2024-12-12', type: 'CT Abdomen', patient: 'Mike Johnson', result: 'Normal', confidence: '96.8%', status: 'green' }
                ].map((report, index) => (
                  <tr key={index} className="border-b border-gray-200/30 dark:border-gray-700/30 hover:bg-white/5 transition-colors duration-300">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      {report.date}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      {report.type}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      {report.patient}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'green' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      }`}>
                        {report.result}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">
                      {report.confidence}
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-300">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;