import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'ITEM';

const DraggableItem = ({ item, index, moveItem }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(dragged) {
      if (dragged.index !== index) {
        moveItem(dragged.index, index);
        dragged.index = index;
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#f0f8ff',
        border: '1px solid #ccc',
        borderRadius: 4,
        cursor: 'grab',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <strong>{item.productName || 'Unnamed Item'}</strong>
      <div>{item.productDescription}</div>
      <div>Qty: {item.quantity}, Price: ₹{item.price}</div>
    </div>
  );
};

export default DraggableItem;
