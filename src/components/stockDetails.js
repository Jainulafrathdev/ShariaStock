import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useParams, useLocation } from 'react-router-dom';
import './stockdetails.css';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockDetail=() => {
  const { symbol } = useParams();
  const location = useLocation();
  const { name } = location.state || {};
  const [stockData, setStockData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [niftyData, setNiftyData] = useState(null);
  const [selectedRange, setSelectedRange] = useState('1w');
  const [newsArticles, setNewsArticles] = useState([]);

  const fetchStockData = async () => {
    
    try {
      const response = await axios.get(`https://eodhistoricaldata.com/api/real-time/${symbol}?api_token=670cbdcb5d6a98.28595369&fmt=json`);
      const stockInfoData = response.data;

      setStockData({
        symbol,
        open: stockInfoData.open,
        high: stockInfoData.high,
        low: stockInfoData.low,
        close: stockInfoData.close,
        volume: stockInfoData.volume,
        change: (stockInfoData.close - stockInfoData.previousClose).toFixed(2),
        changePercent: (((stockInfoData.close - stockInfoData.previousClose) / stockInfoData.previousClose) * 100).toFixed(2) + '%',
        lastUpdated: new Date(stockInfoData.timestamp * 1000).toLocaleDateString(),
      });
    } catch (err) {
      setError("Error fetching stock data");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    
    

    try {
      const response = await axios.get(`https://eodhistoricaldata.com/api/eod/${symbol}?api_token=670cbdcb5d6a98.28595369 &fmt=json`);
      const data = response.data;
      setHistoricalData(data);
      filterDataByRange(selectedRange, data);
    } catch (error) {
      console.log("Error fetching historical data", error);
    }
  };

  const fetchStockNews = async (stockName) => {
    try {
      const response = await axios.get(`https://newsdata.io/api/1/news`, {
        params: {
          apikey: 'pub_5726909ae8ab74afd8fcf47ed1aa5e8cec510',
          q: stockName,
          language: 'en',
          category: 'Business',
          size: 3,
        },
      });
      setNewsArticles(response.data.results || []);
    } catch (error) {
      console.log("Error fetching news", error);
    }
  };

  const filterDataByRange = (range, data) => {
    let filteredData;
    const today = new Date();

    const dateRange = {
      '1w': 7,
      '1m': 30,
      '6m': 180,
      '1y': 365,
    };

    filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      const differenceInDays = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
      return differenceInDays <= dateRange[range];
    });

    const labels = filteredData.map(item => new Date(item.date).toLocaleDateString());
    const prices = filteredData.map(item => item.close);

    setNiftyData({
      labels,
      datasets: [{
        label: `${symbol} Price (${range})`,
        data: prices,
        fill: false,
        borderColor: '#00A86B',
        tension: 0.1,
        pointRadius: 0,
        borderWidth: 1
      }]
    });
  };

  useEffect(() => {
    fetchStockData();
    fetchHistoricalData();
    if (name) fetchStockNews(name); // Fetch news using stock name
  }, [symbol, name]);
  

  useEffect(() => {
    if (historicalData.length > 0) {
      filterDataByRange(selectedRange, historicalData);
    }
  }, [selectedRange, historicalData]);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="stock-detail-container">
      <div className='header'>
        <h2 className='header-title'>ShariaStock</h2>
        
      </div>
      <br />
      {stockData && (
        <>
          <h1>{stockData.symbol} Details</h1>
          <div className="stock-grid">
            <div className="stock-item">
              <div className="label">Open</div>
              <div className="value">₹{stockData.open}</div>
            </div>
            
            <div className="stock-item">
              <div className="label">High</div>
              <div className="value">₹{stockData.high}</div>
            </div>
            
            <div className="stock-item">
              <div className="label">Low</div>
              <div className="value">₹{stockData.low}</div>
            </div>
            
            <div className="stock-item">
              <div className="label">Prev. close</div>
              <div className="value">₹{stockData.close}</div>
            </div>
            
            <div className="stock-item">
              <div className="label">Volume</div>
              <div className="value">{stockData.volume.toLocaleString()}</div>
            </div>
            
            <div className="stock-item">
              <div className="label">Avg. trade price</div>
              <div className="value">₹{((stockData.high + stockData.low) / 2).toFixed(2)}</div>
            </div>
            
            <div className="stock-item">
              <div className="label">Total buy quantity</div>
              <div className="value">{Math.round(stockData.volume * 0.45).toLocaleString()}</div>
            </div>
            
            <div className="stock-item">
              <div className="label">Total sell quantity</div>
              <div className="value">{Math.round(stockData.volume * 0.55).toLocaleString()}</div>
            </div>
          </div>

          {/* Chart Component */}
          <div className="market-container1">
            <h2>Price Chart</h2>
            <div className='chart-components1'>
            <div className="range-buttons1">
              {['1w', '1m', '6m', '1y'].map((range) => (
                <button
                  key={range}
                  className={`range-button1 ${selectedRange === range ? 'active' : ''}`}
                  onClick={() => handleRangeChange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            <div style={{ width: '700px', height: '300px' }}>
            {niftyData ? (
              <Line data={niftyData} options={{
                scales: {
                  x: {
                    grid: { display: false },
                    title: { display: true, text: 'Date' }
                  },
                  y: {
                    grid: { display: false },
                    title: { display: true, text: 'Price (INR)' }
                  }
                },
                plugins: { legend: { display: false } }
              }} />
            ) : (
              <p>Loading chart...</p>
            )}
            </div>
            
            </div>
          </div>

          {/* News Section */}
          <div className='News-section'>
          <h2>Related News</h2>
          <div className='News-container'>
          
          {newsArticles.length > 0 ? (
            newsArticles.map((article, index) => (
              <div key={index} className="news-article">
                <img src={article.image_url} alt="image" />
                <h4>{article.title}</h4>
                
                <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            ))
          ) : (
            <p>No news available for this stock.</p>
          )}
          </div>
          </div>
          
          
        </>
      )}
    </div>
  );
}
export default StockDetail;