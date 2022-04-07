import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import VideoScreen from './screens/VideoScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/image" component={ImageScreen} />
          <Route path="/video" component={VideoScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
