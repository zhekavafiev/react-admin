import type {Process} from "./types.ts";

interface ProcessContextModalProps {
    process: Process,
    setContextModalIsOpen: (value: boolean) => void
}

function ProcessContextModal({process, setContextModalIsOpen}: ProcessContextModalProps) {
    const context =process.context
    if (context === null) {
        return
    }

    return <div className={'modal__background'} onClick={() => setContextModalIsOpen(false)}>
        <div className={'modal'} onClick={e => e.stopPropagation()}>
            <pre id="json">{JSON.stringify(context, null, 4)}</pre>
        </div>
    </div>
}

export default ProcessContextModal