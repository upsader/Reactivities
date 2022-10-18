import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";




export default observer(function ActivityList() {

    const { activityStore } = useStore();
    const { activitiesByDate, deleteActivity, loading } = activityStore;

    const [target, setTarget] = useState('');

    function handleDeleteActivity(event: React.MouseEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button name={activity.id} loading={loading && target === activity.id} onClick={(event) => handleDeleteActivity(event, activity.id)} floated="right" content='Delete' color="red" />
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated="right" content='View' color="blue" />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})