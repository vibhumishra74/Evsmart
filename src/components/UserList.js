import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

export default function UserList(props) {
    return (
        <List {...props}>
        <Datagrid>
            <TextField source="user_id"/>
            <TextField source="user_firstname"/>
            <TextField sourec="user_lastname"/>
            <EditButton basePath="/user" />
        </Datagrid>
    </List>
    )
}


