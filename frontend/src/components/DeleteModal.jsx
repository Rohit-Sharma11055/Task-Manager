import { HiExclamation } from "react-icons/hi";

import styles from "../constants/styles";

const DeleteModal = ({
    onClose,
    onConfirm,
    loading,
}) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.deleteModal}>
                <div className={styles.deleteIcon}>
                    <HiExclamation />
                </div>

                <h2 className={styles.modalTitle}>
                    Delete Task?
                </h2>

                <p className={styles.deleteText}>
                    Are you sure you want to delete this
                    task? This action cannot be undone.
                </p>

                <div className={styles.modalActions}>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className={styles.secondaryButton}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={styles.deleteConfirmButton}
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;