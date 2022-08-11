import PropTypes from 'prop-types';
import { useState } from 'react';
import style from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        if (value.trim() === '') {
            return;
        }
        onSubmit(value);
    };

    const handleChange = event => {
        setValue(event.currentTarget.value);
    };

    return (
        <header className={style.searchbar}>
            <form className={style.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={style.searchFormBtn}>
                    <span className={style.searchFormBtnLabel}>Search</span>
                </button>

                <input
                    className={style.searchFormInput}
                    onChange={handleChange}
                    value={value}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
