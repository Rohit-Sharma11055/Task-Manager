import {
    HiChevronLeft,
    HiChevronRight,
} from "react-icons/hi";

import styles from "../constants/styles";

const TaskPagination = ({
    pagination,
    setFilters,
}) => {
    const { page, totalPages } = pagination;

    if (totalPages <= 1) {
        return null;
    }

    const handlePrevious = () => {
        if (page <= 1) return;

        setFilters((prev) => ({
            ...prev,
            page: page - 1,
        }));
    };

    const handleNext = () => {
        if (page >= totalPages) return;

        setFilters((prev) => ({
            ...prev,
            page: page + 1,
        }));
    };

    return (
        <div className={styles.pagination}>
            <button
                type="button"
                onClick={handlePrevious}
                disabled={page === 1}
                className={styles.paginationButton}
            >
                <HiChevronLeft />
                Previous
            </button>

            <span className={styles.paginationInfo}>
                Page {page} of {totalPages}
            </span>

            <button
                type="button"
                onClick={handleNext}
                disabled={page === totalPages}
                className={styles.paginationButton}
            >
                Next
                <HiChevronRight />
            </button>
        </div>
    );
};

export default TaskPagination;