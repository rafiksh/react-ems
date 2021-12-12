import React from "react";
import { Input } from "antd";
import { InputProps } from "antd/lib/input";

import styles from "./input.module.css";

const InputText = (props: InputProps) => (
  <Input className={styles.text} {...props} />
);

export { InputText };
