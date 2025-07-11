import React from 'react';
import { FileText, Globe, Book, Newspaper, Trash2, Calendar, User } from 'lucide-react';
import { TextSource } from '../types';

interface SourceListProps {
  sources: TextSource[];
  onRemoveSource: (sourceId: string) => void;
}

const SourceList: React.FC<SourceListProps> = ({ sources, onRemoveSource }) => {
  const getSourceIcon = (type: TextSource['type']) => {
    switch (type) {
      case 'wikipedia':
        return Globe;
      case 'academic':
        return Book;
      case 'news':
        return Newspaper;
      default:
        return FileText;
    }
  };

  const getSourceColor = (type: TextSource['type']) => {
    switch (type) {
      case 'wikipedia':
        return 'bg-green-100 text-green-800';
      case 'academic':
        return 'bg-purple-100 text-purple-800';
      case 'news':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (sources.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Sources</h3>
        <div className="text-center text-gray-500 py-8">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No data sources added yet.</p>
          <p className="text-sm">Add a source to start building your knowledge graph.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Data Sources ({sources.length})
      </h3>
      
      <div className="space-y-3">
        {sources.map((source) => {
          const Icon = getSourceIcon(source.type);
          return (
            <div key={source.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${getSourceColor(source.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 truncate">{source.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {source.content.substring(0, 100)}...
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span className="capitalize">{source.type}</span>
                      {source.author && (
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {source.author}
                        </span>
                      )}
                      {source.date && (
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {source.date.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveSource(source.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Remove source"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SourceList;