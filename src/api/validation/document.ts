import { Validation } from "../interfaces";
import { validateEndpoint } from "./endpoint";

export async function validateDocument (documentId: string): Promise<Validation> {
    const result = {
        checksum: false,
        schema: false,
        signature: false,
    };

    try {
        const isChecksumValid = await validateEndpoint(documentId, 'validateChecksum');

        if (!isChecksumValid) {
            return result;
        }

        result.checksum = true;

        const isSchemaValid = await validateEndpoint(documentId, 'validateSchema');

        if (!isSchemaValid) {
            return result;
        }

        result.schema = true;

        const isSignatureValid = await validateEndpoint(documentId, 'validateSignature');

        if (!isSignatureValid) {
            return result;
        }

        result.signature = true;

        return result;
    }
    
    catch (error) {
        console.warn("Validation warning:", error);
        return result;
    }
}
