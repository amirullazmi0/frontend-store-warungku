'use client'
import { LayoutStoreProvider } from "@/app/ComponentGlobals/LayoutStore"
import React from "react"
import Section from "./Section"

export default function Home() {
    return (
        <main>
            <LayoutStoreProvider>
                <Section />
            </LayoutStoreProvider>
        </main>
    )
}