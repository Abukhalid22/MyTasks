import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

export default function MyDatePickerField(props) {
  const { label, control, width, name } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            label={label}
            sx={{ width: width }}
            onChange={onChange}
            value={value}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

MyDatePickerField.propTypes = {
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
