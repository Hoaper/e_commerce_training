import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { ModalProvider } from './modal-provider'

export default function Providers({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <ModalProvider />
            {children}
        </ClerkProvider>
    )
}
