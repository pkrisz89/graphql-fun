import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            content: ''
        }
    }

    onSubmit(e){
        e.preventDefault();
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId,
            }
        })
        .then(() => this.setState({content: ''}));
    }

    render(){
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input
                    onChange={e => this.setState({content: e.target.value})}
                    value={this.state.content}
                />
            </form>
        )
    }
}

const mutation = gql`
    mutation AddLyricToSong($content : String, $songId : ID) {
        addLyricToSong(content : $content, songId : $songId) {
            id
            lyrics {content}
        }
    }
`;

export default graphql(mutation)(LyricCreate);