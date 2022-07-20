import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import * as web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'


export const SendSolForm: FC = () => {
    const [txSig, setTxSig] = useState('');
    const {connection} = useConnection()
    const {publicKey, sendTransaction} = useWallet()
    const link = () => {
        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ''
    }

    const sendSol = event => {
        event.preventDefault()
        if(!connection || !publicKey){
            return
        }

        //get value from form
        const recipientPubKey = new web3.PublicKey(event.target.recipient.value)
        //create the transaction instruciton
        const ix = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPubKey,
            lamports: event.target.amount.value * web3.LAMPORTS_PER_SOL
        })
        //create tx instance
        const tx = new web3.Transaction().add(ix)

        sendTransaction(tx,connection).then(sig =>{
            setTxSig(sig)
        })
    }

    return (
        <div>
            {
            publicKey ?

            <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                <button type="submit" className={styles.formButton}>Send</button>
            </form> :
            <span>Connect your wallet</span>
            }
            {
                txSig ?
                    <div>
                        <p>View your transaction on </p>
                        <a href={link()}>Solana Explorer</a>
                    </div> :
                    null
            }
        </div>
    )
}