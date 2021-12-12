import React from "react";
import { Input, InputProps } from "antd";

import styles from "./search.module.css";

import { ReactComponent as SearchIcon } from "&assets/images/ic-search.svg";

const TableSearchBar = (props: InputProps) => (
  <Input className={styles.tablesearchbar} prefix={<SearchIcon />} {...props} />
);

export { TableSearchBar };
