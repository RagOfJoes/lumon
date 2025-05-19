import { onCleanup, onMount } from "solid-js";

import { useRefinementContext } from "./use-refinement-context";

export function RefinementCanvas() {
	const [state, _] = useRefinementContext();

	let animationFrameID!: number;
	let canvas!: HTMLCanvasElement;

	// Animation loop
	const animate = () => {
		// Retrieve canvas context
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		// Get device pixel ratio to allow for proper scaling and rendering
		const dpr = window.devicePixelRatio || 1;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.scale(dpr, dpr);

		// Iterate through each datum, update its properties, and draw on the canvas
		const now = Date.now();
		for (const datum of state.data()) {
			datum.update(now);
			datum.draw(ctx);
		}

		// Reset the transformation matrix to avoid scaling issues
		ctx.setTransform(1, 0, 0, 1, 0, 0);

		// Rerun animation loop
		animationFrameID = requestAnimationFrame(animate);
	};

	// onResize handler
	const onResize = () => {
		const dpr = window.devicePixelRatio || 1;
		const { height, width } = canvas.getBoundingClientRect();
		canvas.height = height * dpr;
		canvas.width = width * dpr;

		const x = (width - (state.numOfCols - 1) * state.spacing) / 2;
		const y = (height - (state.numOfRows - 1) * state.spacing) / 2;
		for (let i = 0; i < state.numOfCols * state.numOfRows; i += 1) {
			const datum = state.data()[i];
			if (!datum) {
				continue;
			}

			datum.updatePosition({
				x: x + (i % state.numOfCols) * state.spacing,
				y: y + Math.floor(i / state.numOfCols) * state.spacing,
			});
		}
	};

	onMount(() => {
		// Setup canvas and add event listeners
		// Call onResize handler to set initial size and position of datum
		onResize();
		window.addEventListener("resize", onResize);

		// Begin animation loop
		animate();

		// Cleanup function
		onCleanup(() => {
			window.removeEventListener("resize", onResize);

			cancelAnimationFrame(animationFrameID);
		});
	});

	return (
		<section class="row-span-8 mt-2">
			<canvas class="h-full w-full" ref={canvas} />

			<div class="mt-auto h-2 w-full border-t-2 border-b-2 border-t-[#beeeff] border-b-[#beeeff]" />
		</section>
	);
}
