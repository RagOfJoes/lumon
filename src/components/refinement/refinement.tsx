import { RefinementCanvas } from "./refinement-canvas";
import { RefinementFooter } from "./refinement-footer";
import { RefinementHeader } from "./refinement-header";
import { useRefinement } from "./use-refinement";
import { RefinementProvider } from "./use-refinement-context";

export function Refinement() {
	const [state, actions] = useRefinement();

	return (
		<RefinementProvider value={[state, actions]}>
			<main class="grid h-full w-full grid-rows-12">
				<RefinementHeader />
				<RefinementCanvas />
				<RefinementFooter />
			</main>
		</RefinementProvider>
	);
}
