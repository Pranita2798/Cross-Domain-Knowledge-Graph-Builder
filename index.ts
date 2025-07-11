export interface Entity {
  id: string;
  label: string;
  type: 'person' | 'organization' | 'location' | 'concept' | 'event' | 'other';
  description?: string;
  source?: string;
  confidence?: number;
}

export interface Relationship {
  id: string;
  from: string;
  to: string;
  type: string;
  label: string;
  confidence?: number;
  source?: string;
}

export interface KnowledgeGraph {
  entities: Entity[];
  relationships: Relationship[];
  metadata: {
    sources: string[];
    createdAt: Date;
    domain?: string;
  };
}

export interface TextSource {
  id: string;
  title: string;
  content: string;
  type: 'academic' | 'news' | 'wikipedia' | 'text';
  url?: string;
  author?: string;
  date?: Date;
}

export interface GraphStats {
  entityCount: number;
  relationshipCount: number;
  domains: string[];
  averageConnectivity: number;
}