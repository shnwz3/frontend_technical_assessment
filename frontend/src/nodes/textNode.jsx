
import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { FileText } from 'lucide-react';
import { BaseNode } from '../components/BaseNode.jsx';
import './textNode.css';

// Regex to match {{ variableName }} pattern with valid JS variable names
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 220, height: 100 });

  const variables = useMemo(() => {
    const matches = [...currText.matchAll(VARIABLE_REGEX)];
    const uniqueVars = [...new Set(matches.map(match => match[1]))];
    return uniqueVars;
  }, [currText]);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      // Calculate height based on scroll height
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;

      // Calculate width based on longest line
      const lines = currText.split('\n');
      const longestLine = lines.reduce((a, b) => a.length > b.length ? a : b, '');
      const minWidth = 220;
      const charWidth = 7.5; // Approximate character width
      const calculatedWidth = Math.max(minWidth, Math.min(400, longestLine.length * charWidth + 40));

      setDimensions({
        width: calculatedWidth,
        height: Math.max(100, scrollHeight + 70) // Add header height
      });
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div
      className="text-node-wrapper"
      style={{
        width: dimensions.width,
        minHeight: dimensions.height
      }}
    >
      {variables.map((variable, index) => {
        const topPercent = variables.length === 1
          ? 50
          : ((index + 1) / (variables.length + 1)) * 100;

        return (
          <Handle
            key={variable}
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            className="handle handle-variable"
            style={{ top: `${topPercent}%` }}
          >
            <span className="handle-label">{variable}</span>
          </Handle>
        );
      })}

      <BaseNode
        id={id}
        title="Text"
        icon={FileText}
        outputs={[{ id: 'output' }]}
        className="text-node-inner"
      >
        <div className="text-node-field">
          <label className="node-field-label">Text</label>
          <textarea
            ref={textareaRef}
            className="text-node-textarea"
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text... Use {{variable}} for inputs"
          />
        </div>
        {variables.length > 0 && (
          <div className="text-node-variables">
            <span className="variables-label">Variables:</span>
            {variables.map(v => (
              <span key={v} className="variable-tag">{v}</span>
            ))}
          </div>
        )}
      </BaseNode>
    </div>
  );
};
