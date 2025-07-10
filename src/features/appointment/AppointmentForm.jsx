import React, { useEffect, useState } from 'react';
import { User, Phone, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { message, Button, Select, DatePicker, Input, Radio, Form } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

export default function AppointmentPage() {
  const [doctors, setDoctors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);

  // Form instance from antd
  const [form] = Form.useForm();

  // Load doctors on mount
  useEffect(() => {
    setLoadingDoctors(true);
    fetch('http://localhost:8080/api/doctors')
      .then(res => {
        if (!res.ok) throw new Error('Không lấy được danh sách bác sĩ');
        return res.json();
      })
      .then(data => {
        console.log('doctors data:', data);
        setDoctors(data.content || []);
        setLoadingDoctors(false);
      })
      .catch(err => {
        message.error(err.message);
        setLoadingDoctors(false);
      });
  }, []);

  // Load available times when doctor or date changes
  const onDoctorOrDateChange = (doctorId, date) => {
    if (!doctorId || !date) {
      setAvailableTimes([]);
      return;
    }
    setLoadingTimes(true);
    const dateStr = date.format('YYYY-MM-DD');
    fetch(`http://localhost:8080/api/schedules/available?doctorId=${doctorId}&date=${dateStr}`)
      .then(res => {
        if (!res.ok) throw new Error('Không lấy được giờ trống');
        return res.json();
      })
      .then(data => {
        // data expected to be an array of schedules with startTime ISO strings
        const times = data.map(s => dayjs(s.startTime).format('HH:mm'));
        setAvailableTimes(times);
        setLoadingTimes(false);
      })
      .catch(err => {
        message.error(err.message);
        setLoadingTimes(false);
      });
  };

  // Handle form submit
  const onFinish = (values) => {
    if (!values.time) {
      message.error('Vui lòng chọn giờ khám');
      return;
    }
    // Prepare appointmentDate = date + time
    const appointmentDate = dayjs(values.date.format('YYYY-MM-DD') + 'T' + values.time + ':00').toISOString();

    const payload = {
      fullName: values.fullName,
      phone: values.phone,
      doctorId: values.doctor,
      serviceId: values.serviceId,  // giả sử bạn chọn serviceId cứng hoặc từ select
      appointmentDate: appointmentDate,
      appointmentType: values.appointmentType,
      status: 'PENDING',
      gender: values.gender,
      description: values.description || '',
    };

    fetch('http://localhost:8080/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.message || 'Lỗi tạo lịch hẹn');
          });
        }
        return res.json();
      })
      .then(data => {
        message.success('Đặt lịch thành công!');
        form.resetFields();
        setAvailableTimes([]);
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Đặt lịch khám</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          appointmentType: 'FIRST_VISIT',
          gender: 'MALE',
        }}
      >
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
        >
          <Input prefix={<User size={18} />} placeholder="Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            { pattern: /^[0-9]{9,15}$/, message: 'Số điện thoại không hợp lệ' },
          ]}
        >
          <Input prefix={<Phone size={18} />} placeholder="0912345678" />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
        >
          <Radio.Group>
            <Radio value="MALE">Nam</Radio>
            <Radio value="FEMALE">Nữ</Radio>
            <Radio value="OTHER">Khác</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Bác sĩ"
          name="doctor"
          rules={[{ required: true, message: 'Vui lòng chọn bác sĩ' }]}
        >
          <Select
            placeholder={loadingDoctors ? 'Đang tải...' : 'Chọn bác sĩ'}
            loading={loadingDoctors}
            onChange={(value) => {
              const date = form.getFieldValue('date');
              onDoctorOrDateChange(value, date);
            }}
            showSearch
            optionFilterProp="children"
          >
            {doctors.map((doc) => (
              <Option key={doc.id} value={doc.id}>
                {doc.fullName} - {doc.specialization}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ngày khám"
          name="date"
          rules={[{ required: true, message: 'Vui lòng chọn ngày khám' }]}
        >
          <DatePicker
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            onChange={(date) => {
              const doctorId = form.getFieldValue('doctor');
              onDoctorOrDateChange(doctorId, date);
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Giờ khám"
          name="time"
          rules={[{ required: true, message: 'Vui lòng chọn giờ khám' }]}
        >
          <Select
            placeholder={loadingTimes ? 'Đang tải...' : 'Chọn giờ khám'}
            loading={loadingTimes}
            disabled={availableTimes.length === 0}
            showSearch
            optionFilterProp="children"
          >
            {availableTimes.map((time) => (
              <Option key={time} value={time}>
                {time}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Loại lịch khám"
          name="appointmentType"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="FIRST_VISIT">Khám lần đầu</Option>
            <Option value="FOLLOW_UP">Tái khám</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả (tùy chọn)"
          name="description"
        >
          <Input.TextArea rows={3} placeholder="Ghi chú thêm..." />
        </Form.Item>

        {/* Giả sử serviceId cố định, ví dụ 1 */}
        <Form.Item name="serviceId" initialValue={1} hidden>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block icon={<CheckCircle size={18} />}>
            Đặt lịch
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
