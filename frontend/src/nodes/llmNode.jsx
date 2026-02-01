
import { Bot } from 'lucide-react';
import { BaseNode } from '../components/BaseNode.jsx';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={Bot}
      inputs={[
        { id: 'system' },
        { id: 'prompt' }
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div className="llm-info">
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>
          This is a Large Language Model node.
        </p>
        <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '11px' }}>
          Inputs: System Prompt, User Prompt
        </p>
      </div>
    </BaseNode>
  );
};
