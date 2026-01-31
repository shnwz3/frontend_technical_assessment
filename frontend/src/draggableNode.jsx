// draggableNode.jsx

import './draggableNode.css';

export const DraggableNode = ({ type, label, icon: Icon }) => {
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType }
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className="draggable-node"
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
            draggable
        >
            {Icon && <Icon className="draggable-node-icon" size={14} />}
            <span className="draggable-node-label">{label}</span>
        </div>
    );
};