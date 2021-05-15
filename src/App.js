import React, {useState} from 'react'
import Dashboard from './routes/Dashboard';

function App() {
  const [pedido, setPedido] = useState(
    [
      { ID: 1, 
        clientName:'Edu',
        clientPhoneNumber:'6421445566', 
        products: [{productName: 'Tostitos con crema', quantity: 1}], 
        total: 100 }
    ]
  )

  return (
    <Dashboard />
  );
}

export default App;
