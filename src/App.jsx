import { useState, useEffect } from 'react';
import { Searchbar } from './components/searchbar/Searchbar';
import { ImageGallery } from './components/imageGallery/ImageGallery';
import { Modal } from './components/modal/Modal';
import { Button } from './components/button/Button';
import { Loader } from './components/loader/Loader';
import { ApiService } from './services/api';

const api = new ApiService();

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [largeImgUrl, setLargeImgUrl] = useState('');
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.query = searchQuery;

        const onFetchImg = async () => {
            setLoading(true);
            try {
                const newImages = await api.fetchImg();
                setImages(
                    newImages.map(({ id, webformatURL, largeImageURL }) => ({
                        id,
                        webformatURL,
                        largeImageURL,
                    })),
                );
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (!searchQuery) {
            return;
        }
        if (error) {
            return;
        }

        setImages([]);
        onFetchImg();
    }, [error, searchQuery]);

    useEffect(() => {
        const onLoadImg = async () => {
            setLoading(true);
            try {
                const newImages = await api.fetchImg();
                setImages(prevState => [
                    ...prevState,
                    ...newImages.map(({ id, webformatURL, largeImageURL }) => ({
                        id,
                        webformatURL,
                        largeImageURL,
                    })),
                ]);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (page === 1) {
            return;
        }
        onLoadImg();
    }, [page]);

    const onSubmitSearchForm = newSearchQuery => {
        api.resetPage();
        setSearchQuery(newSearchQuery);
    };

    const onModalOpen = () => {
        setShowModal(!showModal);
    };

    const onImgClick = event => {
        setLargeImgUrl(images.find(image => image.webformatURL === event.target.src).largeImageURL);
    };

    const onLoadMoreBtnClick = () => {
        const nextPage = page + 1;
        setPage(nextPage);
    };

    return (
        <>
            <Searchbar onSubmit={onSubmitSearchForm} />
            <ImageGallery images={images} onModalOpen={onModalOpen} onImgClick={onImgClick} />
            {showModal && <Modal onModalOpen={onModalOpen} largeImageURL={largeImgUrl} />}
            {loading && <Loader />}
            {images.length >= 12 && <Button loadMoreBtn={onLoadMoreBtnClick} />}
        </>
    );
};

export default App;
