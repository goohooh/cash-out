import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { numFormat } from "../../common/util";
import styles from "./CategoryBox.module.css";

interface CategoryBoxProps {
  label: string;
  color?: string;
  amount: number;
  unchecked: boolean;
}

const UNCHECKED_COLOR = "#CCC";

const CategoryBox = ({ color = "inherit", label, amount, unchecked }: CategoryBoxProps) => {
  return (
    <div className={styles.box}>
      <div>
        <FontAwesomeIcon icon={ unchecked ? ["far", "square"] : "check-square"}
                         style={{ color: unchecked ? UNCHECKED_COLOR : color }}
                         className="m-right-smallest" />
        <span style={{ color: unchecked ? UNCHECKED_COLOR : "inherit" }}>
        {label}
      </span>
      </div>
      <strong style={{ color: unchecked ? UNCHECKED_COLOR : color }}>
        {numFormat(amount)}원
      </strong>
    </div>
  );
}

export default CategoryBox;
