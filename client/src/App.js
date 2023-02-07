import React, { useState, useEffect} from 'react';

function App() {
const [resourceType, setResourceType] = useState('Home')

useEffect(() => {
  console.log('Render')
})

  return (
  <>
    <div>
     <button onClick={() => setResourceType('Home')}>Home</button>
     <button onClick={() => setResourceType('Users')}>Users</button>
     <button onClick={() => setResourceType('Comments')}>Comments</button>
    </div>
    <h1>{resourceType}</h1>
  </>
  )
}

export default App;
