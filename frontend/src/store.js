// store.js - Manual Save/Reset workflow

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

const STORAGE_KEY = 'vectorshift-pipeline-save';

// Load initial state from localStorage if available
const getInitialState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const { nodes, edges, nodeIDs } = JSON.parse(saved);
      return { nodes: nodes || [], edges: edges || [], nodeIDs: nodeIDs || {} };
    } catch (e) {
      console.error('Failed to load saved pipeline:', e);
    }
  }
  return { nodes: [], edges: [], nodeIDs: {} };
};

const initialState = getInitialState();

export const useStore = create((set, get) => ({
  nodes: initialState.nodes,
  edges: initialState.edges,
  nodeIDs: initialState.nodeIDs,

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' } }, get().edges),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      }),
    });
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    });
  },

  // Manual Save to localStorage
  savePipeline: () => {
    const { nodes, edges, nodeIDs } = get();
    const data = JSON.stringify({ nodes, edges, nodeIDs });
    localStorage.setItem(STORAGE_KEY, data);
    return true;
  },

  // Manual Load from localStorage
  loadPipeline: () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { nodes, edges, nodeIDs } = JSON.parse(saved);
        set({ nodes: nodes || [], edges: edges || [], nodeIDs: nodeIDs || {} });
        return true;
      } catch (e) {
        console.error('Failed to load pipeline:', e);
        return false;
      }
    }
    return false;
  },

  // Check if saved data exists
  hasSavedPipeline: () => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  },

  // Reset canvas to empty and clear saved data
  resetPipeline: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ nodes: [], edges: [], nodeIDs: {} });
  },
}));
