
import { createRoot } from 'react-dom/client';
import App from '../../App';
import './index.css';
import { AppRegistry } from 'react-native';

// Register the app
AppRegistry.registerComponent('App', () => App);

// Initialize the app
const root = document.getElementById('root');
if (root) {
  const rootTag = createRoot(root);
  rootTag.render(<App />);
}
