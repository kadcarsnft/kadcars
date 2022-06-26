import React, { useEffect, useState } from "react";
import { CardContainer } from "./kadcarCard/KadcarCardStyles";
import { KadcarCard } from "./KadcarComponents";
import { CenterColumn, ListNav } from "../../utils/GalleryUtilities";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./styles.css"

import { Pagination } from "swiper";
import { KadcarCardExpanded } from "./kadcarCard/KadcarCard";

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
        // <CenterColumn centerColumnStyle={centerColumnStyle} extraStyle={extraStyle}>
        // <div
        //     style={{
        //         display: "flex",
        //         flexDirection: "row",
        //         justifyContent: "center",
        //         width: "100%",
        //         height: "100%",
        //         // flexWrap: "wrap",
        //     }}
        // >
        <>
            {kadcars == null && <CustomMessage text="Loading Kadcars..." />}
            {kadcars?.length === 0 && <CustomMessage text="No kadcars exist yet!" />}
            {kadcars != null &&
                (
                    <Swiper
                        // slidesPerView={3}
                        // spaceBetween={30}
                        centeredSlides={true}
                        modules={[Pagination]}
                        grid={{
                            rows: 1
                        }}
                        pagination={{
                            type: 'fraction'
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        breakpoints={{
                            350: {
                                width: 350,
                                slidesPerView:1,
                                spaceBetween: 30
                            },
                            820: {
                                width: 820,
                                slidesPerView:2,
                                spaceBetween: 30
                            },
                            950: {
                                width: 950,
                                slidesPerView: 3,
                                spaceBetween: 50
                            }
                        }}
                    >
                        {
                            kadcars.map((kadcar, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <KadcarCard kadcarNft={kadcar} />
                                    </SwiperSlide>
                                );
                            })
                        }
                    </Swiper>
                )}
        </>

        // </div>
        //</CenterColumn>
    )
}

export {
    KadcarCardGrid
}