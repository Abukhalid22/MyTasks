import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller } from "react-hook-form";

export default function MySelectField(props) {
  const { label, name, control, width, options } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value = "" }, fieldState: { error } }) => (
        <FormControl variant="standard" sx={{ width: width }} error={!!error}>
          <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            onChange={onChange}
            value={value}
          >
            {options.map((option) => (
              <MenuItem key={String(option.id)} value={String(option.id)}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

MySelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
