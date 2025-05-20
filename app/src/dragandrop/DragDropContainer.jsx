import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropZone from './DropZone';
import axios from 'axios';

const DragDropContainer = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // API call
    const fetchData = async () => {
      try {
        const deliveryId = "7ec8f9g0-h1i2-4a34-d456-e789f0123456";
        const res = await axios.post('http://localhost:4004/odata/v4/invoice/generateInvoiceJSON', { deliveryId });
        setItems(res.data.items); // Adjust this based on your API response
      } catch (err) {
        console.error('API Error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <h2 style={{ textAlign: 'center' }}>Customizable Drag and Drop</h2>
      <DropZone items={items} setItems={setItems} />
    </DndProvider>
  );
};

export default DragDropContainer;
