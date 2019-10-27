
export type ModelConfig = {
    masses: {
        [key: string]: {
            x: number;
            y: number;
            properties: MassProperties;
        };
    };
    springs: {
        [key: string]: {
            sourceMassId: string;
            targetMassId: string;
            properties: SpringProperties;
        };
    };
};

export type SpringProperties = {
    equilibriumLength: number;
};

export type MassProperties = {
    mass: number;
};