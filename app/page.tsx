'use client'
import Image from "next/image";
import { LayoutStoreProvider } from "./ComponentGlobals/LayoutStore";
import Section from "./Section";

export default function Home() {
  return (
    <main>
      <LayoutStoreProvider>
        <Section />
      </LayoutStoreProvider>
    </main>
  );
}
