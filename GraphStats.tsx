import React from 'react';
import { Users, Building, MapPin, Lightbulb, Calendar, Hash } from 'lucide-react';
import { Entity, Relationship } from '../types';

interface GraphStatsProps {
  entities: Entity[];
  relationships: Relationship[];
}

const GraphStats: React.FC<GraphStatsProps> = ({ entities, relationships }) => {
  const entityTypeIcons = {
    person: Users,
    organization: Building,
    location: MapPin,
    concept: Lightbulb,
    event: Calendar,
    other: Hash,
  };

  const entityTypes = entities.reduce((acc, entity) => {
    acc[entity.type] = (acc[entity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const relationshipTypes = relationships.reduce((acc, rel) => {
    acc[rel.type] = (acc[rel.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const connectivity = entities.length > 0 ? (relationships.length / entities.length).toFixed(2) : '0';

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Graph Statistics</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{entities.length}</div>
          <div className="text-sm text-gray-600">Entities</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{relationships.length}</div>
          <div className="text-sm text-gray-600">Relationships</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Entity Types</h4>
        <div className="space-y-2">
          {Object.entries(entityTypes).map(([type, count]) => {
            const Icon = entityTypeIcons[type as keyof typeof entityTypeIcons];
            return (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600 capitalize">{type}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Relationship Types</h4>
        <div className="space-y-2">
          {Object.entries(relationshipTypes).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">{type.replace('-', ' ')}</span>
              <span className="text-sm font-medium text-gray-800">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <div className="text-lg font-semibold text-gray-800">{connectivity}</div>
        <div className="text-sm text-gray-600">Avg. Connectivity</div>
      </div>
    </div>
  );
};

export default GraphStats;