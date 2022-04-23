import React, { useEffect, useState } from 'react';

function SIG(props: any) {
    const { sig } = props;

    const [source, setSource] = useState<string>('');

    useEffect(() => {
        if (sig.type === 'MS1') {
            try {
                const src = require(`/public/images/sig/Common/${sig.code}.png`);
                setSource(src);
            } catch (e1: any) {
                try {
                    const src = require(`/public/images/sig/Common/${sig.code}.gif`);
                    setSource(src);
                } catch (e2: any) {
                    try {
                        const src = require(`/public/images/sig/MS1/${sig.code}.png`);
                        setSource(src);
                        // eslint-disable-next-line no-empty
                    } catch (e3: any) {}
                }
            }
        } else if (sig.type === 'AMI') {
            try {
                if (sig.code === 'NATIONAL_SPEED_LIMIT') {
                    const src = require(`/public/images/sig/AMI/${sig.code}.png`);
                    setSource(src);
                } else {
                    const src = require(`/public/images/sig/Common/${sig.code}.png`);
                    setSource(src);
                }
            } catch (e4: any) {
                try {
                    const src = require(`/public/images/sig/Common/${sig.code}.gif`);
                    setSource(src);
                } catch (e5: any) {
                    try {
                        const src = require(`/public/images/sig/AMI/${sig.code}.png`);
                        setSource(src);
                    // eslint-disable-next-line no-empty
                    } catch (e6: any) {}
                }
            }
        } else {
            try {
                const src = require(`/public/images/sig/AMI/${sig.code}.png`);
                setSource(src);
            // eslint-disable-next-line no-empty
            } catch (e: any) {}
        }
    }, [sig.type, sig.code]);

    return (
        <div style={{
            margin: '0 2px',
            padding: '4px',
            height: '30px',
            borderBottom: sig.slip ? 'solid 2px #1b5e20' : 'solid 2px #01579b',
        }}
        >
            <img src={source} alt="SIG Screen" style={{ width: '30px', height: '30px' }} />
        </div>
    );
}

export default SIG;
