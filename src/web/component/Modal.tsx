import { FC } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    isShowing: boolean;
    hide: () => void;
}

const Modal: FC<ModalProps> = ({ isShowing, hide }) => {
    return isShowing
        ? (
            <div className={styles.dimmed}>
                <div className={styles.modal}>
                    <div className="modal-header">
                        <h3>비용 출금 정보</h3>
                        <button onClick={hide}>X</button>
                    </div>
                </div>
            </div>
        )
        : null;
};

export default Modal;