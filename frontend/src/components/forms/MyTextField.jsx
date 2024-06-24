import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyTextField(props) {
  const { label, width, placeholder, name, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          sx={{ width: width }}
          onChange={onChange}
          value={value}
          id="standard-basic"
          label={label}
          variant="standard"
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}

MyTextField.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};
