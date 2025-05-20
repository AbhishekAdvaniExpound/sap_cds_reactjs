// InvoiceBuilder.tsx
import { useState } from 'react';
import { DraggableBlock } from './DraggableBlock';
import CompanyDetails from './CompanyDetails';
import CustomerDetails from './CustomerDetails';
import InvoiceTable from './InvoiceTable';
import Totals from './Totals';

const componentMap = {
  company: <CompanyDetails />,
  customer: <CustomerDetails />,
  table: <InvoiceTable />,
  total: <Totals />,
};

export default function InvoiceBuilder() {
  const [blocks, setBlocks] = useState(['company', 'customer', 'table', 'total']);

  const moveBlock = (fromIndex, toIndex) => {
    const updated = [...blocks];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setBlocks(updated);
  };

  return (
    <div className="p-4 space-y-4">
      {blocks.map((blockKey, i) => (
        <DraggableBlock key={blockKey} id={blockKey} index={i} moveBlock={moveBlock}>
          {componentMap[blockKey]}
        </DraggableBlock>
      ))}
    </div>
  );
}
