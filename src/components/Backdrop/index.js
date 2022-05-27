import classes from "./Backdrop.module.scss";

function Backdrop(props) {
    const { children, closeModal } = props;

    function handleClick(e) {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    return (
        <div className={classes.backdrop} onClick={handleClick.bind(this)}>
            {children}
        </div>
    )
}

export default Backdrop;