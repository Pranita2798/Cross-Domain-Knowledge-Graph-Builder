import { TextSource } from '../types';

export class DataProvider {
  static async fetchWikipediaArticle(title: string): Promise<TextSource> {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
      );
      const data = await response.json();
      
      return {
        id: `wikipedia-${title}`,
        title: data.title,
        content: data.extract || 'No content available',
        type: 'wikipedia',
        url: data.content_urls?.desktop?.page,
      };
    } catch (error) {
      throw new Error(`Failed to fetch Wikipedia article: ${error}`);
    }
  }

  static async fetchSampleAcademicPaper(): Promise<TextSource> {
    // Simulated academic paper content
    const sampleContent = `
      Recent advances in machine learning have revolutionized natural language processing. 
      Dr. Sarah Johnson from Stanford University published groundbreaking research on transformer architectures.
      The study, conducted in collaboration with Google Research, demonstrates significant improvements in language understanding.
      The paper, titled "Attention Mechanisms in Deep Learning", was presented at the International Conference on Machine Learning.
      Meta AI and OpenAI have also contributed to this field with their respective foundation models.
      These models are trained on massive datasets and located in data centers across California and Washington.
      The research team collaborated with researchers from MIT and Carnegie Mellon University.
    `;

    return {
      id: 'academic-sample',
      title: 'Attention Mechanisms in Deep Learning',
      content: sampleContent,
      type: 'academic',
      author: 'Dr. Sarah Johnson',
      date: new Date('2024-01-15'),
    };
  }

  static async fetchSampleNews(): Promise<TextSource> {
    // Simulated news content
    const sampleContent = `
      Tech Giant Corp announced a major partnership with Innovation Labs to develop next-generation AI systems.
      The collaboration, led by CEO Mike Chen, will focus on sustainable technology solutions.
      The partnership was established during the Global Tech Summit in San Francisco.
      Amazon Web Services and Microsoft Azure are providing cloud infrastructure support.
      The initiative is located in Silicon Valley and aims to revolutionize the technology industry.
      Several universities including UC Berkeley and Stanford University are participating as research partners.
    `;

    return {
      id: 'news-sample',
      title: 'Major Tech Partnership Announced',
      content: sampleContent,
      type: 'news',
      date: new Date('2024-12-15'),
    };
  }

  static createCustomTextSource(title: string, content: string): TextSource {
    return {
      id: `custom-${Date.now()}`,
      title,
      content,
      type: 'text',
      date: new Date(),
    };
  }
}