import React, { useState } from 'react';

const NFCComponent = () => {
  const [message, setMessage] = useState('');
  const [nfcUrl, setNfcUrl] = useState('https://www.linkedin.com/in/mohammed-ismail-6b8931275/');

  const writeToNFC = async () => {
    try {
        console.log('Attempting to write to NFC tag...');
        const ndef = new window.NDEFReader();
        console.log('NDEFReader initialized');
        await ndef.write({
            records: [{ recordType: 'url', data: nfcUrl }],
        });
        console.log('Write operation completed');
        alert('URL written to NFC tag!');
    } catch (error) {
        console.error('Error writing to NFC tag:', error);
        alert(`Cannot write to NFC tag: ${error.message}`);
    }
};

    const readFromNFC = async () => {
        try {
            const ndef = new window.NDEFReader();
            await ndef.scan();
            ndef.onreading = (event) => {
                const url = event.message.records[0].data;
                setMessage(`URL from NFC tag: ${url}`);
                window.location.href = url;
            };
        } catch (error) {
            console.error('Error reading NFC tag:', error);
        }
    };

    return (
        <div>
        <h1>NFC Demo</h1>
        <button onClick={writeToNFC}>Write to NFC</button>
        <button onClick={readFromNFC}>Read from NFC</button>
        {message && <p>{message}</p>}
        </div>
    );
};

export default NFCComponent;
