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
                    >
                        ×
                    </button>
                    <button
                        className={`${'button'} ${'likeButton'}`}
                        onClick={handleLike}
                    >
                        ♥
                    </button>
                </div>

                <p className={'progress'}>
                    {progress.current} / {progress.total}
                </p>

                {progress.hasEnoughInformation && <a
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
            <img
                src={product.imageUrl}
                alt={product.name}
                className={'productImage'}
            />
            <h3 className={'productName'}>{product.name}</h3>
            <h3 className={'productName'}>{product.designer}</h3>
            <p className={'productPrice'}>{product.price.toLocaleString('ru-RU')} ₽</p>
        </>
    );
}

export default Game;