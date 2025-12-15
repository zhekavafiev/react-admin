import { useState, useEffect } from "react";
import { fetchSessionStart, fetchLike, fetchDislike } from "./swipeService";
import type {ProductResponse, ProgressResponse} from "./types";
import './game.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Game() {
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [progress, setProgress] = useState<ProgressResponse | null>(null);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);


    const handleStart = async () => {
        const data = await fetchSessionStart();
        setProduct(data.product);
        setSessionId(data.sessionId)
        setProgress(data.progress)
    };

    const handleLike = async () => {
        setSwipeDirection('right');

        setTimeout(async () => {
            const data = await fetchLike(sessionId, product.id, progress.current);
            setProduct(data.product);
            setSessionId(data.sessionId);
            setProgress(data.progress);
            setSwipeDirection(null);
        }, 400)
    }

    const handleDislike = async () => {
        setSwipeDirection('left');

        setTimeout(async () => {
            const data = await fetchDislike(sessionId, product.id, progress.current);
            setProduct(data.product);
            setSessionId(data.sessionId);
            setProgress(data.progress);
            setSwipeDirection(null);
        }, 400);
    };


    let progressFinished = progress === null ? false : progress.current >= progress.total
    console.log(progress)
    console.log(progressFinished)

    if (!product) {
        return (
            <div className={'container'}>
                <button className={'startButton'} onClick={handleStart}>
                    Начать подбор
                </button>
            </div>
        );
    }

    return (
        <div className={'container'}>
            <div className={`card ${swipeDirection === 'left' ? 'swipeLeft' : ''} ${swipeDirection === 'right' ? 'swipeRight' : ''}`}>
                <ProductCard product={product} />

                <div className={'buttons'}>
                    <button
                        className={`${'button'} ${'dislikeButton'}`}
                        onClick={handleDislike}
                        disabled={progressFinished || swipeDirection !== null}
                    >
                        ×
                    </button>
                    <button
                        className={`${'button'} ${'likeButton'}`}
                        onClick={handleLike}
                        disabled={progressFinished || swipeDirection !== null}
                    >
                        ♥
                    </button>
                </div>

                <div className={'progressContainer'}>
                    <p className={'progressText'}>
                        {progress.current} / {progress.total}
                    </p>
                    <ProgressBar
                        now={(progress.current / progress.total) * 100}
                        className={'progressBar'}
                    />
                </div>

                {(progress.hasEnoughInformation || progressFinished) && <a
                    href={`http://localhost:8088/catalog/kole?session=${sessionId}`}
                    className={'catalogLink'}
                    target="_blank"
                >
                    перейти в каталог →
                </a>}
            </div>
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    const startImage = product.frontImageUrl ?? product.onModelImageUrl;
    const secondImage = product.onModelImageUrl ?? product.frontImageUrl;

    const [image, setImage] = useState<string>(startImage);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setImage(product.frontImageUrl);
        setIsHovered(false);
    }, [product.frontImageUrl]);

    const mouseIn = () => {
        setIsHovered(true);
        setImage(secondImage);
    };

    const mouseOut = () => {
        setIsHovered(false);
        setImage(startImage);
    };

    return (
        <>
            <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={'productImageWrapper'}
                onMouseEnter={mouseIn}
                onMouseLeave={mouseOut}
            >
            <img
                src={startImage}
                alt={product.name}
                className={`productImage ${isHovered ? 'fadeOut' : ''}`}
            />
            <img
                src={secondImage}
                alt={product.name}
                className={`productImage productImageOverlay ${isHovered ? 'fadeIn' : ''}`}
            />
            </a>
        <h3 className={'productName'}>{product.name}</h3>
        <h3 className={'productName'}>{product.designer}</h3>
        <p className={'productPrice'}>{product.price.toLocaleString('ru-RU')} ₽</p>
    </>
);
}

export default Game;