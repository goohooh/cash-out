import { FC } from "react";
import Expenditure from "../../entity/expenditure";
import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { numFormat } from "../../common/util";

interface ModalProps {
  isShowing: boolean;
  hide: () => void;
  selectedDate: Date | null;
  data: Expenditure[];
}

const Modal: FC<ModalProps> = ({
  isShowing,
  hide,
  data,
  selectedDate,
}) => {
  const total: number = data
    .map(exp => exp.amount)
    .reduce((acc, cur) => (acc += cur), 0);

  return isShowing
    ? (
      <div className={styles.dimmed}>
        <div className={styles.modal}>
          <div className="modal-header flex justify-between align-center">
            <h3 className={styles.title}>
              {selectedDate && format(selectedDate, "M월 d일")}
              비용 출금 정보
            </h3>
            <button className={styles.close} onClick={hide}>
              <FontAwesomeIcon icon="times" size="2x" />
            </button>
          </div>

          <div className={styles.total}>
            <h4>총 출금</h4>
            <strong>{numFormat(total)} 원</strong>
          </div>

          <ul>
            {data.map((exp, i) => {
              return (
                <li key={i}
                    className={styles.item}>
                  <span>{exp.name}</span>
                  <span>
                    {numFormat(exp.amount)} 원
                    <FontAwesomeIcon icon="chevron-right" className="m-left-smallest" />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
    : null;
};

export default Modal;