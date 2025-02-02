'use client';

import { LayoutStoreProvider } from '@/app/ComponentGlobals/LayoutStore';
import Section from './Section';

export default function Home({ params }: { params: { id: string } }) {
	const id = params.id;

	return (
		<main>
			<LayoutStoreProvider>
				<Section id={id} />
			</LayoutStoreProvider>
		</main>
	);
}
