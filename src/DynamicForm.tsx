import React, { ChangeEventHandler, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";
import { MyObject } from "./types";
import { setDeep } from "./utils";
import Entries, { Entry } from "./entries/Entries";
import configuration from "./configurationToImplement.json";

type StaticFormProps = {
  object: MyObject;
};

const StaticForm = ({ object }: StaticFormProps): JSX.Element => {
  const [myObject, setMyObject] = useState<MyObject>(object);
  const [savedObject, setSavedObject] = useState<MyObject>();

  const handleInputChange =
    (
      path: string
    ): ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =>
    (event) =>
      setMyObject(setDeep(myObject, path, event.target.value));

  const checkLimits = (value: any, min: number, max: number) => {
    if (value < min) {
      return min;
    }
    if (value > max) {
      return value.slice(0, -1);
    } else {
      return value;
    }
  };

  const handleIntegerChange =
    (
      path: string,
      min: number,
      max: number
    ): ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =>
    (event) =>
      setMyObject(
        setDeep(myObject, path, checkLimits(event.target.value, min, max))
      );

  const onSaveChanges = () => {
    setSavedObject(myObject);
  };

  const deepFind = (myObject: MyObject, path: string) => {
    var paths = path.split("."),
      current = myObject,
      i;

    for (i = 0; i < paths.length; ++i) {
      if (current[paths[i]] === undefined) {
        return undefined;
      } else {
        current = current[paths[i]];
      }
    }
    return current;
  };

  const renderEntries = (configuration: any) => {
    const entriesList: Array<Entry> = [];
    if (configuration?.length > 0) {
      configuration.forEach((entry: Entry) => {
        switch (entry.type) {
          case "textInput":
            const textInputEntry: Entry = {
              required: entry?.required,
              type: entry.type,
              label: entry.label,
              placeholder: entry.defaultValue,
              value: deepFind(myObject, entry.path || ""),
              onChange: handleInputChange(entry.path || ""),
            };
            return entriesList.push(textInputEntry);

          case "enumInput":
            const enumInputEntry: Entry = {
              type: entry.type,
              label: entry.label,
              placeholder: entry.defaultValue,
              values: entry.values,
              value: deepFind(myObject, entry.path || ""),
              onChange: handleInputChange(entry.path || ""),
            };
            return entriesList.push(enumInputEntry);

          case "integerInput":
            const integerInputEntry: Entry = {
              type: entry.type,
              label: entry.label,
              placeholder: entry.defaultValue,
              min: entry.min,
              max: entry.max,
              value: deepFind(myObject, entry.path || ""),
              onChange: handleIntegerChange(
                entry.path || "",
                entry.min || 0,
                entry.max || 0
              ),
            };
            return entriesList.push(integerInputEntry);

          case "currencyInput":
            const currencyInputEntry: Entry = {
              type: entry.type,
              label: entry.label,
              placeholder: entry.defaultValue,
              min: entry.min,
              max: entry.max,
              valueInt: deepFind(
                myObject,
                "".concat(entry.path || "", ".value")
              ),
              valueCurr: deepFind(myObject, entry.path + ".currency" || ""),
              onChangeInt: handleIntegerChange(
                "".concat(entry.path || "", ".value"),
                entry.min || 0,
                entry.max || 0
              ),
              onChangeCurr: handleInputChange(
                "".concat(entry.path || "", ".currency")
              ),
              currencies: entry.currencies,
            };
            return entriesList.push(currencyInputEntry);
          default:
            return null;
        }
      });
    }
    return <Entries entries={entriesList} />;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper variant="elevation" style={{ margin: "10px" }}>
          <Typography variant="h4">Vehicle details</Typography>
          <Grid container alignItems="flex-start" spacing={2} padding={5}>
            {renderEntries(configuration)}
          </Grid>
          <Grid item xs={12}>
            <div style={{ margin: "10px", padding: "10px" }}>
              <Button variant="outlined" onClick={onSaveChanges}>
                Save Changes
              </Button>
            </div>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper variant="elevation" style={{ margin: "10px" }}>
          <Typography variant="h5">Output</Typography>
          <div style={{ textAlign: "left" }}>
            <pre>{JSON.stringify(savedObject, null, 2)}</pre>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StaticForm;
