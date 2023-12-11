import * as React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import { Grid } from "@mui/material";
import { Label } from "../entries/Entries.css";

type EntriesProps = {
  entries: Array<Entry>;
};

export interface Entry {
  type: EntryTypes;
  label?: string;
  path?: string;
  required?: boolean;
  defaultValue?: string;
  values?: Array<string>;
  min?: number;
  max?: number;
  currencies?: Array<string>;

  placeholder?: string;
  value?: any;
  valueInt?: any;
  valueCurr?: any;

  onChange?: any;
  onChangeCurr?: any;
  onChangeInt?: any;
}

export enum EntryTypes {
  textInput = "textInput",
  enumInput = "enumInput",
  integerInput = "integerInput",
  currencyInput = "currencyInput",
  dropdown = "dropdownSingle",
  textArea = "textArea",
}

const Entries = (props: EntriesProps) => {
  const styles = {
    entry: {
      padding: "15px",
    },
    label: {
      marginRight: "10px",
    },
    currency: {
      marginRight: "10px",
    },
  };

  const entriesToRender =
    props.entries?.length &&
    props.entries.map((entry, index) => {
      const key = `entry_${entry?.placeholder || entry?.label}_${index}`;
      switch (entry?.type) {
        case EntryTypes.textInput:
          return (
            <Grid item xs={12} key={key} sx={styles.entry}>
              <Label>{entry.label}</Label>
              <Input
                placeholder={entry.defaultValue || ""}
                value={
                  entry.value !== null && entry.value !== undefined
                    ? entry.value
                    : ""
                }
                onChange={entry.onChange}
              />
            </Grid>
          );
        case EntryTypes.enumInput:
          return (
            <Grid item xs={12} key={key} sx={styles.entry}>
              <Label>{entry.label}</Label>
              <Select
                placeholder={entry.placeholder}
                onChange={entry.onChange}
                value={entry.value === "" ? undefined : entry.value}
              >
                {entry?.values?.map((item: string, index: number) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          );
        // since the NumberInput is unstable on the beta 5 version of MUI, I have written my own component
        case EntryTypes.integerInput:
          console.log("ENTRY", entry);
          return (
            <Grid item xs={12} key={key} sx={styles.entry}>
              <Label>{entry.label}</Label>
              <input
                style={{ width: "50px" }}
                type="number"
                min={entry && entry?.min}
                max={entry && entry?.max}
                placeholder={entry.defaultValue || ""}
                value={
                  entry.value !== null && entry.value !== undefined
                    ? entry.value
                    : ""
                }
                onChange={entry.onChange}
              />
            </Grid>
          );
        case EntryTypes.currencyInput:
          return (
            <Grid item xs={12} key={key} sx={styles.entry}>
              <Label>{entry.label}</Label>
              <Select
                sx={styles.currency}
                onChange={entry.onChangeCurr}
                value={entry.valueCurr == "" ? undefined : entry.valueCurr}
              >
                {entry?.currencies?.map((item: string, index: number) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <input
                style={{ width: "100px" }}
                type="number"
                min={entry.min}
                max={entry.max}
                value={
                  entry.valueInt !== null && entry.valueInt !== undefined
                    ? entry.valueInt
                    : ""
                }
                onChange={entry.onChangeInt}
              />
            </Grid>
          );
        default:
          return <span key={key}>{entry.label}</span>;
      }
    });

  return <div>{entriesToRender}</div>;
};

export default Entries;
