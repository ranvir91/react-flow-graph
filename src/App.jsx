import React from "react";
import ReactFlow, { Controls, Background } from "react-flow-renderer";

import jsondata from "./assets/input.json";

// JSON Input from local file 
let lifecycle = jsondata.lifecyle;

// Function to generate nodes and edges for the graph

const getBranchUnique = [];
lifecycle.forEach((item) => {
  if(!getBranchUnique.includes(item.branch)) {
    getBranchUnique.push(item.branch);
  }
});
console.log(getBranchUnique);

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
      // position: { x: 200 * (item.branch ? (item.branch === "Frontend" ? 1 : 2) : 0), y: index * 100 },
      position: { 
        x: 200 * getBranchUnique.indexOf(item.branch) , 
        y: index * 100
      },
    };
    nodes.push(node);

    // define the "source" node for the edge
    let prevNodeId;

    if (item.branch) {
      prevNodeId = branchLastNode[item.branch];
    }

    if (!prevNodeId) {
      prevNodeId = lastNullBranchNodeId;
    }

    // Add edge to previous node
    if (prevNodeId) {
      edges.push({
        id: `edge-${prevNodeId}-${id}`,
        source: prevNodeId,
        target: id,
        type: "smoothstep",
      });
    }

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
