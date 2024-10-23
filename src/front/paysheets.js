import { Card, Col, DatePicker, Form, Input, Row } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import * as React from 'react';
import { GET } from './constants';
import PageLayout from './page_layout';
import dayjs from 'dayjs';
import PaySlip from './components/PaySlip';

const PaySheets = () => {
    const [form] = Form.useForm();
    const [usersConst, setUsersConst] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [date, setDate] = React.useState(dayjs());
    const [selectedUser, setSelectedUser] = React.useState(null);

    React.useEffect(() => {
        fetchUsers();
    }, [date]);

    React.useEffect(() => {
        if (selectedUser) {
            for (const [key, value] of Object.entries(selectedUser)) {
                form.setFieldValue(key, value);
            }
        } else {
            form.resetFields();
        }
    }, [selectedUser]);

    const fetchUsers = () => {
        if (date) {
            GET(`/daily_records/${date.format('YYYY-MM-DD')}`).then(out => { setUsers(out.data); setUsersConst(out.data); });
        }
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

    const UserItem = ({ user }) => <div style={{ background: '#f0f0f0', padding: 2, cursor: 'pointer' }}
        onClick={() => (user?.id == selectedUser?.id) ? setSelectedUser(null) : setSelectedUser(user)}>
        <Card size='small' bordered={false} style={{ background: (user?.id == selectedUser?.id) ? '#d7ffeb' : 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {user?.id} - {user?.name}
                <CheckCircleFilled style={{ color: user?.grossWeight == null ? '#f0f0f0' : 'green', fontSize: 18 }} />
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
                <Row><Col md={9}></Col>
                    <Col md={6}>
                        <DatePicker picker='month' style={{ width: '100%', marginBottom: 50 }}
                            defaultValue={dayjs().subtract(1, 'month')} onChange={setDate}
                            disabledDate={d => { const dd = new Date(); return d.isAfter(new Date(`${dd.getFullYear()}-${dd.getMonth() + 1}-01`)) }} />
                    </Col>
                </Row>
                <div style={{ height: 680, overflow: 'auto' }}>
                    <PaySlip />
                    <PaySlip />
                    <PaySlip />
                    <PaySlip />
                    <PaySlip />
                </div>
            </Col>
        </Row>
    </PageLayout>
}

export default PaySheets;