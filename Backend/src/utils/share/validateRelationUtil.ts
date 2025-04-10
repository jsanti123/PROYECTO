export const validateRelation = async (tx: any, model: string, field: string, value: any, errorMessage: string) => {
    const result = await tx[model].findUnique({
        where: {
            [field]: value
        }
    });
    if (!result) {
        throw new Error(errorMessage);
    }
    return result;
}