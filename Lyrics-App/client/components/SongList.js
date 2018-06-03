import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends React.Component {
    onSongDelete(id){
        this.props.mutate({
            variables: {id}
        })
        .then(() => this.props.data.refetch());
    }

    renderSongs() {
        return this.props.data.songs.map(({id, title}) => {
            return (<li key={id} className="collection-item">
                        {title}
                        <i className="material-icons" onClick={() => this.onSongDelete(id)}>delete</i>
                    </li>)
        })
    }

    render() {
        return (
            <div>
                <Link className="button-floating btn-large red right" to="/songs/new"><i className="material-icons">add</i></Link>
                <ul className="collection">
                    {this.props.data.loading ? 'Loading...' : this.renderSongs()}
                </ul>
            </div>
        )
    }
}

const mutation = gql`
    mutation DeleteSong($id : ID) {
        deleteSong(id : $id) {
            id
        }
    }
`;

export default graphql(mutation)(graphql(query)(SongList))