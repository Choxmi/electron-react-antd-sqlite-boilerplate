import { ConfigProvider, Menu } from 'antd';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { side_items } from './constants';
import { AppHome } from './home';

const Header = ({ menu, setMenu }) => {
    return <Menu onClick={(e) => setMenu(e.key)} selectedKeys={[menu]} mode="horizontal" items={side_items} />;
}

const App = () => {
    const [menu, setMenu] = React.useState();
    return <ConfigProvider
        theme={{
            token: {
                fontFamily: "Figtree",
            },
        }}
    >
        <Header menu={menu} setMenu={setMenu} />
        {menu == 'summary' ? <AppHome /> : null}
    </ConfigProvider>
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);


