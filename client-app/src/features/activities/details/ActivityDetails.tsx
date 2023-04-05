import React from 'react';
// import { Card, Icon, Image } from 'semantic-ui-react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({
    activity,
    cancelSelectActivity,
    openForm,
}: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    Matthew is a musician living in Nashville.
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={() => openForm(activity.id)}  basic color="blue" content="Edit" />
                <Button
                    onClick={cancelSelectActivity}
                    basic
                    color="grey"
                    content="Cancel"
                />
            </Card.Content>
        </Card>
    );
}
