import { Calendar, Badge, List, Button, Modal, Form, Input, DatePicker, TimePicker } from "antd";
import { useState } from "react";
import scheduleServices from "../static_data_for_test/ScheduleData";

// 初始化 scheduleServices 数据
const initialScheduleServices = [
  scheduleServices[0],
  scheduleServices[1],
  scheduleServices[2],
  scheduleServices[3],
];

function My_Calendar() {
  const [scheduleServices, setScheduleServices] = useState(initialScheduleServices); // 使用 useState 管理 scheduleServices
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 定义一个函数dateCellRender，用于渲染日期单元格
  function dateCellRender(value) {
    const formattedDate = value.format("YYYY-MM-DD");
    const listData = scheduleServices.filter(
      service => service.date === formattedDate
    );
    // 如果有服务，返回一个List组件，展示服务信息
    if (listData.length > 0) {
      return (
        <List
          size="small"
          dataSource={listData}
          renderItem={item => (
            <List.Item>
              {/* 使用Badge组件展示服务时间和标题 */}
              <Badge status="success" text={`${item.time} - ${item.title}`} />
            </List.Item>
          )}
        />
      );
    }
  }

  // 打开对话框
  const showModal = () => {
    setIsModalVisible(true);
  };

  // 处理对话框的提交
  const handleOk = () => {
    form.validateFields().then(values => {
      // 新的服务数据
      const newService = {
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm") + "-" + values.time.add(1, 'hour').format("HH:mm"), // 假设服务时长为1小时
        title: values.title,
      };

      // 更新 scheduleServices 状态
      setScheduleServices([...scheduleServices, newService]);

      // 重置表单
      form.resetFields();
      // 关闭对话框
      setIsModalVisible(false);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  // 处理对话框的取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //禁用非工作时间
  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      if (i < 7 || i > 17) {
        hours.push(i);
      }
    }
    return hours;
  }

  //禁用周日
  const disabledDate = (current) => {
    return current && current.day() === 0;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          {/* 可以在这里添加其他内容，比如标题 */}
        </div>
        <Button type="primary" onClick={showModal} style={{backgroundColor:'orange', borderColor: 'orange'}}>
          Schedule Service
        </Button>
      </div>
      
      {/* 日历组件 */}
      <Calendar dateCellRender={dateCellRender} />

      {/* 预约服务的模态框 */}
      <Modal
        title="Schedule a Service"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="date"
            label="Select Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item
            name="time"
            label="Select Time"
            rules={[{ required: true, message: 'Please select a time' }]}
          >
            <TimePicker style={{ width: '100%' }} disabledHours={disabledHours} />
          </Form.Item>
          <Form.Item
            name="title"
            label="Service Title"
            rules={[{ required: true, message: 'Please input the service title' }]}
          >
            <Input placeholder="Enter service title" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default My_Calendar;
