import { Handle, Position } from "reactflow";
import { X } from "lucide-react";
import { useStore } from "../store.js";
import "./BaseNode.css";
export const BaseNode = ({
  id,
  title,
  icon: Icon,
  inputs = [],
  outputs = [],
  children,
  style = {},
  className = "",
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div className={`base-node ${className}`} style={style}>
      {inputs.map((input, index) => {
        const topPercent =
          inputs.length === 1 ? 50 : ((index + 1) / (inputs.length + 1)) * 100;

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

      <div className="base-node-content">{children}</div>

      {outputs.map((output, index) => {
        const topPercent =
          outputs.length === 1
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
