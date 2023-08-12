export class CompanyFormValues {
    id?: string = undefined;
    name: string = '';
    constructor(company?: CompanyFormValues) {
        if (company) {
            this.id = company.id;
            this.name = company.name;
        }
    }
}

export class Company {
    id: string = '';
    name: string = '';
    constructor(company?: Company) {
        if (company) {
            this.id = company.id;
            this.name = company.name;
        }
    }
}