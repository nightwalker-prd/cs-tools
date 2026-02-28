export type TopicStatus = 'not-started' | 'in-progress' | 'mastered';

export interface TopicMastery {
  topicId: string;
  status: TopicStatus;
  percentage: number;
}

export interface UnitProgress {
  unitNumber: number;
  titleEn: string;
  titleAr: string;
  topics: TopicMastery[];
  masteredCount: number;
  totalCount: number;
}

export interface TopicDefinition {
  id: string;
  label: string;
  labelAr: string;
  unit: number;
}
