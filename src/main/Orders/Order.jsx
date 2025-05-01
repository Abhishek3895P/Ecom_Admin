import React, { useState } from 'react';
import axios from 'axios';

const AmazonScraper = () => {
  const [url, setUrl] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!url.includes('amazon.')) {
        throw new Error('Please enter a valid Amazon URL');
      }

      const response = await axios.post('http://localhost:5000/getjsonfromlink', {
        url: url
      });

      if (response.data.status === 'success') {
        setProductData(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch product data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadJson = () => {
    if (!productData) return;
    
    const dataStr = JSON.stringify(productData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `amazon_product_${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Amazon Product Scraper</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Amazon product URL"
            className="flex-1 px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Fetching...' : 'Get Data'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      {productData && (
        <div className="border rounded p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Product Data</h2>
            <button
              onClick={downloadJson}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download JSON
            </button>
          </div>
          
          <div className="overflow-auto max-h-96">
            <pre className="text-sm bg-white p-3 rounded border">
              {JSON.stringify(productData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmazonScraper;