import './AdminHeader.css'

interface AdminHeaderProps {
    title: string;
    short_title: string;
    // userName: string;
    setUserName?: boolean;
    onLogout: () => void;
    isCollapsed: boolean,
    onToggle: () => void
}

function AdminHeader({
     title,
     short_title,
     userName,
     onLogout,
     setUserName = false,
     isCollapsed,
     onToggle
}: AdminHeaderProps) {
    console.log(isCollapsed)
    console.log(onToggle)
    return (
        <header className={'header'}>
            {leftSide(title, short_title, '⚙️', onToggle, isCollapsed)}
            {rightSide(userName, onLogout, setUserName)}
        </header>
    )
}

function leftSide(title, short_title, icon, onToggle, isCollapsed) {
    const redirectUrl = import.meta.env.VITE_REDIRECT_URL

    return (
        <div className={'header__left'}>
            <div className={'header__title'} onClick={() => window.open(redirectUrl)}>{isCollapsed ? short_title : title}</div>
            <div className={'header__label'} onClick={onToggle}>{icon}</div>
        </div>
    )
}

function rightSide(userName, onLogout, setUserName) {
    let userNameElement = null
    const redirectUrl = import.meta.env.VITE_REDIRECT_URL

    if (setUserName) {
        userNameElement = <div className={'header__name'} onClick={() => window.open(redirectUrl + '/profile?section=personalData')}>{userName}</div>
    }

    return (
        <div className={'header__right'}>
            {userNameElement}
            <button className={'header__button'} onClick={onLogout}>Выйти</button>
        </div>
    )
}

export default AdminHeader
