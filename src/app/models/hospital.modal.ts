import { environment } from '../../environments/environment';

interface Hospitaluser {
    _id: string;
    nombre: string;
    img: string;
}

export class Hospital {

    constructor(
        public email: string,
        public nombre: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public usuario?: Hospitaluser,
        public img?: string
    ) { }
}

