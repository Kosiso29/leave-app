import { Card as BootstrapCard } from "react-bootstrap";

const Card = (props) => {
    const { children } = props;
    return (
        <BootstrapCard>
            {children}
        </BootstrapCard>
    )
}

export default Card;