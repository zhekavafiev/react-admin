import './FailedEventsPage.css'
import {useState} from "react";
import { updateFailedEventComment} from "../services/orderService.tsx";


interface FailedEventCommentModalProps {
    processId: string
    comment: string
    setIsCommentModalOpen: (value: boolean) => void
    onCommentSaved: () => void
}

function FailedEventCommentModal({processId, comment, setIsCommentModalOpen, onCommentSaved}: FailedEventCommentModalProps) {
    const MAX_COMMENT_LENGTH = 1000

    const [editableComment, setEditableComment] = useState<string>(comment || '')
    const currentLength = editableComment.length
    const isOverLimit = currentLength > MAX_COMMENT_LENGTH

    const onClose = () => {
        setIsCommentModalOpen(false)
    }

    const onSave = async () => {
        try {
            await updateFailedEventComment(processId, editableComment)
            setIsCommentModalOpen(false)
            await onCommentSaved()
        } catch (error) {
            console.error('Ошибка сохранения:', error)
        }
    }

    return (
        <div className={'modal__background'}>
            <div className={'modal'} onClick={(e) => e.stopPropagation()}>
                <h3 className={'modal__header'}>Комментарий к событию</h3>

                <div className={'modal__counter' + (isOverLimit ? ' modal__counter--error' : '')}>
                    {currentLength} / {MAX_COMMENT_LENGTH}
                </div>

                <textarea
                    className={'modal__textarea'}
                    value={editableComment}
                    onChange={(e) => setEditableComment(e.target.value)}
                    placeholder="Введите комментарий..."
                />

                <div className={'modal__buttons'}>
                    <button
                        className={'modal__button modal__button--cancel'}
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                    <button
                        className={'modal__button modal__button--save'}
                        onClick={onSave}
                        disabled={isOverLimit}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FailedEventCommentModal