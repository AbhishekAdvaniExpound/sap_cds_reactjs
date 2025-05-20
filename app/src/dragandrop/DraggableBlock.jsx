// DraggableBlock.tsx
import { useDrag, useDrop } from 'react-dnd';

export const DraggableBlock = ({ id, index, moveBlock, children }) => {
  const [, ref] = useDrag({
    type: 'BLOCK',
    item: { id, index }
  });

  const [, drop] = useDrop({
    accept: 'BLOCK',
    hover: (item) => {
      if (item.index !== index) {
        moveBlock(item.index, index);
        item.index = index;
      }
    }
  });

  return <div ref={(node) => ref(drop(node))}>{children}</div>;
};
