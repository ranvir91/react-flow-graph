import React from 'react'

function Flownew() {
  return (
    <div>Flownew with new version of Reactflow</div>
  )
}

export default Flownew;




// import { useCallback } from 'react';
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from 'reactflow';

// import 'reactflow/dist/style.css';
// // import App from './App1';

// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// ];

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// function App() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

//   return (
//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//     >
//       <MiniMap />
//       <Controls />
//       <Background />
//     </ReactFlow>
//   );
// }

// export default App;