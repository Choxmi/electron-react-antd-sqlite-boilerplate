import { Button, Card, Col, DatePicker, Divider, Form, Input, Row, Space, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import * as React from 'react';
import { GET } from './constants';
import PageLayout from './page_layout';
import dayjs from 'dayjs';

const DailyRecords = () => {
    const [form] = Form.useForm();
    const [usersConst, setUsersConst] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [date, setDate] = React.useState(dayjs());
    const [selectedUser, setSelectedUser] = React.useState(null);

    const weightRef = React.useRef(null);

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
        if (weightRef) {
            weightRef.current.focus();
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

    const onSubmit = (values) => {
        console.log('Success:', values);
    };

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
                <Row><Col md={9}></Col><Col md={6}><DatePicker style={{ width: '100%', marginBottom: 50 }} defaultValue={date} onChange={setDate} /><Col md={9}></Col></Col></Row>
                <Form form={form} layout="vertical" initialValues={selectedUser} onFinish={onSubmit}>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={16}>
                            <Row gutter={16}>
                                <Col md={6}>
                                    <Form.Item label="Member ID" name="id" >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col md={12}>
                                    <Form.Item label="Name" name="name">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="NIC" name="nic">
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col md={4}>
                                </Col>
                                <Col md={16}>
                                    <Form.Item label="Gross Weight" name="grossWeight">
                                        <Input type='number' size='large' ref={weightRef} />
                                    </Form.Item>
                                </Col>
                                <Col md={4}>
                                </Col>
                            </Row>
                            <Divider orientation='left'>Additionals</Divider>
                            <Row gutter={16}>
                                <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography.Text>Advanced Payments</Typography.Text>
                                </Col>
                                <Col md={18}>
                                    <Form.Item label="Amount" name="add0_amount">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography.Text>Fertilizer/25kg</Typography.Text>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Units" name="add1_units">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Unit price" name="add1_unit_price">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Amount" name="add1_amount">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography.Text>Herbicides/Bottle</Typography.Text>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Units" name="add2_units">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Unit price" name="add2_unit_price">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Amount" name="add2_amount">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography.Text>Dolomite/Pkt</Typography.Text>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Units" name="add3_units">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Unit price" name="add3_unit_price">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Amount" name="add3_amount">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography.Text>Leaf tea packet/Pkt</Typography.Text>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Units" name="add4_units">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Unit price" name="add4_unit_price">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Amount" name="add4_amount">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography.Text>Other</Typography.Text>
                                </Col>
                                <Col md={6}>
                                    <Form.Item label="Units" name="add4_units">
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col md={12}>
                                    <Form.Item label="Unit price" name="add4_unit_price">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button type="primary" htmlType="submit" style={{ background: '#1677ff', color: 'white' }}>Save</Button>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </PageLayout>
}

export default DailyRecords;