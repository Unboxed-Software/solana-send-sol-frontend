import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import { SendSolForm } from '../components/SendSolForm'
import Head from 'next/head'
import WalletContextProvider from '../components/WalletContextProvider'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { FC, useEffect, useState } from 'react'

const Home: NextPage = (props) => {
  const [balance, setBalance] = useState(0)
  const { connection } = useConnection()
  const { publicKey } = useWallet()

  useEffect(() => {
        if (!connection || !publicKey) { return }

        connection.getAccountInfo(publicKey).then(info => {
            setBalance(info.lamports)
        })
    }, [connection, publicKey])
    
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <p>{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL} SOL` : ''}</p>
          <SendSolForm />
        </div>
      </WalletContextProvider>
    </div>
  );
}

export default Home;