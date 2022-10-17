import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {

    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadAcitivities = async () => {
        this.setLoading(true);
        try {
            const response = await agent.Activities.list();
            response.forEach(activity => {
                activity.date = activity.date.split("T")[0];
                this.activities.push(activity);
            })
            this.setLoading(false);

        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(x => x.id === id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
}