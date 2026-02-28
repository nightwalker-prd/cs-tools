export interface ToolScore {
  toolId: string;
  name: string;
  score: number; // 0-100
  hasData: boolean;
}

export interface PillarScore {
  pillarId: string;
  nameEn: string;
  nameAr: string;
  score: number; // 0-100
  tools: ToolScore[];
}

export interface Milestone {
  id: string;
  label: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface DashboardData {
  overall: number; // 0-100
  pillars: PillarScore[];
  streak: number;
  lastActive: number | null; // timestamp
  milestones: Milestone[];
}
