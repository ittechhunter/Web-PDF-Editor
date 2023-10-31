import * as React from "react";
import { PartialObjects } from "@/lib/graphql-zeus";
import { ColumnComponent } from "./ColumnComponent";
import { View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
export interface ColumnsComponentProps {
  columns: PartialObjects["Columns"];
  widths: string[];
  border?: boolean;
  version: string;
}

export const ColumnsComponent = ({
  columns,
  widths,
  border,
  version
}: ColumnsComponentProps) => {
  const styleJSON = columns.styleJson ? JSON.parse(columns.styleJson) : {};
  let style: Style = {
    ...styleJSON,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    alignContent: "stretch"
  };
  if (border) {
    style = {
      ...style,
      borderBottomColor: `#444444`,
      borderBottomWidth: 0.25,
      borderBottomStyle: `solid`
    };
  }
  return (
    <View style={style}>
      {columns.columns!.map((c, i) => {
        const flexBasis = widths[i]!;
        return (
          <ColumnComponent
            version={version}
            border={border}
            key={i}
            column={c}
            flexBasis={flexBasis}
          />
        );
      })}
    </View>
  );
};
