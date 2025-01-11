'use client';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Section = () => {
	const [value, setValue] = useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<div>
			<Typography>List Transaksi</Typography>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
					<TabList
						onChange={handleChange}
						aria-label='lab API tabs example'>
						<Tab
							label='DI PESAN'
							value='1'
						/>
						<Tab
							label='DI PROSES'
							value='2'
						/>
						<Tab
							label='DI BATALKAN'
							value='3'
						/>
						<Tab
							label='SELESAI'
							value='4'
						/>
					</TabList>
				</Box>
				<TabPanel value='1'>Item One</TabPanel>
				<TabPanel value='2'>Item Two</TabPanel>
				<TabPanel value='3'>Item Three</TabPanel>
				<TabPanel value='4'>Item Three</TabPanel>
			</TabContext>
		</div>
	);
};

export default Section;
