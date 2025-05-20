import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

const HtmlToPdfDownloader = ({ htmlString, filename = 'document.pdf', buttonLabel = 'Download PDF' }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!htmlString) {
      alert('No HTML content provided.');
      return;
    }

    try {
      setLoading(true);

      // Parse HTML string into DOM
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');

      // Extract styles and body content
      const styles = doc.head.querySelectorAll('style');
      const styleHTML = Array.from(styles).map(s => s.outerHTML).join('\n');
      const bodyHTML = doc.body.innerHTML;

      // Create offscreen container for rendering
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = `${styleHTML}<div id="pdf-content">${bodyHTML}</div>`;
      tempContainer.style.position = 'fixed';
      tempContainer.style.top = '-10000px';
      document.body.appendChild(tempContainer);

      const targetElement = tempContainer.querySelector('#pdf-content');

      // Wait a bit for styles/images to render properly
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate PDF from target element
      await html2pdf()
        .set({
          margin: 0.5,
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        })
        .from(targetElement)
        .save();

      document.body.removeChild(tempContainer);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDownload} disabled={loading || !htmlString}>
      {loading ? 'Generating PDF...' : buttonLabel}
    </button>
  );
};

export default HtmlToPdfDownloader;
