import React, { useState } from "react";
import { Table, Checkbox, Box } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

interface TableColumn<T> {
  label: string;
  key: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selected: T[]) => void;
  isAction?: boolean;
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

const DataTable = <T extends object>({
  columns,
  data,
  onRowClick,
  onSelectionChange,
  isAction,
}: TableProps<T>) => {
  const [selected, setSelected] = useState<T[]>([]);

  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleSelectionChange = (row: T, isSelected: boolean) => {
    setSelected((prevSelected) =>
      isSelected
        ? [...prevSelected, row]
        : prevSelected.filter((selectedRow) => selectedRow !== row)
    );

    if (onSelectionChange) {
      onSelectionChange(
        isSelected
          ? [...selected, row]
          : selected.filter((selectedRow) => selectedRow !== row)
      );
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    setSelected(isSelected ? data : []);

    if (onSelectionChange) {
      onSelectionChange(isSelected ? data : []);
    }
  };

  return (
    <Table
      stickyHeader
      hoverRow
      sx={{
        "--TableCell-headBackground": "var(--joy-palette-background-level1)",
        "--Table-headerUnderlineThickness": "1px",
        "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
        "--TableCell-paddingY": "4px",
        "--TableCell-paddingX": "8px",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              width: 40,
              textAlign: "center",
              padding: "12px 6px",
            }}
          >
            <Checkbox
              size="sm"
              indeterminate={
                selected.length > 0 && selected.length !== data.length
              }
              checked={selected.length === data.length}
              onChange={handleSelectAll}
              color={
                selected.length > 0 || selected.length === data.length
                  ? "primary"
                  : undefined
              }
              sx={{ verticalAlign: "text-bottom" }}
            />
          </th>
          {columns.map((column) => (
            <th
              key={column.key}
              style={{
                width: column.width,
                padding: "12px 6px",
                textAlign: column.align || "left",
              }}
            >
              {column.label}
            </th>
          ))}
          {isAction && (
            <th style={{ width: 50, padding: "12px 6px" }}>ACTION</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any) => (
          <Box
            component="tr"
            key={row._id}
            onClick={() => handleRowClick(row)}
            sx={{
              cursor: "pointer",
            }}
          >
            <td
              style={{
                textAlign: "center",
                width: 120,
                paddingBottom: "10px",
                paddingTop: "10px",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <Checkbox
                size="sm"
                checked={selected.includes(row)}
                color={selected.includes(row) ? "primary" : undefined}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) =>
                  handleSelectionChange(row, event.target.checked)
                }
                slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                sx={{ verticalAlign: "text-bottom" }}
              />
            </td>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render
                  ? column.render(row[column.key], row)
                  : row[column.key]}
              </td>
            ))}

            {isAction && (
              <td
                style={{ textAlign: "center", width: 120 }}
                onClick={(event) => event.stopPropagation()}
              >
                <RowMenu />
              </td>
            )}
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
