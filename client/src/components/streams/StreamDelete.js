import React from 'react';
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import streams from '../../api/streams';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }
    return `Are you sure you want to delete the stream with title : ${this.props.stream.title} ?`;
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <>
        <Link to='/' className="ui button">Cancel</Link>
        <button onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
            </button>

      </>
    );
  }

  render() {
    return (
      < Modal
        title="Delete stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />

    );
  }


}
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);

