import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyMultiLineField(props) {
  const { label, placeholder, width, name, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          id="standard-multiline-static"
          sx={{ width: width }}
          label={label}
          multiline
          onChange={onChange}
          value={value}
          rows={1}
          variant="standard"
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}

MyMultiLineField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};
