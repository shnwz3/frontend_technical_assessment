// submit.jsx - Submit, Save, and Reset buttons

import { useState } from 'react';
import { Rocket, BarChart3, AlertCircle, Save, RotateCcw, CheckCircle } from 'lucide-react';
import { useStore } from './store.js';
import { shallow } from 'zustand/shallow';
import './submit.css';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    savePipeline: state.savePipeline,
    resetPipeline: state.resetPipeline,
});

export const SubmitButton = () => {
    const { nodes, edges, savePipeline, resetPipeline } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [saveNotification, setSaveNotification] = useState(null);

    const handleSave = () => {
        savePipeline();
        setSaveNotification('Saved!');
        setTimeout(() => setSaveNotification(null), 2000);
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset the canvas? This will clear all nodes and edges.')) {
            resetPipeline();
            setSaveNotification('Canvas cleared');
            setTimeout(() => setSaveNotification(null), 2000);
        }
    };

    const handleSubmit = async () => {
        // Auto-save before submitting
        savePipeline();
        
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit pipeline');
            }

            const data = await response.json();
            setAlertData(data);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setAlertData({
                error: true,
                message: 'Failed to connect to backend. Make sure the server is running.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const closeAlert = () => {
        setAlertData(null);
    };

    return (
        <>
            <div className="submit-container">
                <div className="action-buttons">
                    <button
                        className="action-button save-button"
                        onClick={handleSave}
                        title="Save Pipeline"
                    >
                        <Save size={16} />
                        Save
                    </button>
                    <button
                        className="action-button reset-button"
                        onClick={handleReset}
                        title="Reset Canvas"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>
                </div>
                <button
                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner"></span>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Rocket className="submit-icon" size={18} />
                            Submit Pipeline
                        </>
                    )}
                </button>
            </div>

            {/* Save Notification Toast */}
            {saveNotification && (
                <div className="save-toast">
                    <CheckCircle size={16} />
                    {saveNotification}
                </div>
            )}

            {alertData && (
                <div className="alert-overlay" onClick={closeAlert}>
                    <div className="alert-box" onClick={(e) => e.stopPropagation()}>
                        {alertData.error ? (
                            <>
                                <div className="alert-header">
                                    <AlertCircle className="alert-icon error-icon" size={28} />
                                    <h3 className="alert-title">Error</h3>
                                </div>
                                <div className="alert-content">
                                    <p style={{ color: '#94a3b8', margin: 0 }}>{alertData.message}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="alert-header">
                                    <BarChart3 className="alert-icon" size={28} />
                                    <h3 className="alert-title">Pipeline Analysis</h3>
                                </div>
                                <div className="alert-content">
                                    <div className="alert-stat">
                                        <span className="alert-stat-label">Number of Nodes</span>
                                        <span className="alert-stat-value">{alertData.num_nodes}</span>
                                    </div>
                                    <div className="alert-stat">
                                        <span className="alert-stat-label">Number of Edges</span>
                                        <span className="alert-stat-value">{alertData.num_edges}</span>
                                    </div>
                                    <div className="alert-stat">
                                        <span className="alert-stat-label">Is Valid DAG</span>
                                        <span className={`alert-stat-value ${alertData.is_dag ? 'success' : 'error'}`}>
                                            {alertData.is_dag ? '✓ Yes' : '✗ No (contains cycle)'}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                        <button className="alert-button" onClick={closeAlert}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
