'use client';
import Image from 'next/image';
import { LayoutStoreProvider } from '../ComponentGlobals/LayoutStore';
import Section from './Section';
import ButtonAddStore from './component/ButtonAddStore';

export default function Home() {
	return (
		<main>
			<LayoutStoreProvider>
				<Section />
			</LayoutStoreProvider>
		</main>
	);
}
