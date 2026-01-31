import { PipelineToolbar } from './toolbar.jsx';
import { PipelineUI } from './ui.jsx';
import { SubmitButton } from './submit.jsx';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
