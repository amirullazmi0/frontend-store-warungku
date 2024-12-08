'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Alert,
  TextField,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { CartItem } from '@/DTO/cart.dto';

const Section = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [updatedQty, setUpdatedQty] = useState<{ [key: string]: number }>({});
  const router = useRouter();
  const apiUrl = process.env.API_URL;
  const accessToken = Cookies.get('access-token');

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    } else {
      fetchCart();
    }
  }, [accessToken]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/cart/user/${accessToken}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCartItems(response.data);
    } catch (err) {
      setAlertMessage('Failed to load cart items');
      setAlertSeverity('error');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      await axios.delete(`${apiUrl}/cart/remove`, {
        data: { accessToken: accessToken, itemStoreId: itemId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      setAlertMessage('Item removed from cart');
      setAlertSeverity('success');
      setShowAlert(true);
      fetchCart();
    } catch (err) {
      setAlertMessage('Failed to remove item from cart');
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  const handleUpdateQty = async (itemId: string, newQty: number) => {
    try {
      await axios.post(
        `${apiUrl}/cart/update-qty`,
        {
          accessToken: accessToken,
          itemStoreId: itemId,
          qty: newQty,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, qty: newQty } : item
        )
      );
      setAlertMessage('Quantity updated');
      setAlertSeverity('success');
      setShowAlert(true);
    } catch (err) {
      setAlertMessage('Failed to update quantity');
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  const handleQtyChange = (itemId: string, value: string) => {
    const updatedValue = Math.max(Number(value), 1);
    setUpdatedQty((prevState) => ({
      ...prevState,
      [itemId]: updatedValue,
    }));
  };

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {loading && <Typography>Loading...</Typography>}

      {showAlert && (
        <Alert severity={alertSeverity} sx={{ marginBottom: 2 }}>
          {alertMessage}
        </Alert>
      )}

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 2,
          }}
        >
          {cartItems.map((item) => (
            <Card
              key={item.id}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <CardMedia
                component="img"
                height="140"
                image={
                  item.itemStore.itemStoreImages[0]?.path ||
                  '/image/defaultJpg.png'
                }
                alt={item.itemStore.name}
              />
              <CardContent>
                <Typography variant="h6">{item.itemStore.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Rp. {item.itemStore.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.itemStore.desc}
                </Typography>
              </CardContent>

              <Box sx={{ padding: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Current Quantity: {item.qty}
                </Typography>
                <TextField
                  type="number"
                  value={updatedQty[item.id] || item.qty}
                  onChange={(e) => handleQtyChange(item.id, e.target.value)}
                  sx={{ width: '60px', marginTop: 1 }}
                  inputProps={{ min: 1 }}
                />

                <Button
                  onClick={() =>
                    handleUpdateQty(item.id, updatedQty[item.id] || item.qty)
                  }
                  variant="contained"
                  sx={{ marginTop: 2 }}
                >
                  Update Quantity
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 2,
                }}
              >
                <IconButton
                  onClick={() => handleRemoveFromCart(item.itemStore.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Section;
