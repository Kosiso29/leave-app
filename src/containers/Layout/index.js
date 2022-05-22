import Navbar from "../Navbar";
import classes from "./Layout.module.scss"

const Layout = (props) => {
    const { children } = props;
    return (
        <div className={classes.layout}>
            <Navbar />
            <div className={classes.children}>
                {children}
            </div>
        </div>
    )
}

export default Layout;