import raw from '@/data/learning-content.json';

export type Book = { title: string; author: string; link: string };
export type Paper = { title: string; authors: string; link: string };
export type ResourceKind = 'udemy' | 'youtube' | 'playlist';
export type Resource = { kind: ResourceKind; title: string; creator: string; link: string | null };
export type ThisWeek = {
  focus: string;
  book: { title: string; author: string; link: string } | null;
  paper: { title: string; link: string } | null;
};

export type LearningContent = {
  thisWeek: ThisWeek;
  bookshelf: Book[];
  papershelf: Paper[];
  resources: Resource[];
};

export const learningContent = raw as LearningContent;
