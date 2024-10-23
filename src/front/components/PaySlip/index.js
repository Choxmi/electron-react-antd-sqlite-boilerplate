import * as React from 'react';
import './report.css'
import { Button } from 'antd';
import { useReactToPrint } from 'react-to-print';

const Slip = ({ month_string = '', grossweight = '', rupees = '', cents = '', name = '', address = '', uid = '', price = '',
    total_amount = '', addi0 = '', transport = '', addi1 = '', addi3 = '', addi4 = '', stamps = '', other_expense1 = '', other_expense2 = '',
    total_debt = '', total_deduct = '', total_pay = '' }) => {
    return <div id="printSample" className="print-div" style={{ width: '48%', padding: '0.5%' }}>
        <h2>දිදුල අමු තේ දළු ප්‍රවාහනය කරන්නෝ</h2>
        <h3>ඩී.ඩබ්. අලංක නිලුපුල්</h3>
        <p className="top">(බලයලත් අමු තේ දළු වෙළඳ නියෝජිත)</p>
        <p className="top">B 73, පුංචි දොඩාවත්ත, නූරිය. දු.ක. 077 9055513</p>
        <p className="report-p">ලි.ප. අංකය R 4867</p>
        <p className="top"><u>1957 අංක 51 දරණ TC 18 දරණ ප්‍රකාශනය</u></p>
        <hr />
        <div>
            <p className="description">පහත නම සඳහන් මා විසින් {month_string} මාසයේ ඉහත නම සඳහන් අයට අමු තේ දළු කි.ග්‍රෑ.
                {grossweight} ක් මාගේ ඉඩමෙන් නෙලාගෙන බාර දී රුපියල් {rupees} ශත {cents} ක මුදලක් / හිඟ බිල්පත බාර
                ගතිමි.</p>
            <br />
            <div className="basics">
                <div className="summary-container">
                    <div>
                        <p>නම : </p>
                        <p>ලිපිනය : </p>
                        <p>සාමාජික අංකය : </p>
                        <p>සැපයූ තේ දළු ප්‍රමාණය : </p>
                        <p>කිලෝවක මිල : </p>
                        <p>මුළු මුදල : </p>
                    </div>
                    <div className="data-list">
                        <p><strong>{name}</strong></p>
                        <p><strong>{address}</strong></p>
                        <p><strong>{uid}</strong></p>
                        <p><strong>{grossweight}</strong></p>
                        <p><strong>{price}</strong></p>
                        <p><strong>{total_amount}</strong></p>
                    </div>
                </div>
                <hr />
                <p><u>අඩු කිරීම්</u></p>
                <br />
                <div className="detail-container">
                    <div>
                        <p>අත්තිකාරම් : </p>
                        <p>ප්‍රවාහන ගාස්තු : </p>
                        <p>පොහොර : </p>
                        <p>ඩොලමයිට් : </p>
                    </div>
                    <div className="data-list">
                        <p><strong>{addi0}</strong></p>
                        <p><strong>{transport}</strong></p>
                        <p><strong>{addi1}</strong></p>
                        <p><strong>{addi3}</strong></p>
                    </div>
                    <div>
                        <p>තේ කොළ : </p>
                        <p>මුද්දර ගාස්තු : </p>
                        <p>වෙනත් : </p>
                    </div>
                    <div className="data-list">
                        <p><strong>{addi4}</strong></p>
                        <p><strong>{stamps}</strong></p>
                        <p><strong>{other_expense1}</strong></p>
                        <p><strong>{other_expense2}</strong></p>
                    </div>
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 4 }}>
                        <p>කලින් මාසයේ හිඟ මුදල් : </p>
                    </div>
                    <div style={{ flex: 2 }}>
                        <p><strong>{total_debt}</strong></p>
                    </div>
                    <div style={{ flex: 2 }}>
                        <p>&nbsp;</p>
                    </div>
                </div>
                <hr />
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 5 }}>
                        <p>මුළු අඩු කිරීම් : </p>
                    </div>
                    <div style={{ flex: 3 }} className="underline-drawer">
                        <p><strong>{total_deduct}</strong></p>
                    </div>
                    <div style={{ flex: 2 }}>
                        <p>&nbsp;</p>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 5 }}>
                        <p>ගෙවීමට ඇති ඉතිරි/හිඟ මුදල : </p>
                    </div>
                    <div style={{ flex: 3 }} className="underline-drawer">
                        <p><strong>{total_pay}</strong></p>
                    </div>
                    <div style={{ flex: 2 }}>
                        <p>&nbsp;</p>
                    </div>
                </div>
                <br />
                <p>ඉහත සඳහන් මුදල ලබාගත් බව සහතික කරමි</p>
                <br />
                <br />
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 5 }}>
                        <p>.........................................</p>
                        <p>දිනය</p>
                    </div>
                    <div style={{ flex: 5, textAlign: 'right' }}>
                        <p>.........................................</p>
                        <p>දළු සැපයුම්කරුගේ අත්සන</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

const PaySlip = () => {
    const paperRef = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => paperRef.current,
    });
    return <div>
        <Button onClick={handlePrint}>Print Page</Button>
        <div className='paper-container' ref={paperRef}>
            <Slip />
            <Slip />
        </div>
    </div>
}

export default PaySlip;