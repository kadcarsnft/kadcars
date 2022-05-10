import React from "react";

function ListNav({ pages, page, setPage }) {
    if (pages == null || page == null || setPage == null) {
        return null;
    }
    const pagesArr = [1];
    const start = Math.max(page + 1 - 3, 2);
    const end = Math.min(page + 1 + 4, pages);
    for (let i = start; i < end; i++) {
        pagesArr.push(i);
    }
    pagesArr.push(pages);

    const navButtons = [];
    for (let i = 0; i < pagesArr.length; i++) {
        const curr = pagesArr[i];
        if (
            (i === 1 && curr !== 2) ||
            (i === pagesArr.length - 2 && curr !== pages - 1)
        ) {
            navButtons.push(<p>...</p>);
        } else {
            navButtons.push(
                <NavButton
                    text={curr}
                    isSelected={page + 1 === curr}
                    onClick={() => setPage(curr - 1)}
                />
            );
        }
    }

    return (
        <CenterColumn
            extraStyle={{
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            {navButtons.map((button) => button)}
        </CenterColumn>
    );
}

function NavButton({ text, onClick, isSelected }) {
    const style = { cursor: "pointer" };
    if (isSelected === true) {
        style.fontWeight = "bold";
    } else {
        style.textDecoration = "underline";
    }
    return (
        <p style={style} onClick={onClick}>
            {text}
        </p>
    );
}

function CenterColumn({ children, centerColumnStyle, extraStyle }) {
    return (
        <div style={{ ...centerColumnStyle, ...extraStyle, width: "100%" }}>
            {children}
        </div>
    );
}

export {
    CenterColumn,
    ListNav
}