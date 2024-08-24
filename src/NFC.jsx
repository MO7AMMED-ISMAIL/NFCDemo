import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NFCComponent = () => {
    const [message, setMessage] = useState('');
    const [nfcUrl, setNfcUrl] = useState('https://tapnet.pages.dev/ali');
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState('');

    const writeToNFC = async () => {
        setScanning(true);
        try {
            if ('NDEFReader' in window) {
                const ndef = new window.NDEFReader();
                await ndef.write({
                    records: [{ recordType: 'url', data: nfcUrl }],
                });
                setMessage("NFC Card opened the URL successfully...");
            } else {
                setError("NFC writing is not supported on this device/browser.");
            }
        } catch (error) {
            console.error('Error writing to NFC tag:', error);
            alert('Cannot write to NFC tag: ' + error.message);
        }
        setScanning(false);
    };

    const readFromNFC = async () => {
        setScanning(true);
        try {
            if ('NDEFReader' in window) {
                const ndef = new window.NDEFReader();
                await ndef.scan();
                ndef.onreading = (event) => {
                    const message = event.message;
                    for (const record of message.records) {
                        if (record.recordType === 'url') {
                            const url = new TextDecoder().decode(record.data);
                            setMessage(`NFC Tag contains URL: ${url}`);
                            window.location.href = url; // Automatically navigate to the URL
                        } else {
                            setMessage('NFC Tag read, but no URL found.');
                        }
                    }
                };
            } else {
                setError("NFC reading is not supported on this device/browser.");
            }
        } catch (error) {
            console.error('Error reading from NFC tag:', error);
            alert('Cannot read NFC tag: ' + error.message);
        }
        setScanning(false);
    };

    return (
        <div className="container text-center mt-5">
            <h1>NFC Demo</h1>
            {
                scanning === false ? (
                    <>
                        <button 
                            className="btn btn-primary mt-3" 
                            onClick={writeToNFC}
                        >
                            Write to NFC Card
                        </button>
                        <button 
                            className="btn btn-secondary mt-3 ml-2" 
                            onClick={readFromNFC}
                        >
                            Scan NFC Card
                        </button>
                    </>
                ) : (
                    <>
                        <h1>PLZ Near NFC Card From mobile to scan</h1>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </>
                )
            }
            {message && <p className="mt-3 text-success">{message}</p>}
            {error && <p className="mt-3 text-danger">{error}</p>}
        </div>
    );
};

export default NFCComponent;
