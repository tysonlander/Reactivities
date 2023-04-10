import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Item, ItemGroup, Label, Segment } from 'semantic-ui-react';

import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivivityListItem from './ActivityListItem';


export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    // return (
    //     <Segment.Group>
    //         <Segment>
    //             <ItemGroup>
    //                 <Item>
    //                     <Item.Image size='tiny' circular src='/assets/user.png' />
    //                     <Item.Content>
    //                         <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity}</Item.Header>
    //                         <Item.Description>Hosted by Bob</Item.Description>
    //                     </Item.Content>
    //                 </Item>
    //             </ItemGroup>
    //         </Segment>
    //         <Segment>
    //             <span>
    //                 <Icon name />
    //             </span>
    //         </Segment>
    //     </Segment.Group>
    // );


    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {activities.map((activity) => (
                        <ActivivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>
    );
});
