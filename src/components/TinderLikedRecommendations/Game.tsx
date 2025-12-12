import { useState } from "react";
import { fetchSessionStart, fetchLike, fetchDislike } from "./swipeService";
import type {ProductResponse, ProgressResponse} from "./types";
import './game.css';

function Game() {
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [progress, setProgress] = useState<ProgressResponse | null>(null);

    const handleStart = async () => {
        const data = await fetchSessionStart();
        setProduct(data.product);
        setSessionId(data.sessionId)
        setProgress(data.progress)
    };

    const handleLike = async () => {
        const data = await fetchLike(sessionId, product.id, progress.current);
        setProduct(data.product);
        setSessionId(data.sessionId)
        setProgress(data.progress)
    };

    const handleDislike = async () => {
        const data = await fetchDislike(sessionId, product.id, progress.current);
        setProduct(data.product);
        setSessionId(data.sessionId)
        setProgress(data.progress)
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
            <div className={'card'}>
                <ProductCard product={product} />

                <div className={'buttons'}>
                    <button
                        className={`${'button'} ${'dislikeButton'}`}
                        onClick={handleDislike}
                        disabled={progressFinished}
                    >
                        ×
                    </button>
                    <button
                        className={`${'button'} ${'likeButton'}`}
                        onClick={handleLike}
                        disabled={progressFinished}
                    >
                        ♥
                    </button>
                </div>

                <p className={'progress'}>
                    {progress.current} / {progress.total}
                </p>

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
    return (
        <>
            <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={'productImage'}
                />
            </a>
            <h3 className={'productName'}>{product.name}</h3>
            <h3 className={'productName'}>{product.designer}</h3>
            <p className={'productPrice'}>{product.price.toLocaleString('ru-RU')} ₽</p>
        </>
    );
}

export default Game;