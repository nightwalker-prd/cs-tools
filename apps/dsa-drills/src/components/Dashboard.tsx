import { Card, CardContent, CardHeader, CardTitle } from '@cstools/ui';
import { Trophy, Flame, Target, Brain } from 'lucide-react';

interface DashboardProps {
  stats: {
    totalSolved: number;
    accuracy: number;
    streak: number;
    xp: number;
    weakAreas: string[];
    strongAreas: string[];
  };
}

export function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#E6EDF3]">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4 flex items-center gap-3">
            <Target className="w-8 h-8 text-[#58A6FF]" />
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{stats.totalSolved}</p>
              <p className="text-xs text-[#8B949E]">Problems Solved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4 flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#D2A8FF]" />
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{stats.accuracy}%</p>
              <p className="text-xs text-[#8B949E]">Accuracy</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4 flex items-center gap-3">
            <Flame className="w-8 h-8 text-[#FFA657]" />
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{stats.streak}</p>
              <p className="text-xs text-[#8B949E]">Day Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-[#D29922]" />
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{stats.xp}</p>
              <p className="text-xs text-[#8B949E]">Total XP</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weak/Strong Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardHeader>
            <CardTitle className="text-sm text-[#F85149]">Needs Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.weakAreas.map(area => (
                <div key={area} className="text-sm text-[#8B949E] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F85149]" />
                  {area}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardHeader>
            <CardTitle className="text-sm text-[#3FB950]">Strong Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.strongAreas.map(area => (
                <div key={area} className="text-sm text-[#8B949E] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3FB950]" />
                  {area}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
