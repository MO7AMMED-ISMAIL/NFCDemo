import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NFCComponent = () => {
    const [message, setMessage] = useState('');
    const [nfcUrl, setNfcUrl] = useState('https://tapnet.pages.dev/ali');
    const [scanning , setScanning] = useState(false);

    const writeToNFC = async () => {
        setScanning(!scanning);
        try {
            const ndef = new window.NDEFReader();
            await ndef.write({
                records: [{ recordType: 'url', data: nfcUrl }],
            });
            setMessage("NFC Card Open the url successfully... ");
        } catch (error) {
            console.error('Error writing to NFC tag:', error);
            alert('Cannot write to NFC tag: ' + error.message);
        }
        setScanning(!scanning);
    };

    return (
        <div className="container text-center mt-5">
            <h1>NFC Demo</h1>
            {
                scanning ? (
                    <button 
                        className="btn btn-primary mt-3" 
                        onClick={writeToNFC}
                    >
                        Scan NFC Card
                    </button>
                ):(
                    <>
                        <h1>PLZ Near NFC Card From mobile to scan</h1>
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </>
                )
            }
            
            {message && <p className="mt-3 text-success">{message}</p>}
        </div>
    );
};

export default NFCComponent;
