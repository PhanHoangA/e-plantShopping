import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  // Retrieve cart items from Redux store to calculate total quantity dynamically
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies indoor air.",
          cost: "$18"
        },
        {
          name: "Boston Fern",
          image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20"
        },
        {
          name: "Rubber Plant",
          image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
          description: "Easy to care for and effective at removing bioeffluents.",
          cost: "$17"
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and provides soothing gel for skin.",
          cost: "$14"
        }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=600&q=80",
          description: "Calming scent, used in aromatherapy and relaxation.",
          cost: "$20"
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?auto=format&fit=crop&w=600&q=80",
          description: "Sweet fragrance, promotes better sleep and reduces anxiety.",
          cost: "$18"
        },
        {
          name: "Rosemary",
          image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
          description: "Invigorating scent, often used in cooking and memory support.",
          cost: "$15"
        },
        {
          name: "Mint",
          image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
          description: "Refreshing aroma, used in teas and culinary dishes.",
          cost: "$12"
        },
        {
          name: "Lemon Balm",
          image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
          description: "Citrusy scent, relieves stress and promotes relaxation.",
          cost: "$14"
        },
        {
          name: "Hyacinth",
          image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
          description: "Hyacinth is a beautiful flowering plant known for its rich fragrance.",
          cost: "$22"
        }
      ]
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        {
          name: "Oregano",
          image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg",
          description: "Contains compounds that deter insects and enhances dishes.",
          cost: "$10"
        },
        {
          name: "Marigold",
          image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg",
          description: "Natural insect repellent, also adds vibrant color to gardens.",
          cost: "$8"
        },
        {
          name: "Geraniums",
          image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg",
          description: "Known for their insect-repelling properties and pleasant scent.",
          cost: "$20"
        },
        {
          name: "Basil",
          image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
          description: "Repels flies and mosquitoes, also a popular culinary herb.",
          cost: "$9"
        },
        {
          name: "Catnip",
          image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg",
          description: "Repels mosquitoes effectively and is loved by cats.",
          cost: "$13"
        },
        {
          name: "Citronella Grass",
          image: "https://cdn.pixabay.com/photo/2017/06/14/16/20/lemongrass-2402626_1280.jpg",
          description: "Famous natural mosquito repellent with a crisp lemon aroma.",
          cost: "$16"
        }
      ]
    }
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // Check if item is still in cart to sync disabled button state if deleted from cart
  const isItemInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navbar" style={{
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px'
      }}>
        <div className="tag">
          <div className="luxury" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Paradise Nursery Logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <a href="/" onClick={handleHomeClick} style={{ textDecoration: 'none', color: 'white' }}>
              <div>
                <h3 style={{ margin: 0 }}>Paradise Nursery</h3>
                <i style={{ fontSize: '14px' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#home" onClick={handleHomeClick} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
          <a href="#plants" onClick={handlePlantsClick} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Plants</a>
          <a href="#cart" onClick={handleCartClick} style={{ color: 'white', textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="40" width="40">
              <rect width="156" height="156" fill="none"></rect>
              <circle cx="80" cy="216" r="12" fill="#fff"></circle>
              <circle cx="184" cy="216" r="12" fill="#fff"></circle>
              <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></path>
            </svg>
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#fff'
            }}>
              {totalCartQuantity}
            </span>
          </a>
        </div>
      </div>

      {/* Conditional Rendering: Product Grid vs Shopping Cart */}
      {!showCart ? (
        <div className="product-grid" style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '25px', borderBottom: '2px solid #4CAF50', paddingBottom: '10px', color: '#2e7d32' }}>
                {categoryObj.category}
              </h2>
              <div className="product-list" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '25px'
              }}>
                {categoryObj.plants.map((plant, plantIndex) => {
                  const alreadyAdded = addedToCart[plant.name] && isItemInCart(plant.name);
                  return (
                    <div key={plantIndex} className="product-card" style={{
                      backgroundColor: '#fff',
                      borderRadius: '10px',
                      padding: '20px',
                      textAlign: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <h3 style={{ marginBottom: '10px', color: '#333' }}>{plant.name}</h3>
                        <img
                          src={plant.image}
                          alt={plant.name}
                          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
                        />
                        <p style={{ color: '#e53935', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>{plant.cost}</p>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>{plant.description}</p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(plant)}
                        disabled={alreadyAdded}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: alreadyAdded ? '#9e9e9e' : '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: alreadyAdded ? 'not-allowed' : 'pointer',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}
                      >
                        {alreadyAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
