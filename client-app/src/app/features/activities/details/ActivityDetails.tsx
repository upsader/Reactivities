import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";



export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity} = activityStore;

    if (!selectedActivity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{selectedActivity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => activityStore.openForm(selectedActivity.id)} basic content='Edit' color="blue"/>
                    <Button onClick={activityStore.cancelSelectedActivity} basic content='Cancel' color="grey"/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})