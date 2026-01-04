import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState('');
  const [backStack, setBackStack] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);
  const [allPages, setAllPages] = useState([]);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE}/history`);
      setHistory(response.data.history || []);
      setCurrentPage(response.data.current_page || '');
      setBackStack(response.data.back_stack || []);
      setForwardStack(response.data.forward_stack || []);
      setAllPages(response.data.all_pages || []);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const visitPage = async (page) => {
    try {
      const response = await axios.post(`${API_BASE}/visit`, { page });
      setHistory(response.data.history || []);
      setCurrentPage(response.data.current_page || '');
      setBackStack(response.data.back_stack || []);
      setForwardStack(response.data.forward_stack || []);
      setAllPages(response.data.all_pages || []);
    } catch (error) {
      console.error('Error visiting page:', error);
    }
  };

  const goBack = async () => {
    try {
      const response = await axios.post(`${API_BASE}/back`);
      setHistory(response.data.history || []);
      setCurrentPage(response.data.current_page || '');
      setBackStack(response.data.back_stack || []);
      setForwardStack(response.data.forward_stack || []);
    } catch (error) {
      console.error('Error going back:', error);
    }
  };

  const goForward = async () => {
    try {
      const response = await axios.post(`${API_BASE}/forward`);
      setHistory(response.data.history || []);
      setCurrentPage(response.data.current_page || '');
      setBackStack(response.data.back_stack || []);
      setForwardStack(response.data.forward_stack || []);
    } catch (error) {
      console.error('Error going forward:', error);
    }
  };

  const clearHistory = async () => {
    try {
      const response = await axios.post(`${API_BASE}/clear`);
      setHistory([]);
      setCurrentPage('');
      setBackStack([]);
      setForwardStack([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🌐 Browser History Simulator</h1>
        <p>Stack-based Navigation System</p>
      </header>

      <div className="main-content">
        <div className="browser-section">
          <div className="navbar">
            <button onClick={goBack} disabled={backStack.length === 0} className="nav-btn">
              ← Back
            </button>
            <button onClick={goForward} disabled={forwardStack.length === 0} className="nav-btn">
              Forward →
            </button>
            <input
              type="text"
              value={currentPage}
              readOnly
              className="address-bar"
              placeholder="Current Page"
            />
            <button onClick={clearHistory} className="clear-btn">
              Clear History
            </button>
          </div>

          <div className="content-area">
            <div className="current-page-display">
              <h2>📄 Current Page</h2>
              <div className="page-box">
                {currentPage ? (
                  <h3>{currentPage}</h3>
                ) : (
                  <p className="empty-state">No page visited yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="stacks-container">
          <div className="stack-section back-stack">
            <h3>⬅️ Back Stack</h3>
            <div className="stack-items">
              {backStack.length === 0 ? (
                <p className="empty-stack">Empty</p>
              ) : (
                backStack.map((page, index) => (
                  <div key={index} className="stack-item">
                    {page}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="stack-section forward-stack">
            <h3>➡️ Forward Stack</h3>
            <div className="stack-items">
              {forwardStack.length === 0 ? (
                <p className="empty-stack">Empty</p>
              ) : (
                forwardStack.map((page, index) => (
                  <div key={index} className="stack-item">
                    {page}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pages-section">
        <h3>🔗 Available Pages</h3>
        <div className="pages-grid">
          {['Home', 'About', 'Services', 'Products', 'Blog', 'Contact', 'Gallery', 'FAQ'].map((page) => (
            <button
              key={page}
              onClick={() => visitPage(page)}
              className="page-btn"
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      <div className="history-section">
        <h3>📋 Visit History</h3>
        <div className="history-list">
          {history.length === 0 ? (
            <p className="empty-history">No history yet</p>
          ) : (
            <ol>
              {history.map((page, index) => (
                <li key={index}>{page}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
