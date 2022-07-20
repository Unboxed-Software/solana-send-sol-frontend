import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter} from '@solana/wallet-adapter-wallets'
import * as web3 from '@solana/web3.js'
import { FC, ReactNode } from 'react'
//add style imports
require('@solana/wallet-adapter-react-ui/styles.css')

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const endpoint = web3.clusterApiUrl('devnet')
    const wally = [new PhantomWalletAdapter()]

    return (
        <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wally}>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
        </ConnectionProvider>

    )
}

export default WalletContextProvider