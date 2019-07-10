import React, { Component } from 'react'
import { Card, Title, Subheading } from 'react-native-paper'
import { Text, View } from 'react-native'

class UserDetails extends Component {
    state = {
        ...this.props,
    }

    status = ['a', 'b', 'c', 'd']

    render() {
        return (
            <View style={{ marginBottom: 20 }} onLayout={event => this.props.onLayout(event)}>
                <Card>
                    <Card.Content>
                        <Title>{this.props.name}</Title>
                        <Subheading>{this.props.contactNo}</Subheading>
                    </Card.Content>
                    <Card.Content>
                        <Subheading>{this.status[this.props.status]}</Subheading>
                    </Card.Content>
                </Card>
            </View>
        );
    }
}

export default UserDetails;