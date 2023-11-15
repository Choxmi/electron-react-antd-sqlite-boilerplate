import { Card, Col, Input, Row } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import * as React from 'react';
import { GET } from './constants';
import PageLayout from './page_layout';

const DailyRecords = () => {
    const [usersConst, setUsersConst] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);

    React.useEffect(() => {
        fetchUsers();
    }, [date]);

    const fetchUsers = () => {
        GET(`/daily_records/${date}`).then(out => { setUsers(out.data); setUsersConst(out.data); });
    }

    const searchUsers = (value) => {
        const filtered = usersConst.filter(user => {
            let out = false;
            if (user?.name?.toString().toLowerCase().includes(value?.toString().toLowerCase())
                || user?.id?.toString().toLowerCase().includes(value?.toString().toLowerCase())) {
                out = true;
            }
            return out;
        });
        setUsers(filtered);
    }

    const UserItem = ({ user }) => <div style={{ background: '#f0f0f0', padding: 2 }}>
        <Card size='small' bordered={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {user?.id} - {user?.name}
                <CheckCircleFilled style={{ color: '#f0f0f0', fontSize: 18 }} />
            </div>
        </Card>
    </div>

    return <PageLayout>
        <Row style={{ height: '100%' }} gutter={16}>
            <Col md={6} style={{ height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Input.Search allowClear style={{ padding: 10 }} placeholder='Filter users' onSearch={searchUsers} />
                    <div style={{ overflow: 'auto' }}>
                        {users?.map(user => <UserItem user={user} />)}
                    </div>
                </div>
            </Col>
            <Col md={18}>
                dfgdg
            </Col>
        </Row>
    </PageLayout>
}

export default DailyRecords;