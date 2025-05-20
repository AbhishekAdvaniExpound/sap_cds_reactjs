import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'INVOICE_ITEM';

// Draggable invoice item component
const InvoiceItem = ({ item, index, moveItem }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem) {
      if (draggedItem.index === index) return;
      moveItem(draggedItem.index, index);
      draggedItem.index = index;
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
    <tr
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
      }}
    >
      <td>{item.productName}</td>
      <td>{item.productDescription}</td>
      <td style={{ textAlign: 'right' }}>{item.quantity}</td>
      <td style={{ textAlign: 'right' }}>₹{item.price.toFixed(2)}</td>
      <td style={{ textAlign: 'right' }}>₹{item.total.toFixed(2)}</td>
    </tr>
  );
};

// Main Invoice component
const InvoiceDragDrop = () => {
  const [invoice, setInvoice] = useState(null);
  const [items, setItems] = useState([]);

  // Fetch invoice JSON from your API
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const deliveryId = "7ec8f9g0-h1i2-4a34-d456-e789f0123456";
        const response = await axios.post('http://localhost:4004/odata/v4/invoice/generateInvoiceJSON', { deliveryId });
        setInvoice(response.data);
        setItems(response.data.items);
      } catch (error) {
        console.error('Failed to fetch invoice JSON', error);
      }
    };

    fetchInvoice();
  }, []);

  // Move item in array for drag-drop reorder
  const moveItem = useCallback((fromIndex, toIndex) => {
    setItems(oldItems => {
      const updated = [...oldItems];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);
      return updated;
    });
  }, []);

  if (!invoice) return <div>Loading invoice...</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ maxWidth: 800, margin: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
        <h1>Invoice #{invoice.invoiceNumber}</h1>
        <p><strong>Customer:</strong> {invoice.customer.name}</p>
        <p><strong>Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>

        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 8px rgba(0,0,0,0.1)', border: '1px solid #ccc' }}>
          <thead style={{ backgroundColor: '#e6f0ff', color: '#0a4d78' }}>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: 12, textAlign: 'left' }}>Product</th>
              <th style={{ border: '1px solid #ccc', padding: 12, textAlign: 'left' }}>Description</th>
              <th style={{ border: '1px solid #ccc', padding: 12, textAlign: 'right' }}>Qty</th>
              <th style={{ border: '1px solid #ccc', padding: 12, textAlign: 'right' }}>Price (₹)</th>
              <th style={{ border: '1px solid #ccc', padding: 12, textAlign: 'right' }}>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <InvoiceItem key={item.ID} item={item} index={idx} moveItem={moveItem} />
            ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};

export default InvoiceDragDrop;
