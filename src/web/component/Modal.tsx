import { FC } from "react";
import styles from "./Modal.module.css";
import Expenditure from "../../entity/expenditure";

interface ModalProps {
    isShowing: boolean;
    hide: () => void;
    data: Expenditure[];
}

const Modal: FC<ModalProps> = ({ isShowing, hide, data }) => {
  return isShowing
    ? (
      <div className={styles.dimmed}>
        <div className={styles.modal}>
          <div className="modal-header">
            <h3>비용 출금 정보</h3>
            <button onClick={hide}>X</button>
          </div>
          <ul>
            {data.map((exp, i) => {
              return (
                <li key={i}>{exp.name} {exp.amount}</li>
              );
            })}
          </ul>
          <div>{data.map(exp => exp.amount).reduce((acc, cur) => (acc += cur), 0)}원</div>
          </div>
      </div>
    )
    : null;
};

export default Modal;