import React, { Component } from 'react'
import { Card, Title, Subheading } from 'react-native-paper'
import { Text, View } from 'react-native'

class UserDetails extends Component {
    state = {
        ...this.props,
    }

    render() {
        return (
            <View style={{ marginBottom: 20 }} onLayout={event => this.props.onLayout(event)}>
                <Card>
                    <Card.Content>
                        <Title>{this.state.name}</Title>
                        <Subheading>{this.state.phone}</Subheading>
                    </Card.Content>
                    <Card.Content>
                        <Subheading>{this.state.status}</Subheading>
                    </Card.Content>
                </Card>
            </View>
        );
    }
}

export default UserDetails;