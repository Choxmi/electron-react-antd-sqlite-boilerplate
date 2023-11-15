import { ConfigProvider, Menu } from 'antd';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { FOOTER_HEIGHT, HEADER_HEIGHT, side_items, } from './constants';
import { Summary } from './summary';
import DailyRecords from './daily_records';

const Header = ({ menu, setMenu }) => {
    return <Menu onClick={(e) => setMenu(e.key)} selectedKeys={[menu]} mode="horizontal" items={side_items} style={{ height: HEADER_HEIGHT }} />;
}

const Footer = () => {
    return <div style={{ height: FOOTER_HEIGHT, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Powered By SatLabs</div>;
}

const App = () => {
    const [menu, setMenu] = React.useState('daily');
    return <ConfigProvider
        theme={{
            token: {
                fontFamily: "Figtree",
            },
        }}
    >
        <Header menu={menu} setMenu={setMenu} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: `calc(100vh - ${(HEADER_HEIGHT + FOOTER_HEIGHT)}px)` }}>
            {menu == 'summary' ? <Summary /> : null}
            {menu == 'daily' ? <DailyRecords /> : null}
        </div>
        <Footer />
    </ConfigProvider>
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);


