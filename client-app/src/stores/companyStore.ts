import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Company, CompanyFormValues } from "app/models/company";

export default class CompanyStore {
    company: Company | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadCompany = async (id: string) => {
        this.loading = true;
        try {
            const company = await agent.Company.details(id);
            runInAction(() => {
                this.company = company;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }

    }

    updateCompany = async (company: CompanyFormValues) => {
        try {
            await agent.Company.update(company);
            runInAction(() => {
                this.company = { ...this.company!, ...company };
            });
        } catch (error) {
            console.log(error);
        }
    };
}