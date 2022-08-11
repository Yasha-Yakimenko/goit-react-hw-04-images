import PropTypes from 'prop-types';
import { useEffect } from 'react';
import style from './Modal.module.css';

export const Modal = ({ largeImageURL, onModalOpen }) => {
    useEffect(() => {
        const onEscModalClose = event => {
            if (event.code === 'Escape') {
                onModalOpen();
            }
        };
        window.addEventListener('keydown', onEscModalClose);

        return () => {
            window.removeEventListener('keydown', onEscModalClose);
        };
    }, [onModalOpen]);

    const onBackdropModalClose = event => {
        if (event.target === event.currentTarget) {
            onModalOpen();
        }
    };

    return (
        <div className={style.overlay} onClick={onBackdropModalClose}>
            <div className={style.modal}>
                <img className={style.modalImg} src={largeImageURL} alt="" />
            </div>
        </div>
    );
};

Modal.propTypes = {
    onModalOpen: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};
