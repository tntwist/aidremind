import React, { useEffect } from 'react';
import './TaskPrintView.css'
import * as QRCode from 'qrcodejs2';
import { Button } from '@material-ui/core';

export default function TaskPrintView({ task, category, onCloseDialog }) {

    useEffect(() => {
        function updateQrCode(text, stageId = 'qr') {
            let qrEl = document.getElementById(stageId);
            if (qrEl) {
                // cleanup
                while (qrEl.hasChildNodes()) {
                    qrEl.removeChild(qrEl.lastChild);
                }
            }
        
            new QRCode(qrEl, {
                text,
                width: 128 * 2,
                height: 128 * 2,
                colorDark : '#000',
                colorLight : '#fff',
                correctLevel : QRCode.CorrectLevel.L
            });
        }
        
        updateQrCode('https://github.com/tntwist/aidremind');
    })

    return (
        <div className="task-print-view">
            <div className="task-print-view__stage">
                <div className="task-print-view__category">{category.name}</div>
                <div className="task-print-view__stage-body">
                        <div className="task-print-view__title">{task.title}</div>
                        <div id="qr" className="task-print-view__qrcode"></div>
                        <Button className="task-print-view__close-dialog-button" variant="outlined" onClick={() => window.print()}>Aufgabe drucken</Button>
                        <Button className="task-print-view__close-dialog-button" variant="outlined" onClick={onCloseDialog}>Dialog schließen</Button>
                </div>
            </div>
        </div>
    )
}