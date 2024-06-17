import React, { useState } from 'react';
import './App.css';
import MapComponent from './MapComponent';
import RandomPopup from './RandomPopup';

function App() {
  const [lat, setLat] = useState(37.5665); // 기본값: 서울시청 위도
  const [lng, setLng] = useState(126.9780); // 기본값: 서울시청 경도
  const [radius, setRadius] = useState(500); // 기본값: 500m
  const [results, setResults] = useState([]);
  const [randomPlace, setRandomPlace] = useState(null);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:5000/search?lat=${lat}&lng=${lng}&radius=${radius}`);
    const data = await response.json();
    setResults(data);
  };

  const handleRandomSelect = () => {
    if (results.length > 0) {
      const randomIndex = Math.floor(Math.random() * results.length);
      setRandomPlace(results[randomIndex]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        식사 해결의 책
      </header>
      <div className="App-body">
        <div className="App-list">
          <select value={radius} onChange={(e) => setRadius(e.target.value)}>
            <option value={500}>500m</option>
            <option value={1000}>1km</option>
          </select>
          <button onClick={handleSearch}>검색</button>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result.place_name}</li>
            ))}
          </ul>
        </div>
        <div className="App-map">
          <MapComponent places={results} />
          <button onClick={handleRandomSelect}>정하기</button>
        </div>
      </div>
      {randomPlace && <RandomPopup place={randomPlace} onClose={() => setRandomPlace(null)} />}
    </div>
  );
}

export default App;
