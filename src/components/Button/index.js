import { Button as BootstrapButton } from "react-bootstrap";

const Button = (props) => {
    const { children, buttonProps } = props;
    return (
        <BootstrapButton {...buttonProps}>
            {children}
        </BootstrapButton>
    )
}

export default Button;