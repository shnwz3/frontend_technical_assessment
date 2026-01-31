from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from collections import defaultdict

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[Dict[str, Any]] = None
    data: Optional[Dict[str, Any]] = None

class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using Kahn's algorithm.
    Returns True if the graph is a DAG, False otherwise.
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree count
    node_ids = {node.id for node in nodes}
    adj_list = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in-degree for all nodes
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build the graph from edges
    for edge in edges:
        # Only consider edges where both source and target exist
        if edge.source in node_ids and edge.target in node_ids:
            adj_list[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    # Find all nodes with in-degree 0 (starting nodes)
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    
    visited_count = 0
    
    # Process nodes in topological order
    while queue:
        current = queue.pop(0)
        visited_count += 1
        
        # Reduce in-degree for all neighbors
        for neighbor in adj_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, it's a DAG
    # If not, there's a cycle
    return visited_count == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: Pipeline):
    """
    Parse a pipeline and return analysis results.
    
    Returns:
        - num_nodes: Number of nodes in the pipeline
        - num_edges: Number of edges in the pipeline
        - is_dag: Whether the pipeline forms a Directed Acyclic Graph
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag_result
    )
