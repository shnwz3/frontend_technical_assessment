// toolbar.jsx

import { DraggableNode } from './draggableNode.jsx';
import { 
  Download, 
  Upload, 
  FileText, 
  Bot, 
  Globe, 
  Database, 
  GitBranch, 
  RefreshCw, 
  Timer,
  Zap
} from 'lucide-react';
import './toolbar.css';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-header">
                <h1 className="toolbar-title">
                    <Zap className="title-icon" size={20} />
                    Pipeline Builder
                </h1>
            </div>
            <div className="toolbar-nodes">
                <div className="node-group">
                    <span className="group-label">Core</span>
                    <div className="group-nodes">
                        <DraggableNode type='customInput' label='Input' icon={Download} />
                        <DraggableNode type='customOutput' label='Output' icon={Upload} />
                        <DraggableNode type='text' label='Text' icon={FileText} />
                        <DraggableNode type='llm' label='LLM' icon={Bot} />
                    </div>
                </div>
                <div className="node-group">
                    <span className="group-label">Integration</span>
                    <div className="group-nodes">
                        <DraggableNode type='api' label='API' icon={Globe} />
                        <DraggableNode type='database' label='Database' icon={Database} />
                    </div>
                </div>
                <div className="node-group">
                    <span className="group-label">Logic</span>
                    <div className="group-nodes">
                        <DraggableNode type='condition' label='Condition' icon={GitBranch} />
                        <DraggableNode type='transform' label='Transform' icon={RefreshCw} />
                        <DraggableNode type='timer' label='Timer' icon={Timer} />
                    </div>
                </div>
            </div>
        </div>
    );
};
