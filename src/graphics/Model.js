import { useDrag } from "@use-gesture/react";
import { Children, useCallback, useRef } from "react";
import { config, useSpring } from "react-spring";

const Model = ({ children }) => {
    const dragDelta = useRef(0);

    const [props, set] = useSpring(() => ({
        pos: [0, 0, 0],
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));

    const [{ rotation }, setRotation] = useSpring(() => ({
        rotation: [0, 0, 0],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));

    const onClick = useCallback(
        e => {
            // filter clicks from dragging
            if (dragDelta.current < 100) {
                const [x, y, z] = rotation.getValue()

                setRotation({
                    rotation: [x, y + 180, z],
                    config: config.default
                })
            }
        },
        [rotation, setRotation]
    );

    const bind = useDrag(({ first, last, time, down, delta, velocity, direction, memo = rotation.getValue() }) => {
        if (first) {
            dragDelta.current = time
        }

        if (last) {
            dragDelta.current = time - dragDelta.current
        }

        const x = memo[0] + (delta[1] / window.innerWidth) * 180
        const y = memo[1] + (delta[0] / window.innerHeight) * 180
        const vxyz = [direction[1] * (velocity / 1), direction[0] * (velocity / 1), 0]

        setRotation({
            rotation: [x, y, 0],
            immediate: down,
            config: { velocity: vxyz, decay: true }
        })

        return memo
    });

    return (
        // <div {...bind()}>
            <Children />
        // {/* </div> */}
    )
}

export {
    Model
}