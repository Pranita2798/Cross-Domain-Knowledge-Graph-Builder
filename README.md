# 🧠 Cross-Domain Knowledge Graph Builder

A powerful, interactive web application for automatically extracting and visualizing knowledge graphs from various text sources including academic papers, news articles, and Wikipedia content.

## 🎯 Purpose

This tool is designed for researchers, data scientists, and knowledge workers who need to:
- Extract structured knowledge from unstructured text
- Visualize complex relationships between entities
- Build recommendation systems based on entity connections
- Analyze cross-domain knowledge patterns
- Explore interconnected concepts across different domains

## ✨ Features

### 🔍 **Multi-Source Data Ingestion**
- **Custom Text**: Paste any text content for analysis
- **Wikipedia Integration**: Fetch articles directly from Wikipedia API
- **Sample Data**: Pre-loaded academic and news samples for testing
- **Extensible Architecture**: Easy to add new data sources

### 🎨 **Interactive Visualization**
- **Force-Directed Graph Layout**: Intuitive node positioning using physics simulation
- **Color-Coded Entities**: Visual distinction between different entity types
- **Relationship Mapping**: Clear arrows showing directional relationships
- **Interactive Selection**: Click nodes and edges for detailed information
- **Responsive Design**: Works seamlessly on desktop and mobile

### 🧮 **Entity & Relationship Extraction**
- **Named Entity Recognition**: Identifies people, organizations, locations, concepts, and events
- **Relationship Detection**: Extracts semantic relationships like "works-at", "located-in", "collaborated-with"
- **Confidence Scoring**: AI-powered confidence ratings for extracted information
- **Duplicate Handling**: Intelligent merging of duplicate entities across sources

### 📊 **Real-Time Analytics**
- **Graph Statistics**: Live metrics on entity and relationship counts
- **Entity Type Distribution**: Breakdown of different entity categories
- **Relationship Analysis**: Insights into connection patterns
- **Connectivity Metrics**: Average connectivity and graph density

## 🛠️ Technical Architecture

### **Frontend Stack**
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** for responsive, modern styling
- **Vis.js Network** for advanced graph visualization
- **Lucide React** for consistent iconography

### **Core Technologies**
- **Natural Language Processing**: Custom regex-based entity extraction
- **Graph Algorithms**: Force-directed layout with physics simulation
- **Data Processing**: Real-time text analysis and knowledge extraction
- **State Management**: React hooks for optimal performance

### **Data Sources**
- **Wikipedia REST API**: Direct integration for encyclopedia content
- **Custom Text Processing**: Support for any text format
- **Sample Data**: Curated examples for immediate testing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/knowledge-graph-builder.git
cd knowledge-graph-builder
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` to start using the application.

## 📖 Usage Guide

### 1. **Adding Data Sources**

**Custom Text**
- Select the "Custom Text" tab
- Enter a descriptive title
- Paste your text content
- Click "Add Text Source"

**Wikipedia Articles**
- Select the "Wikipedia" tab
- Enter the article title (e.g., "Machine Learning")
- Click "Fetch Wikipedia Article"

**Sample Data**
- Select the "Sample Data" tab
- Choose between academic paper or news article samples
- Click to load pre-configured examples

### 2. **Exploring the Graph**

**Navigation**
- **Zoom**: Mouse wheel or pinch gestures
- **Pan**: Click and drag empty space
- **Select**: Click on nodes (entities) or edges (relationships)
- **Physics**: Graph automatically organizes using force simulation

**Entity Types**
- 🔴 **Person**: Individuals and named people
- 🟢 **Organization**: Companies, institutions, groups
- 🔵 **Location**: Places, cities, countries
- 🟡 **Concept**: Ideas, theories, abstract concepts
- 🟠 **Event**: Conferences, meetings, occurrences
- 🟣 **Other**: Miscellaneous entities

### 3. **Analyzing Results**

**Graph Statistics Panel**
- View entity and relationship counts
- See distribution of different entity types
- Monitor average connectivity metrics

**Selection Details**
- Click any node or edge to see detailed information
- View confidence scores and source attribution
- Explore entity descriptions and relationship types

## 🔧 Advanced Configuration

### **Customizing Entity Extraction**

The system uses pattern-based extraction that can be customized in `src/utils/textProcessor.ts`:

```typescript
// Add new entity patterns
private static entityPatterns = {
  person: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
  organization: /\bUniversity|Corp|Inc|Ltd\b/gi,
  // Add your custom patterns here
};
```

### **Adding New Relationship Types**

Extend relationship detection by modifying the patterns:

```typescript
private static relationshipPatterns = [
  { pattern: /(\w+)\s+founded\s+(\w+)/g, type: 'founded' },
  // Add new relationship patterns
];
```

### **Customizing Visualization**

Modify graph appearance in `src/components/GraphVisualization.tsx`:

```typescript
// Customize node colors
const getNodeColor = (type: Entity['type']): string => {
  const colors = {
    person: '#FF6B6B',
    organization: '#4ECDC4',
    // Add custom colors
  };
  return colors[type] || '#DDA0DD';
};
```

## 🎯 Use Cases

### **Academic Research**
- Analyze literature reviews and research papers
- Identify key researchers and their collaborations
- Map research domains and interdisciplinary connections
- Track concept evolution across publications

### **Business Intelligence**
- Extract insights from market research reports
- Analyze competitor relationships and partnerships
- Map industry ecosystems and stakeholder networks
- Identify emerging trends and opportunities

### **Content Analysis**
- Process news articles for entity relationships
- Analyze social media content for trend identification
- Extract insights from customer feedback and reviews
- Map content themes and topic relationships

### **Knowledge Management**
- Organize institutional knowledge bases
- Create searchable relationship maps
- Identify knowledge gaps and redundancies
- Support decision-making with structured insights

## 🚀 Deployment Options

### **Static Hosting**
```bash
npm run build
# Deploy the 'dist' folder to any static hosting service
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### **Cloud Platforms**
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the build folder for instant hosting
- **AWS S3**: Host as a static website with CloudFront distribution

## 🛣️ Roadmap

### **Planned Features**
- [ ] **Advanced NLP Integration**: Support for transformer-based models
- [ ] **Graph Database Integration**: Neo4j and ArangoDB support
- [ ] **Export Capabilities**: JSON, CSV, and GraphML export options
- [ ] **Collaborative Features**: Multi-user graph editing and sharing
- [ ] **API Integration**: REST API for programmatic access
- [ ] **Advanced Analytics**: Centrality measures and community detection
- [ ] **Real-time Updates**: WebSocket support for live collaboration
- [ ] **Mobile App**: React Native version for mobile devices

### **Integration Opportunities**
- **Semantic Scholar API**: Academic paper integration
- **News APIs**: Real-time news content processing
- **Social Media APIs**: Twitter, LinkedIn content analysis
- **Enterprise Systems**: CRM, ERP data integration

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### **Development Setup**
```bash
# Fork the repository
git clone https://github.com/yourusername/knowledge-graph-builder.git
cd knowledge-graph-builder

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git commit -m "Add your feature description"

# Push to your fork and create a pull request
git push origin feature/your-feature-name
```

### **Contribution Guidelines**
- Follow the existing code style and patterns
- Add tests for new features
- Update documentation for any API changes
- Ensure responsive design for UI changes
- Test across different browsers and devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
