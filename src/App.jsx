// App.js
import React from "react";
import ReactFlow, { Controls, Background } from "react-flow-renderer";
import jsondata from "./assets/input.json";

// JSON Input
let lifecycle = jsondata.lifecyle;

// Function to generate nodes and edges for the graph
const generateGraphdd = (data) => {
  const nodes = [];
  const edges = [];

  let lastNodeId = null; // Tracks the last node for the "null" branch
  const branchLastNode = {}; // Tracks the last node for each branch

  data.forEach((item, index) => {
    // Create node
    const id = `node-${index}`;
    const node = {
      id,
      data: {
        label: (
          <div>
            <div style={{position:"absolute", top:"-25px"}}>{item.branch && <em>{item.branch}</em>}</div>
            <div style={{ textAlign: "center" }}>
              <strong>{item.state}</strong>
              <br />
              <small>{item.time}</small>
            </div>
          </div>
        ),
      },
      position: { x: 200 * (item.branch ? (item.branch === "Frontend" ? 1 : 2) : 0), y: index * 100 },
    };
    nodes.push(node);

    // Determine the "source" node for the edge
    const prevNodeId = item.branch ? branchLastNode[item.branch] : lastNodeId;

    // Add edge if there's a previous node
    if (prevNodeId) {
      edges.push({
        id: `edge-${prevNodeId}-${id}`,
        source: prevNodeId,
        target: id,
        type: "smoothstep",
      });
    }

    // Update the last node trackers
    if (item.branch) {
      branchLastNode[item.branch] = id;
    } else {
      lastNodeId = id;
    }
  });

  return { nodes, edges };
};

const generateGraph = (data) => {
  const nodes = [];
  const edges = [];

  let lastNullBranchNodeId = null; // Tracks the last node for the "null" branch
  const branchLastNode = {}; // Tracks the last node for each branch

  data.forEach((item, index) => {
    // Create node
    const id = `node-${index}`;
    const node = {
      id,
      data: {
        label: (
          <div style={{ textAlign: "center" }}>
            <strong>{item.state}</strong>
            <br />
            {item.time}
            <br />
            {item.branch && <em>{item.branch}</em>}
          </div>
        ),
      },
      position: { x: 200 * (item.branch ? (item.branch === "Frontend" ? 1 : 2) : 0), y: index * 100 },
    };
    nodes.push(node);

    // Determine the "source" node for the edge
    let prevNodeId;

    if (item.branch) {
      prevNodeId = branchLastNode[item.branch]; // Use last node in the same branch
    }

    // Fallback to the last node in the null branch if no previous node in the branch
    if (!prevNodeId) {
      prevNodeId = lastNullBranchNodeId;
    }

    // Add edge if there's a previous node
    if (prevNodeId) {
      edges.push({
        id: `edge-${prevNodeId}-${id}`,
        source: prevNodeId,
        target: id,
        type: "smoothstep",
      });
    }

    // Update the last node trackers
    if (item.branch) {
      branchLastNode[item.branch] = id;
    } else {
      lastNullBranchNodeId = id;
    }
  });

  return { nodes, edges };
};


function App() {
  const { nodes, edges } = generateGraph(lifecycle);

  return (
    <div style={{ height: "750px", width: "900px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default App;
