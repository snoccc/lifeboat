import './styles/reset.css';
import './styles/screen.css';
import FileDirectory from './components/FileDirectory';
import Main from './components/Main';

function App() {
  return (
    <div className="App flex h-screen">
      <FileDirectory />
      <Main />
    </div>
  );
}

export default App;
