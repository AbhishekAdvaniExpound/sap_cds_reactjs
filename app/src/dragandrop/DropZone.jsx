import React from 'react';
import DraggableItem from './DraggableItem';

const DropZone = ({ items, setItems }) => {
  const moveItem = (from, to) => {
    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setItems(updated);
  };

  return (
    <div style={{ margin: 'auto', width: '60%', padding: 20, border: '2px dashed #aaa', borderRadius: 8 }}>
      {items.map((item, index) => (
        <DraggableItem
          key={item.ID || index}
          index={index}
          item={item}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};

export default DropZone;
