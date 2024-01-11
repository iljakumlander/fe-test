import { Doc } from '../api/interfaces';
import byteSize from 'byte-size';
import { format } from 'date-fns';
import Validation from './validation';

export default function DocumentTemplate (
    props: Doc
): JSX.Element {
    const {
        id,
        filename,
        author,
        created_at,
        size,
    } = props;

    const byte = byteSize(size);

    return (
        <div className="document">
            <div className="">
                <span className="filename">{filename}</span> <span className="filesize"><span className="filesize-value">{byte.value}</span> <span className="filesize-unit">{byte.unit}</span></span>
            </div>
            <div>
                by {author}, {format(created_at, 'yyyy-MM-dd')}
            </div>
            <Validation id={id} />
        </div>
    )
}
