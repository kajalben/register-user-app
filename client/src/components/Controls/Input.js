import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, value, label, onChange, error=null, ...other } = props;
  return (
        <TextField
          required
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          color="primary"
          {...(error && {error:true, helperText: error})}
          {...other}
        />
  );
}
