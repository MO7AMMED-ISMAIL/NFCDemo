import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NFCComponent = () => {
    const [message, setMessage] = useState('');
    const [nfcUrl, setNfcUrl] = useState('https://www.linkedin.com/in/mohammed-ismail-6b8931275/');

    const writeToNFC = async () => {
        try {
            const ndef = new window.NDEFReader();
            await ndef.write({
                records: [{ recordType: 'url', data: nfcUrl }],
            });
            alert('URL written to NFC tag! sucessfully');
        } catch (error) {
            console.error('Error writing to NFC tag:', error);
            alert('Cannot write to NFC tag: ' + error.message);
        }
    };

    return (
        <div className="container text-center mt-5">
            <h1>NFC Demo</h1>
            <button 
                className="btn btn-primary mt-3" 
                onClick={writeToNFC}
            >
                Write to NFC
            </button>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default NFCComponent;
