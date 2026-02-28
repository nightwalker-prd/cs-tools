import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, ComplexityBadge } from '@cstools/ui';
import { algorithms } from '../data/complexities';

export function ReferenceTable() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#E6EDF3]">Algorithm Complexities</h3>
      <div className="rounded-md border border-[#30363D] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#30363D] bg-[#161B22]">
              <TableHead className="text-[#8B949E]">Algorithm</TableHead>
              <TableHead className="text-[#8B949E]">Best</TableHead>
              <TableHead className="text-[#8B949E]">Average</TableHead>
              <TableHead className="text-[#8B949E]">Worst</TableHead>
              <TableHead className="text-[#8B949E]">Space</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {algorithms.map(alg => (
              <TableRow key={alg.name} className="border-[#30363D] hover:bg-[#161B22]">
                <TableCell className="font-medium text-[#E6EDF3]">{alg.name}</TableCell>
                <TableCell><ComplexityBadge complexity={alg.time.best} /></TableCell>
                <TableCell><ComplexityBadge complexity={alg.time.average} /></TableCell>
                <TableCell><ComplexityBadge complexity={alg.time.worst} /></TableCell>
                <TableCell><ComplexityBadge complexity={alg.space} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
