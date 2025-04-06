import React, { useState, useEffect, Component } from 'react';
import { MusicProvider } from './context/MusicContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import ForYou from './components/ForYou';
import Search from './components/Search';
import Favourites from './components/Favourites';
import RecentlyPlayed from './components/RecentlyPlayed';
import TopTracks from './components/TopTracks';
import useMusicPlayer from './hooks/useMusicPlayer';
import { getGradientFromSong } from './utils/colorExtractor';
import { safeExecute } from './utils/errorHandler';
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

// Error boundary to catch errors in the UI
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('UI Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

// Content wrapper component that handles tab switching
const ContentWrapper = ({ onOpenMenu }) => {
  const { currentTab, currentSong } = useMusicPlayer();

  // Apply background gradient based on current song
  useEffect(() => {
    if (currentSong) {
      // Use safe execution to prevent UI errors
      safeExecute(() => {
        const gradient = getGradientFromSong(currentSong);
        document.body.style.background = gradient;
      });
    }
  }, [currentSong]);

  // Render component based on current tab
  const renderContent = () => {
    switch (currentTab) {
      case 'For You':
        return <ForYou />;
      case 'Search':
        return <Search />;
      case 'Favourites':
        return <Favourites />;
      case 'Recently Played':
        return <RecentlyPlayed />;
      case 'Top Tracks':
        return <TopTracks />;
      default:
        return <ForYou />;
    }
  };

  return (
    <div className="main-content">
      <button className="mobile-menu-toggle" onClick={onOpenMenu}>
        <FaBars />
      </button>
      <ErrorBoundary>
        {renderContent()}
      </ErrorBoundary>
    </div>
  );
};

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <ErrorBoundary>
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      </ErrorBoundary>
      <ErrorBoundary>
        <ContentWrapper onOpenMenu={handleOpenSidebar} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Player />
      </ErrorBoundary>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </ErrorBoundary>
  );
};

export default App; 