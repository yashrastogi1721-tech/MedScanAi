import React, { useState } from 'react';
import { Camera, Upload, FileImage, Zap, CheckCircle, AlertCircle } from 'lucide-react';

const Scanner: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const startScan = () => {
    if (uploadedFile) {
      setIsScanning(true);
      // Simulate scanning process
      setTimeout(() => {
        setIsScanning(false);
        setScanComplete(true);
      }, 3000);
    }
  };

  const resetScanner = () => {
    setUploadedFile(null);
    setIsScanning(false);
    setScanComplete(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-up">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center animate-float shadow-xl">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Medical Image Scanner
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your medical images for instant AI-powered analysis and diagnosis
          </p>
        </div>

        {/* Upload Area */}
        {!uploadedFile && !scanComplete && (
          <div className="mb-8 animate-fade-up delay-200">
            <div
              className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 animated-bg ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white/10 backdrop-blur-sm hover:border-blue-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-6">
                <div className="flex justify-center">
                  <Upload className={`h-16 w-16 transition-colors duration-300 ${
                    isDragOver ? 'text-blue-500 animate-bounce' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Drop your medical image here
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Or click to select from your device
                  </p>
                </div>
                <div className="flex justify-center">
                  <label className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl animated-bg overflow-hidden">
                    <span className="relative z-10 flex items-center space-x-2">
                      <FileImage className="h-5 w-5" />
                      <span>Select Image</span>
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supports: JPEG, PNG, DICOM • Max size: 10MB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Uploaded File Preview */}
        {uploadedFile && !scanComplete && (
          <div className="mb-8 animate-fade-up delay-300">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 animated-bg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {uploadedFile.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetScanner}
                  className="text-gray-500 hover:text-red-500 transition-colors duration-300"
                >
                  Remove
                </button>
              </div>

              {/* Image Preview */}
              <div className="mb-6 flex justify-center">
                <div className="relative group">
                  <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt="Uploaded medical image"
                    className="max-h-64 rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Scan Button */}
              <div className="text-center">
                <button
                  onClick={startScan}
                  disabled={isScanning}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animated-bg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Zap className={`h-5 w-5 ${isScanning ? 'animate-spin' : 'group-hover:animate-bounce'}`} />
                    <span>{isScanning ? 'Analyzing...' : 'Start AI Analysis'}</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scanning Progress */}
        {isScanning && (
          <div className="mb-8 animate-fade-up">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 animated-bg">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  AI Analysis in Progress
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our advanced algorithms are analyzing your medical image...
                </p>
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-progress"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scan Results */}
        {scanComplete && (
          <div className="animate-fade-up delay-500">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 animated-bg">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center animate-bounce-subtle shadow-xl">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Analysis Complete!
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Your medical image has been successfully analyzed
                </p>
              </div>

              {/* Results Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h4 className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Normal Findings
                    </h4>
                  </div>
                  <p className="text-green-700 dark:text-green-300">
                    No significant abnormalities detected
                  </p>
                </div>
                
                <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertCircle className="h-6 w-6 text-blue-600" />
                    <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                      Confidence Score
                    </h4>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300">
                    98.5% accuracy
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl animated-bg overflow-hidden">
                  <span className="relative z-10">View Detailed Report</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button
                  onClick={resetScanner}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 animated-bg"
                >
                  Scan Another Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;