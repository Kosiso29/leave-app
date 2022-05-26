import classes from "./Topbar.module.scss"

const Topbar = (props) => {
    const { email } = props;
    return (
        <div className={classes.topbar}>
            <p className={classes.user}>{email}</p>
        </div>
    )
}

export default Topbar;