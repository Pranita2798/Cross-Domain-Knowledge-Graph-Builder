import { Entity, Relationship, TextSource } from '../types';

export class TextProcessor {
  private static entityPatterns = {
    person: /\b[A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g,
    organization: /\b(?:University|Corp|Inc|Ltd|Company|Organization|Institute|Association|Foundation)\b[^.]*?(?=\.|,|\n|$)/gi,
    location: /\b(?:in|at|from|to)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g,
    concept: /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?=\s+is\s+|\s+are\s+|\s+means\s+|\s+refers\s+to)/g,
    event: /\b(?:Conference|Summit|Meeting|Workshop|Symposium|Congress)\b[^.]*?(?=\.|,|\n|$)/gi,
  };

  private static relationshipPatterns = [
    { pattern: /(\w+(?:\s+\w+)*)\s+(?:is|are)\s+(?:a|an|the)?\s*(\w+(?:\s+\w+)*)/g, type: 'is-a' },
    { pattern: /(\w+(?:\s+\w+)*)\s+(?:works|worked)\s+(?:at|for|with)\s+(\w+(?:\s+\w+)*)/g, type: 'works-at' },
    { pattern: /(\w+(?:\s+\w+)*)\s+(?:founded|established|created)\s+(\w+(?:\s+\w+)*)/g, type: 'founded' },
    { pattern: /(\w+(?:\s+\w+)*)\s+(?:located|situated)\s+in\s+(\w+(?:\s+\w+)*)/g, type: 'located-in' },
    { pattern: /(\w+(?:\s+\w+)*)\s+(?:collaborates|collaborated)\s+with\s+(\w+(?:\s+\w+)*)/g, type: 'collaborates-with' },
    { pattern: /(\w+(?:\s+\w+)*)\s+(?:published|wrote|authored)\s+(\w+(?:\s+\w+)*)/g, type: 'authored' },
  ];

  static extractEntities(text: string, source: string): Entity[] {
    const entities: Entity[] = [];
    const seen = new Set<string>();

    Object.entries(this.entityPatterns).forEach(([type, pattern]) => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const cleanMatch = match.trim();
          if (cleanMatch.length > 2 && !seen.has(cleanMatch.toLowerCase())) {
            seen.add(cleanMatch.toLowerCase());
            entities.push({
              id: this.generateId(cleanMatch),
              label: cleanMatch,
              type: type as Entity['type'],
              source,
              confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7-1.0
            });
          }
        });
      }
    });

    return entities;
  }

  static extractRelationships(text: string, entities: Entity[], source: string): Relationship[] {
    const relationships: Relationship[] = [];
    const entityMap = new Map(entities.map(e => [e.label.toLowerCase(), e]));

    this.relationshipPatterns.forEach(({ pattern, type }) => {
      const matches = [...text.matchAll(pattern)];
      matches.forEach(match => {
        const fromEntity = entityMap.get(match[1]?.toLowerCase());
        const toEntity = entityMap.get(match[2]?.toLowerCase());

        if (fromEntity && toEntity && fromEntity.id !== toEntity.id) {
          relationships.push({
            id: this.generateId(`${fromEntity.id}-${toEntity.id}-${type}`),
            from: fromEntity.id,
            to: toEntity.id,
            type,
            label: type.replace('-', ' '),
            source,
            confidence: Math.random() * 0.3 + 0.7,
          });
        }
      });
    });

    return relationships;
  }

  static processTextSource(textSource: TextSource): { entities: Entity[]; relationships: Relationship[] } {
    const entities = this.extractEntities(textSource.content, textSource.title);
    const relationships = this.extractRelationships(textSource.content, entities, textSource.title);

    return { entities, relationships };
  }

  private static generateId(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  static calculateGraphStats(entities: Entity[], relationships: Relationship[]): any {
    const entityTypes = entities.reduce((acc, entity) => {
      acc[entity.type] = (acc[entity.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const relationshipTypes = relationships.reduce((acc, rel) => {
      acc[rel.type] = (acc[rel.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const connectivity = entities.length > 0 ? relationships.length / entities.length : 0;

    return {
      entityCount: entities.length,
      relationshipCount: relationships.length,
      entityTypes,
      relationshipTypes,
      averageConnectivity: connectivity,
    };
  }
}