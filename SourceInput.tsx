import React, { useState } from 'react';
import { Plus, FileText, Globe, Book, Newspaper, Loader2 } from 'lucide-react';
import { TextSource } from '../types';
import { DataProvider } from '../utils/dataProviders';

interface SourceInputProps {
  onSourceAdd: (source: TextSource) => void;
  isLoading?: boolean;
}

const SourceInput: React.FC<SourceInputProps> = ({ onSourceAdd, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [wikipediaTitle, setWikipediaTitle] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'wikipedia' | 'sample'>('text');

  const handleAddCustomText = () => {
    if (inputText.trim() && inputTitle.trim()) {
      const source = DataProvider.createCustomTextSource(inputTitle, inputText);
      onSourceAdd(source);
      setInputText('');
      setInputTitle('');
    }
  };

  const handleFetchWikipedia = async () => {
    if (wikipediaTitle.trim()) {
      try {
        const source = await DataProvider.fetchWikipediaArticle(wikipediaTitle);
        onSourceAdd(source);
        setWikipediaTitle('');
      } catch (error) {
        console.error('Failed to fetch Wikipedia article:', error);
      }
    }
  };

  const handleAddSampleData = async (type: 'academic' | 'news') => {
    try {
      const source = type === 'academic' 
        ? await DataProvider.fetchSampleAcademicPaper()
        : await DataProvider.fetchSampleNews();
      onSourceAdd(source);
    } catch (error) {
      console.error('Failed to fetch sample data:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Data Source</h3>
      
      <div className="flex space-x-1 mb-4">
        <button
          onClick={() => setActiveTab('text')}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'text'
              ? 'bg-blue-100 text-blue-800'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Custom Text
        </button>
        <button
          onClick={() => setActiveTab('wikipedia')}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'wikipedia'
              ? 'bg-blue-100 text-blue-800'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Globe className="w-4 h-4 inline mr-2" />
          Wikipedia
        </button>
        <button
          onClick={() => setActiveTab('sample')}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'sample'
              ? 'bg-blue-100 text-blue-800'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Book className="w-4 h-4 inline mr-2" />
          Sample Data
        </button>
      </div>

      {activeTab === 'text' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a title for your text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Content
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste your text here..."
            />
          </div>
          <button
            onClick={handleAddCustomText}
            disabled={!inputText.trim() || !inputTitle.trim() || isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Add Text Source
          </button>
        </div>
      )}

      {activeTab === 'wikipedia' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wikipedia Article Title
            </label>
            <input
              type="text"
              value={wikipediaTitle}
              onChange={(e) => setWikipediaTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Machine Learning, Albert Einstein..."
            />
          </div>
          <button
            onClick={handleFetchWikipedia}
            disabled={!wikipediaTitle.trim() || isLoading}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Globe className="w-4 h-4 mr-2" />
            )}
            Fetch Wikipedia Article
          </button>
        </div>
      )}

      {activeTab === 'sample' && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Load sample data to explore the knowledge graph builder:
          </p>
          <button
            onClick={() => handleAddSampleData('academic')}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Book className="w-4 h-4 mr-2" />
            )}
            Load Academic Paper Sample
          </button>
          <button
            onClick={() => handleAddSampleData('news')}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Newspaper className="w-4 h-4 mr-2" />
            )}
            Load News Article Sample
          </button>
        </div>
      )}
    </div>
  );
};

export default SourceInput;