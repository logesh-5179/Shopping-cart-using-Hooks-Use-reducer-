import React, { useReducer } from 'react';
import './App.css';
import img1 from '../../src/assets/download.jpeg';
import img2 from '../../src/assets/download (1).jpeg';
import img3 from '../../src/assets/download (2).jpeg';
import img4 from '../../src/assets/download (3).jpeg';
import img5 from '../../src/assets/download (4).jpeg';

const initialState = {
  products: [
    { id: 1,name:'Apple', quantity: 0,image: img1 },
    { id: 2,name:'Orange', quantity: 0,image: img2 },
    { id: 3,name:'Mango', quantity: 0, image: img3 },
    { id: 4,name:'Strawberry', quantity: 0, image: img4 },
    { id: 5,name:'Grapes', quantity: 0, image: img5 },
  ],
  total: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,products: state.products.map(item =>
          item.id===action.id ? { ...item, quantity: item.quantity+1}: item
        ),
        total: state.total+1,
      
      };
    case 'remove':
      return {
        ...state,products: state.products.map(item =>
          item.id===action.id && item.quantity >0? { ...item,quantity: item.quantity -1}
            : item
        ),
        total: state.total>0?state.total - 1 : 0,
       
      };
    default:
      throw new Error('Erro: ' + action.type);
  }
}

export default function ShoppingCart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      <div className="product-list">

        {state.products.map(item => (
          <div key={item.id} className="product-card">

            <img src={item.image} alt={item.name} className="product-image" />
            <h2>{item.name}</h2>
            <p>Quantity: {item.quantity}</p>

            <div className="controls">


              <button onClick={() => dispatch({ type: 'remove',id: item.id })} style={{backgroundColor:"red"}}>
                Remove
              </button>
              <button onClick={() => dispatch({ type: 'add',id: item.id })} style={{backgroundColor:"green"}}>
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2 className='val'>Total: {state.total}
      </h2>
      
    </div>
  );
}
