// BaseNode.jsx
// Reusable node wrapper component with consistent styling and handle management

import { Handle, Position } from 'reactflow';
import { X } from 'lucide-react';
import { useStore } from '../store.js';
import './BaseNode.css';

/**
 * BaseNode - A reusable wrapper for all node types
 * @param {string} id - Node ID
 * @param {string} title - Node title displayed in header
 * @param {Component} icon - Lucide icon component
 * @param {Array} inputs - Array of input handle configs: [{id, label, style}]
 * @param {Array} outputs - Array of output handle configs: [{id, label, style}]
 * @param {ReactNode} children - Node content (fields, etc.)
 * @param {object} style - Additional container styles
 * @param {string} className - Additional CSS classes
 */
export const BaseNode = ({ 
  id, 
  title, 
  icon: Icon,
  inputs = [], 
  outputs = [], 
  children,
  style = {},
  className = ''
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div className={`base-node ${className}`} style={style}>
      {/* Input Handles */}
      {inputs.map((input, index) => {
        const topPercent = inputs.length === 1 
          ? 50 
          : ((index + 1) / (inputs.length + 1)) * 100;
        
        return (
          <Handle
            key={input.id}
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            className="handle handle-input"
            style={{ top: `${topPercent}%`, ...input.style }}
          />
        );
      })}

      {/* Node Header */}
      <div className="base-node-header">
        <div className="base-node-header-left">
          {Icon && <Icon className="base-node-icon" size={16} />}
          <span className="base-node-title">{title}</span>
        </div>
        <button 
          className="base-node-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(id);
          }}
          title="Delete Node"
        >
          <X size={14} />
        </button>
      </div>

      {/* Node Content */}
      <div className="base-node-content">
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => {
        const topPercent = outputs.length === 1 
          ? 50 
          : ((index + 1) / (outputs.length + 1)) * 100;
        
        return (
          <Handle
            key={output.id}
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            className="handle handle-output"
            style={{ top: `${topPercent}%`, ...output.style }}
          />
        );
      })}
    </div>
  );
};

export default BaseNode;
