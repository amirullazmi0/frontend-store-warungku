'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const TransactionsSection: React.FC = () => {
  const [tabValue, setTabValue] = useState('PAID');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Dialog state for viewing items
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const API_URL = process.env.API_URL;
  const accessToken = Cookies.get('access-token');

  // Switch tabs => refetch
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // Fetch transactions for the current tabValue (status)
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/transactions/getTransactionsByUser?accessToken=${accessToken}&status=${tabValue}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log('Transactions:', response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchTransactions();
    }
  }, [accessToken, tabValue]);

  // Show item details in a dialog
  const handleViewItems = (items: any[]) => {
    setSelectedItems(items || []);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItems([]);
  };

  // Example: call PATCH to update transaction status
  const handleUpdateStatus = async (
    transactionId: number,
    newStatus: string
  ) => {
    try {
      const response = await axios.patch(
        `${API_URL}/transactions/${transactionId}`,
        { newStatus },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log('Update response:', response.data);
      fetchTransactions(); // refetch after update
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
  };

  // Common table rendering
  const renderTransactionTable = (statusUpdate: string) => {
    if (loading) {
      return <CircularProgress />;
    }

    if (transactions.length === 0) {
      return <Typography>Data untuk status {tabValue}</Typography>;
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Detail Item</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Batalkan Pesanan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.transaction_id}>
                <TableCell>{tx.invoice?.invoiceNumber || 'N/A'}</TableCell>
                <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
                <TableCell>{tx.total}</TableCell>
                <TableCell>{tx.customer_fullname}</TableCell>
                <TableCell>
                  {tx.customer_address} {tx.customer_city}
                </TableCell>
                <TableCell>{tx.invoice?.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewItems(tx.invoice?.items || [])}
                  >
                    View Items
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleUpdateStatus(tx.transaction_id, statusUpdate)
                    }
                    disabled={tx.invoice?.status === 'CANCELLED'}
                  >
                    Update Pesanan
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleUpdateStatus(tx.transaction_id, 'CANCELLED')
                    }
                    disabled={tx.invoice?.status === 'CANCELLED'}
                  >
                    Batalkan
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        List Transaksi
      </Typography>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
          <TabList onChange={handleTabChange} aria-label="Transaction Tabs">
            <Tab label="DI PESAN" value="PAID" />
            <Tab label="DI PROSES" value="PROCEED" />
            <Tab label="DI BATALKAN" value="CANCELLED" />
            <Tab label="SELESAI" value="DONE" />
          </TabList>
        </Box>

        <TabPanel value="PAID">{renderTransactionTable('PROCEED')}</TabPanel>
        <TabPanel value="PROCEED">{renderTransactionTable('DONE')}</TabPanel>
        <TabPanel value="CANCELLED">
          {renderTransactionTable('CANCELLED')}
        </TabPanel>
        <TabPanel value="DONE">{renderTransactionTable('DONE')}</TabPanel>
      </TabContext>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Detail Items</DialogTitle>
        <DialogContent dividers>
          {selectedItems.length === 0 ? (
            <Typography>No items available.</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedItems.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <img
                          src={item.images}
                          alt={item.itemName}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.qty}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionsSection;
