import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import VideoScreen from './screens/VideoScreen';
import FinalScreen from './screens/FinalScreen';

const App = () => {
  const [finalProps, setFinalProps] = useState({
    temp: '',
    name: '',
    type: '',
    annotation: null,
    loading: false,
    download: false,
    error: false,
  });

  function handleFinalSetup(data) {
    setFinalProps({
      temp: data.temp,
      name: data.name,
      type: data.type,
      annotation: data.annotation,
      loading: data.loading,
      download: data.download,
      error: data.error,
    });
  }

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact>
            <HomeScreen setFinalProps={handleFinalSetup} />
          </Route>
          <Route path="/image">
            <ImageScreen setFinalProps={handleFinalSetup} />
          </Route>
          <Route path="/video">
            <VideoScreen setFinalProps={handleFinalSetup} />
          </Route>
          <Route path="/final">
            <FinalScreen setFinalProps={handleFinalSetup} finalProps={finalProps} />
          </Route>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
