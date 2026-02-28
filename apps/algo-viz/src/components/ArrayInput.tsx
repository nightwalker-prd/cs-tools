import { useState } from 'react';
import { Button, Input } from '@cstools/ui';
import { Shuffle, Play } from 'lucide-react';

interface ArrayInputProps {
  onSubmit: (arr: number[]) => void;
  onRandom: () => void;
}

export function ArrayInput({ onSubmit, onRandom }: ArrayInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const arr = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (arr.length > 0) onSubmit(arr);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers: 5, 3, 8, 1, 9"
        className="bg-[#0D1117] border-[#30363D] text-[#E6EDF3] font-mono text-sm"
      />
      <Button variant="outline" size="sm" onClick={handleSubmit} className="border-[#30363D] text-[#E6EDF3]">
        <Play className="w-3.5 h-3.5 mr-1" /> Run
      </Button>
      <Button variant="outline" size="sm" onClick={onRandom} className="border-[#30363D] text-[#8B949E]">
        <Shuffle className="w-3.5 h-3.5 mr-1" /> Random
      </Button>
    </div>
  );
}
