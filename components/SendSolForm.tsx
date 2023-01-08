import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js'

export const SendSolForm: FC = () => {
    const [formInputs, setFormInputs] = useState({
        amount: '',
        recipient: ''
    })
    const { publicKey, sendTransaction } = useWallet()
    const { connection } = useConnection()

    const sendSol = async (event: any) => {
        event.preventDefault()
        
        const { amount, recipient } = formInputs
        const transaction = new web3.Transaction()

        const sendSolInstruction = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new web3.PublicKey(recipient),
            lamports: web3.LAMPORTS_PER_SOL * parseFloat(amount)
        })

        transaction.add(sendSolInstruction);
        sendTransaction(transaction, connection).then(sig => {
            //success
            return "Payment sent!"
        }).catch(err => {
            console.log(err)
            //failure
        })
    }

    return (
        <div>
            <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" onChange={event => setFormInputs({ ...formInputs, amount: event.target.value })}
                 className={styles.formField} placeholder="e.g. 0.1" required />
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" onChange={event => setFormInputs({ ...formInputs, recipient: event.target.value })}
                className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                <button type="submit" className={styles.formButton}>Send</button>
            </form>
        </div>
    )
}