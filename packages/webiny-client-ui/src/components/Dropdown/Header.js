import React from "react";
import { createComponent } from "webiny-client";
import styles from "./styles.scss?prefix=Webiny_Ui_Dropdown";

class Header extends React.Component {
    render() {
        if (this.props.render) {
            return this.props.render.call(this);
        }

        const { title, styles } = this.props;
        return (
            <li role="presentation" className={styles.header}>
                {title}
            </li>
        );
    }
}

export default createComponent(Header, { styles });