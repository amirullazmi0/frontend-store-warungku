'use client';

import { LayoutStoreProvider } from '@/app/ComponentGlobals/LayoutStore';
import Section from './Section';

export default async function Home({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug;
	return (
		<main>
			<LayoutStoreProvider>
				<Section itemId={slug}/>
			</LayoutStoreProvider>
		</main>
	);
}
