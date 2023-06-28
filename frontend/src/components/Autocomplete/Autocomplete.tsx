import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import MuiAutocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Option {
  id: number;
  name: string;
}

interface Props {
  options: Option[];
  defaultValue?: Option[];
  label: string;
  placeholder: string;
  onChange: (options: Option[]) => void;
}

const Autocomplete = ({
  options,
  defaultValue,
  label,
  placeholder,
  onChange,
}: Props) => {
  return (
    <MuiAutocomplete
      multiple
      options={options}
      disableCloseOnSelect
      defaultValue={defaultValue}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(event, values) => onChange(values)}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.id}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: 400 }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
};

export default Autocomplete;
