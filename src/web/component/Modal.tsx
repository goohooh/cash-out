import { FC } from "react";
import Expenditure from "../../entity/expenditure";
import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalProps {
  isShowing: boolean;
  hide: () => void;
  data: Expenditure[];
}

const Modal: FC<ModalProps> = ({ isShowing, hide, data }) => {
  const total: number = data
    .map(exp => exp.amount)
    .reduce((acc, cur) => (acc += cur), 0);

  return isShowing
    ? (
      <div className={styles.dimmed}>
        <div className={styles.modal}>
          <div className="modal-header flex justify-between align-center">
            <h3 className={styles.title}>비용 출금 정보</h3>
            <button className={styles.close} onClick={hide}>
              <FontAwesomeIcon icon="times" size="2x" />
            </button>
          </div>

          <div className={styles.total}>
            <h4>총 출금</h4>
            <strong>{total} 원</strong>
          </div>

          <ul>
            {data.map((exp, i) => {
              return (
                <li key={i}
                    className={styles.item}>
                  <span>{exp.name}</span>
                  <span>
                    {exp.amount} 원
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