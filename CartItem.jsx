import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const unitPrice = parseFloat(item.cost.substring(1));
      return total + unitPrice * item.quantity;
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference (Coming Soon)');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    return (unitPrice * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container" style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#2e7d32', marginBottom: '20px' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.length === 0 ? (
          <p style={{ fontSize: '18px', color: '#666', margin: '30px 0' }}>Your cart is currently empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              padding: '20px',
              marginBottom: '16px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              gap: '20px'
            }}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div className="cart-item-details" style={{ flex: 1, textAlign: 'left' }}>
                <div className="cart-item-name" style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '6px' }}>
                  {item.name}
                </div>
                <div className="cart-item-cost" style={{ fontSize: '16px', color: '#555', marginBottom: '12px' }}>
                  Unit Price: {item.cost}
                </div>
                <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    style={{ width: '32px', height: '32px', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {item.quantity}
                  </span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    style={{ width: '32px', height: '32px', fontSize: '18px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total" style={{ fontSize: '17px', fontWeight: 'bold', color: '#2e7d32', marginBottom: '12px' }}>
                  Total: ${calculateTotalCost(item)}
                </div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                  style={{
                    padding: '6px 16px',
                    backgroundColor: '#e53935',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="continue_shopping_btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '30px' }}>
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
          style={{ width: '250px' }}
        >
          Continue Shopping
        </button>
        <button
          className="get-started-button"
          onClick={(e) => handleCheckoutShopping(e)}
          style={{ width: '250px', backgroundColor: '#2e7d32' }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
