'use client';

import { LayoutStoreProvider } from '@/app/ComponentGlobals/LayoutStore';
import Section from './Section';

export default function Home() {
	return (
		<main>
			<LayoutStoreProvider>
				<Section />
			</LayoutStoreProvider>
		</main>
	);
}
