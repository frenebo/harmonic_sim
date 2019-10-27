import { WorldDescription, MassDescription } from "../worldDescription.js";
import { GraphManager } from "./graphManager.js";


export class ViewManager {
    private readonly graphManager: GraphManager;
    private worldDescription: WorldDescription;

    constructor(div: HTMLDivElement) {
        this.worldDescription = {
            masses: {},
            springs: {},
        };

        this.graphManager = new GraphManager(div);

        document.body.style.margin = "0px";

        const onResize = () => {
            if (document.documentElement === null) {
                return;
            }
            this.graphManager.setDimensions(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        onResize();
    }

    private static massDescriptionsIdentical(before: MassDescription, after: MassDescription): boolean {
        return before.x === after.x && before.y === after.y;
    }

    public updateWorldDescription(newWorldDesc: WorldDescription): void {
        const beforeMassIds = Object.keys(newWorldDesc.masses);
        const afterMassIds = Object.keys(this.worldDescription.masses);

        const beforeSpringIds = Object.keys(newWorldDesc.springs);
        const afterSpringIds = Object.keys(newWorldDesc.springs);

        // redundant but doing this for clarity
        const removedMassIds: string[] = beforeMassIds.filter(id => afterMassIds.indexOf(id) === -1);
        const addedMassIds: string[] = afterMassIds.filter(id => beforeMassIds.indexOf(id) === -1);
        const retainedMassIds: string[] = afterMassIds.filter(id => beforeMassIds.indexOf(id) !== -1);

        /**
         * alternative:
         * allIds = new set ( before, after )
         * for id in set:
         *    if id is in both:
         *      shared.add(id)
         *    else if id in before:
         *       removed.add(id)
         *    else:
         *       added.add(id)
         */

        const changedMassIds: string[] = [];
        for (const massId of retainedMassIds) {
            const beforeMass = this.worldDescription.masses[massId];
            const afterMass = newWorldDesc.masses[massId];

            if (!ViewManager.massDescriptionsIdentical(beforeMass, afterMass)) {
                changedMassIds.push(massId);
            }
        }

        const removedSpringIds = beforeSpringIds.filter(id => afterMassIds.indexOf(id) === -1);
        const addedSpringIds = afterSpringIds.filter(id => beforeSpringIds.indexOf(id) === -1);
        const retainedSpringIds = afterSpringIds.filter(id => beforeSpringIds.indexOf(id) !== -1);

        const changedSpringIds: string[] = [];
        for (const springId of retainedMassIds) {
            const beforeSpring = this.worldDescription.springs[springId];
            const afterSpring = newWorldDesc.springs[springId];

            const beforeSource = this.worldDescription.masses[beforeSpring.sourceMassId];
            const beforeTarget = this.worldDescription.masses[beforeSpring.targetMassId];
            const afterSource = newWorldDesc.masses[afterSpring.sourceMassId];
            const afterTarget = newWorldDesc.masses[afterSpring.targetMassId];

            if (beforeSpring.sourceMassId !== afterSpring.sourceMassId ||
                beforeSpring.targetMassId !== afterSpring.targetMassId ||
                ! ViewManager.massDescriptionsIdentical(beforeSource, afterSource)  ||
                ! ViewManager.massDescriptionsIdentical(beforeTarget, afterTarget))
            {
                changedSpringIds.push(springId);
            }
        }

        // delete removed springs
        for (const springId in removedSpringIds) {
            this.graphManager.deleteSpring(springId);
        }
        // add new masses
        for (const massId in addedMassIds) {
            this.graphManager.addMass(massId, newWorldDesc.masses[massId]);
        }
        // change modified masses
        for (const massId in changedMassIds) {
            this.graphManager.updateMass(massId, newWorldDesc.masses[massId]);
        }
        // change modified springs
        for (const springId in changedSpringIds) {
            this.graphManager.updateSpring(springId, newWorldDesc.springs[springId]);
        }
        // add new springs
        for (const springId in addedSpringIds) {
            this.graphManager.addSpring(springId, newWorldDesc.springs[springId]);
        }
        // delete removed masses
        for (const massId in removedMassIds) {
            this.graphManager.deleteMass(massId);
        }
    }
}