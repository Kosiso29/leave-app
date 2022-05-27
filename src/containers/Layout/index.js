import { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navbar from "../Navbar";
import Topbar from "../Topbar";

import classes from "./Layout.module.scss"

const Layout = (props) => {
    const { children, userId, onAuthCheckState } = props;

    useEffect(() => {
        if (!userId) {
            onAuthCheckState();
        }
    }, []);

    if (userId) {
        return (
            <div className={classes.layout}>
                <Topbar userId={userId} />
                <Navbar />
                <div className={classes.children}>
                    {children}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);