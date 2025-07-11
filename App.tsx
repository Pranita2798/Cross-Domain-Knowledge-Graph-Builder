import React, { useState, useCallback, useMemo } from 'react';
import { Network, Database, Brain, RefreshCw } from 'lucide-react';
import { Entity, Relationship, TextSource, KnowledgeGraph } from './types';
import { TextProcessor } from './utils/textProcessor';
import GraphVisualization from './components/GraphVisualization';
import SourceInput from './components/SourceInput';
import GraphStats from './components/GraphStats';
import SourceList from './components/SourceList';

function App() {
  const [sources, setSources] = useState<TextSource[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const knowledgeGraph = useMemo(() => {
    const allEntities: Entity[] = [];
    const allRelationships: Relationship[] = [];

    sources.forEach(source => {
      const { entities, relationships } = TextProcessor.processTextSource(source);
      allEntities.push(...entities);
      allRelationships.push(...relationships);
    });

    // Remove duplicate entities
    const uniqueEntities = allEntities.filter((entity, index, self) => 
      index === self.findIndex(e => e.id === entity.id)
    );

    // Remove duplicate relationships
    const uniqueRelationships = allRelationships.filter((rel, index, self) => 
      index === self.findIndex(r => r.id === rel.id)
    );

    return {
      entities: uniqueEntities,
      relationships: uniqueRelationships,
      metadata: {
        sources: sources.map(s => s.title),
        createdAt: new Date(),
      }
    };
  }, [sources]);

  const handleAddSource = useCallback(async (source: TextSource) => {
    setIsProcessing(true);
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      setSources(prev => [...prev, source]);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleRemoveSource = useCallback((sourceId: string) => {
    setSources(prev => prev.filter(s => s.id !== sourceId));
  }, []);

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNode(nodeId);
    setSelectedEdge(null);
  }, []);

  const handleEdgeSelect = useCallback((edgeId: string) => {
    setSelectedEdge(edgeId);
    setSelectedNode(null);
  }, []);

  const handleRefresh = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const selectedEntity = selectedNode ? knowledgeGraph.entities.find(e => e.id === selectedNode) : null;
  const selectedRelationship = selectedEdge ? knowledgeGraph.relationships.find(r => r.id === selectedEdge) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Knowledge Graph Builder</h1>
                <p className="text-sm text-gray-600">Cross-domain knowledge extraction and visualization</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-md transition-colors"
                title="Refresh visualization"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Network className="w-4 h-4" />
                <span>{knowledgeGraph.entities.length} entities</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Database className="w-4 h-4" />
                <span>{knowledgeGraph.relationships.length} relationships</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-6">
            <SourceInput onSourceAdd={handleAddSource} isLoading={isProcessing} />
            <GraphStats entities={knowledgeGraph.entities} relationships={knowledgeGraph.relationships} />
          </div>

          {/* Center Panel - Graph Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Knowledge Graph Visualization</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Interactive graph showing entities and their relationships
                </p>
              </div>
              <div className="h-96 lg:h-[600px]">
                <GraphVisualization
                  entities={knowledgeGraph.entities}
                  relationships={knowledgeGraph.relationships}
                  onNodeSelect={handleNodeSelect}
                  onEdgeSelect={handleEdgeSelect}
                />
              </div>
            </div>

            {/* Selection Details */}
            {(selectedEntity || selectedRelationship) && (
              <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Selection Details</h3>
                {selectedEntity && (
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: '#4ECDC4' }} />
                      <span className="font-medium text-gray-800">{selectedEntity.label}</span>
                      <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {selectedEntity.type}
                      </span>
                    </div>
                    {selectedEntity.description && (
                      <p className="text-gray-600 mb-2">{selectedEntity.description}</p>
                    )}
                    <div className="text-sm text-gray-500">
                      Source: {selectedEntity.source}
                      {selectedEntity.confidence && (
                        <span className="ml-4">
                          Confidence: {(selectedEntity.confidence * 100).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {selectedRelationship && (
                  <div>
                    <div className="flex items-center mb-3">
                      <span className="font-medium text-gray-800">{selectedRelationship.label}</span>
                      <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {selectedRelationship.type}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Source: {selectedRelationship.source}
                      {selectedRelationship.confidence && (
                        <span className="ml-4">
                          Confidence: {(selectedRelationship.confidence * 100).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-1">
            <SourceList sources={sources} onRemoveSource={handleRemoveSource} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;