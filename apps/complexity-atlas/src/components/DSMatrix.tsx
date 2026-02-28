import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, ComplexityBadge } from '@cstools/ui';
import { dataStructures } from '../data/complexities';

export function DSMatrix() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#E6EDF3]">Data Structure Operations</h3>
      <div className="rounded-md border border-[#30363D] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#30363D] bg-[#161B22]">
              <TableHead className="text-[#8B949E]">Data Structure</TableHead>
              <TableHead className="text-[#8B949E]">Access</TableHead>
              <TableHead className="text-[#8B949E]">Search</TableHead>
              <TableHead className="text-[#8B949E]">Insert</TableHead>
              <TableHead className="text-[#8B949E]">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataStructures.map(ds => (
              <TableRow key={ds.name} className="border-[#30363D] hover:bg-[#161B22]">
                <TableCell>
                  <div className="font-medium text-[#E6EDF3]">{ds.name}</div>
                  {ds.spaceNote && <div className="text-xs text-[#8B949E]">{ds.spaceNote}</div>}
                </TableCell>
                <TableCell><ComplexityBadge complexity={ds.access} /></TableCell>
                <TableCell><ComplexityBadge complexity={ds.search} /></TableCell>
                <TableCell><ComplexityBadge complexity={ds.insert} /></TableCell>
                <TableCell><ComplexityBadge complexity={ds.delete} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
