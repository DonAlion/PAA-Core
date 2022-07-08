import { connect } from 'react-redux';
import {
  addNote,
  moveNoteDown,
  moveNoteUp,
  removeNote,
} from '..//slices/noteSlice';
import { modifyView } from '../slices/viewSlice';
import { modifyPage } from '../slices/pageSlice';
import { modifyPageSize } from '../slices/pageSizeSlice';
import { modifyFilter } from '../slices/filterSlice';

import React = require('react');
import {
  G_GET_NOTES_MAP,
  GET_NUMBER_FORMATTED_TO_TWO_SPACES,
} from '../Shared/Utils';

class NoteApp extends React.Component<NoteAppProps, {}> {
  state: any;

  constructor(props: NoteAppProps) {
    super(props);

    this.doNoteAppFilter = this.doNoteAppFilter.bind(this);
    this.getNotesPerPageSlider = this.getNotesPerPageSlider.bind(this);
  }

  doNoteAppFilter(e: any) {
    this.props.modifyFilter(e.target.value);
  }

  updatePage(newPage: number) {
    this.props.modifyPage(newPage);
  }

  getNotesPerPageSlider() {
    return (
      <div className="slider-parent">
        <p className="slider-child">
          {GET_NUMBER_FORMATTED_TO_TWO_SPACES(this.props.pageSize.value)}
        </p>
        <input
          type="range"
          className="slider-child"
          min="1"
          max="20"
          value={this.props.pageSize.value}
          onChange={(e) => {
            this.props.modifyPageSize(e.target.value);
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.addNote();
          }}
        >
          Add Note
        </button>
        <input
          value={this.props.filter.value}
          onChange={this.doNoteAppFilter}
          placeholder="Start Typing to Filter"
        ></input>
        {this.getNotesPerPageSlider()}
        {G_GET_NOTES_MAP(
          {
            notes: this.props.notes,
            filter: this.props.filter,
            page: this.props.page,
            pageSize: this.props.pageSize,
          },
          (newPage: number) => {
            this.updatePage(newPage);
          }
        )}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const filter = state.filter;
  const notes = state.notes;
  const pageSize = state.pageSize;
  const page = state.page;
  const view = state.view;

  return {
    filter,
    notes,
    pageSize,
    page,
    view,
  };
}

const mapDispatchToProps = {
  addNote,
  moveNoteDown,
  moveNoteUp,
  removeNote,
  modifyView,
  modifyPage,
  modifyFilter,
  modifyPageSize,
};

export interface NoteAppProps {
  filter;
  notes;
  pageSize;
  page;
  view;
  addNote: Function;
  moveNoteDown: Function;
  moveNoteUp: Function;
  removeNote: Function;
  modifyView: Function;
  modifyPage: Function;
  modifyFilter: Function;
  modifyPageSize: Function;
  modifyEditMode: Function;
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteApp);
