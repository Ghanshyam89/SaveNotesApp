export interface Note{
    id: number;
    title: string;
    content: string;
    timestamp: Date;
    userId: string;
    showFullContent: boolean;
}