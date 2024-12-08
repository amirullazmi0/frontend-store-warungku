'use client';

import { LayoutStoreProvider } from '@/app/ComponentGlobals/LayoutStore';
import Section from './Section';

export default function Home({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  return (
    <main>
      <LayoutStoreProvider>
        <Section itemId={slug} />
      </LayoutStoreProvider>
    </main>
  );
}
