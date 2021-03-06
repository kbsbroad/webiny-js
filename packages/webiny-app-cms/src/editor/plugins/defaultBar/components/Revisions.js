//@flow
import React from "react";
import { connect } from "webiny-app-cms/editor/redux";
import { compose, pure } from "recompose";
import { css } from "emotion";
import { withRouter } from "webiny-app/components";
import { Menu, MenuItem } from "webiny-ui/Menu";
import { getRevisions } from "webiny-app-cms/editor/selectors";
import { ButtonDefault } from "webiny-ui/Button";
import { Icon } from "webiny-ui/Icon";
import { Typography } from "webiny-ui/Typography";
import { ReactComponent as DownButton } from "./icons/round-arrow_drop_down-24px.svg";

const buttonStyle = css({
    "&.mdc-button": {
        color: "var(--mdc-theme-text-primary-on-background) !important"
    }
});

const menuList = css({
    ".mdc-list-item": {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "baseline",
        textAlign: "left"
    }
});

const Revisions = pure(({ revisions, router }: Object) => {
    return (
        <Menu
            className={menuList}
            onSelect={evt =>
                router.goToRoute({ params: { id: revisions[evt.detail.index].id }, merge: true })
            }
            handle={
                <ButtonDefault className={buttonStyle}>
                    Revisions <Icon icon={<DownButton />} />
                </ButtonDefault>
            }
        >
            {revisions.map(rev => {
                let status = "draft";
                if (rev.published) status = "published";
                if (rev.locked && !rev.published) status = "locked";

                return (
                    <MenuItem key={rev.id}>
                        <Typography use={"body2"}>v{rev.version}</Typography>
                        <Typography use={"caption"}>({status})</Typography>
                    </MenuItem>
                );
            })}
        </Menu>
    );
});

export default compose(
    connect(state => ({ revisions: getRevisions(state) })),
    withRouter()
)(Revisions);
