import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./css/_DatePicker.css"

export default function _DatePicker({date, onDateChange}) {

  return (
    <DatePicker
      selected={date}
      onChange={onDateChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="yyyy-MM-dd"
      placeholderText="욕 먹은 날짜"
    />
  );
};
