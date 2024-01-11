import { useMutation } from 'react-query';
import { validateDocument } from '../api/validation/document';

const useValidateDocument = () => {
  return useMutation((documentId: string) => validateDocument(documentId));
};

export default function Validation ({ 
    id,
}: {
    id: string,
}): JSX.Element {
    const validateMutation = useValidateDocument();

    const handleClick = () => {
        if (!validateMutation.isLoading) {
            validateMutation.mutate(id);
        }
    };

    return (
        <div className="validation">
            {validateMutation.isSuccess ? (
                <>
                    <span className="validation-status">{validateMutation.data.checksum ? '✅' : '❌'} Checksum</span>
                    <span className="validation-status">{validateMutation.data.schema ? '✅' : '❌'} Schema</span>
                    <span className="validation-status">{validateMutation.data.signature ? '✅' : '❌'} Signature</span>
                </>
            ) : ''}
            <button type="button" onClick={handleClick} disabled={validateMutation.isLoading}>
                {validateMutation.isLoading ? 'Validating...' : validateMutation.isSuccess ? 'Revalidate' : 'Validate'}
            </button>
        </div>
    )
}
