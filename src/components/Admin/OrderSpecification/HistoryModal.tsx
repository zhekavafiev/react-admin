import type {History} from "./types.ts";

interface HistoryModalProps {
    history: History,
    setIsHistoryModalOpen: (value: boolean) => void
}

function HistoryModal({history, setIsHistoryModalOpen}: HistoryModalProps) {
    const context = history.change
    if (context === null) {
        return
    }

    return <div className={'modal__background'} onClick={() => setIsHistoryModalOpen(false)}>
        <div className={'modal'} onClick={e => e.stopPropagation()}>
            <pre id="json">{JSON.stringify(context, null, 4)}</pre>
        </div>
    </div>
}

export default HistoryModal