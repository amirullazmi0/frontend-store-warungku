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
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { WishlistItem } from '@/DTO/itemStore.dto';
import { Delete as DeleteIcon } from '@mui/icons-material';

const Section = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const router = useRouter();
  const apiUrl = process.env.API_URL;
  const accessToken = Cookies.get('access-token');

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    } else {
      fetchWishlist();
    }
  }, [accessToken]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/wishlist/user/${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setWishlistItems(response.data);
    } catch (err) {
      setAlertMessage('Failed to load wishlist items');
      setAlertSeverity('error');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (itemId: string) => {
    try {
      await axios.delete(`${apiUrl}/wishlist/remove`, {
        data: { accessToken: accessToken, itemStoreId: itemId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
      setAlertMessage('Item removed from wishlist');
      setAlertSeverity('success');
      setShowAlert(true);
      fetchWishlist();
    } catch (err) {
      setAlertMessage('Failed to remove item from wishlist');
      setAlertSeverity('error');
      setShowAlert(true);
    }
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
        Your Wishlist
      </Typography>

      {loading && <Typography>Loading...</Typography>}

      {showAlert && (
        <Alert severity={alertSeverity} sx={{ marginBottom: 2 }}>
          {alertMessage}
        </Alert>
      )}

      {wishlistItems.length === 0 ? (
        <Typography>Your wishlist is empty</Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 2,
          }}
        >
          {wishlistItems.map((item) => (
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 2,
                }}
              >
                <IconButton
                  onClick={() => handleRemoveFromWishlist(item.itemStore.id)}
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
