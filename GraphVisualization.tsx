import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { Entity, Relationship } from '../types';

interface GraphVisualizationProps {
  entities: Entity[];
  relationships: Relationship[];
  onNodeSelect?: (nodeId: string) => void;
  onEdgeSelect?: (edgeId: string) => void;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  entities,
  relationships,
  onNodeSelect,
  onEdgeSelect,
}) => {
  const networkRef = useRef<HTMLDivElement>(null);
  const networkInstance = useRef<Network | null>(null);

  const getNodeColor = (type: Entity['type']): string => {
    const colors = {
      person: '#FF6B6B',
      organization: '#4ECDC4',
      location: '#45B7D1',
      concept: '#96CEB4',
      event: '#FFEAA7',
      other: '#DDA0DD',
    };
    return colors[type] || colors.other;
  };

  const getEdgeColor = (type: string): string => {
    const colors = {
      'is-a': '#FF6B6B',
      'works-at': '#4ECDC4',
      'founded': '#45B7D1',
      'located-in': '#96CEB4',
      'collaborates-with': '#FFEAA7',
      'authored': '#DDA0DD',
    };
    return colors[type as keyof typeof colors] || '#999999';
  };

  useEffect(() => {
    if (!networkRef.current) return;

    const nodes = new DataSet(
      entities.map(entity => ({
        id: entity.id,
        label: entity.label,
        title: `${entity.type}: ${entity.label}${entity.description ? `\n${entity.description}` : ''}`,
        color: {
          background: getNodeColor(entity.type),
          border: '#2B2B2B',
          highlight: {
            background: getNodeColor(entity.type),
            border: '#000000',
          },
        },
        font: {
          color: '#2B2B2B',
          size: 12,
          face: 'Inter, sans-serif',
        },
        shape: 'dot',
        size: 15 + (entity.confidence || 0.5) * 10,
      }))
    );

    const edges = new DataSet(
      relationships.map(rel => ({
        id: rel.id,
        from: rel.from,
        to: rel.to,
        label: rel.label,
        title: `${rel.type}: ${rel.label}`,
        color: {
          color: getEdgeColor(rel.type),
          highlight: '#000000',
        },
        font: {
          color: '#2B2B2B',
          size: 10,
          face: 'Inter, sans-serif',
        },
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5,
          },
        },
        width: 1 + (rel.confidence || 0.5) * 2,
      }))
    );

    const data = { nodes, edges };

    const options = {
      nodes: {
        borderWidth: 2,
        shadow: true,
      },
      edges: {
        shadow: true,
        smooth: {
          enabled: true,
          type: 'continuous',
          roundness: 0.5,
        },
      },
      physics: {
        enabled: true,
        stabilization: { iterations: 100 },
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
        },
      },
      interaction: {
        hover: true,
        selectConnectedEdges: true,
        tooltipDelay: 200,
      },
      layout: {
        improvedLayout: true,
      },
    };

    networkInstance.current = new Network(networkRef.current, data, options);

    // Event listeners
    networkInstance.current.on('selectNode', (params) => {
      if (params.nodes.length > 0 && onNodeSelect) {
        onNodeSelect(params.nodes[0]);
      }
    });

    networkInstance.current.on('selectEdge', (params) => {
      if (params.edges.length > 0 && onEdgeSelect) {
        onEdgeSelect(params.edges[0]);
      }
    });

    return () => {
      if (networkInstance.current) {
        networkInstance.current.destroy();
        networkInstance.current = null;
      }
    };
  }, [entities, relationships, onNodeSelect, onEdgeSelect]);

  return (
    <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm">
      <div
        ref={networkRef}
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default GraphVisualization;