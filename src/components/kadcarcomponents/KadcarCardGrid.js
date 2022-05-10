import React from "react";
import { CardContainer } from "./kadcarCard/KadcarCardStyles";
import { KadcarCard } from "./KadcarComponents";
import { CenterColumn, ListNav } from "../../utils/GalleryUtilities";



const KadcarCardGrid = ({ kadcars, pages, page, setPage }) => {
    const extraStyle = { overflowY: "scroll" };

    
const centerColumnStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

    function CustomMessage({ text }) {
        return <p style={{ textAlign: "center" }}>{text}</p>;
    }

    return (
        <CenterColumn centerColumnStyle={centerColumnStyle} extraStyle={extraStyle}>
            <div
                style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    flexWrap: "wrap",
                }}
            >
                {kadcars == null && <CustomMessage text="Loading Kadcars..." />}
                {kadcars?.length === 0 && <CustomMessage text="No kadcars exist yet!" />}
                {kadcars != null && (
                    <>
                        {kadcars.map((kadcar) => {
                            return (
                                <KadcarCard kadcarNft={kadcar} />
                            );
                        })}
                        <ListNav pages={pages} page={page} setPage={setPage} />
                    </>
                )}
            </div>
        </CenterColumn>
    )
}

export {
    KadcarCardGrid
}