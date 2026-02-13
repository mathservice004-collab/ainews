export type Category = 'Economy' | 'Edutech' | 'Science' | 'Society' | 'Bio';

export interface NewsItem {
    id: string;
    title: string;
    category: Category;
    summary: string[];
    impact: {
        short: string;
        long: string;
        risk: string;
    };
    actions: {
        investor: string[];
        educator: string[];
        founder: string[];
    };
    originalImageUrl?: string;
    aiImageUrl?: string;
    createdAt: string;
}
