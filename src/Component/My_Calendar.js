import { Calendar,Badge,List } from "antd";
import scheduleServices from "../static_data_for_test/ScheduleData";
function My_Calendar() {
  
//定义一个函数dateCellRender，用于渲染日期单元格
  function dateCellRender(value) {
    const formattedDate = value.format("YYYY-MM-DD");
    const listData = scheduleServices.filter(
      service => service.date === formattedDate
    );
    //如果有服务，返回一个List组件，展示服务信息
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

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} />
    </div> 
  );
}

export default My_Calendar;