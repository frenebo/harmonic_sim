
export type WorldDescription = {
    masses: {
        [key: string]: MassDescription;
    };
    springs: {
        [key: string]: SpringDescription;
    };
};

export type SpringDescription = {
    sourceMassId: string;
    targetMassId: string;
};

export type MassDescription = {
    x: number;
    y: number;
};