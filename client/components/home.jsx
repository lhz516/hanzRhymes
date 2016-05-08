import React, { PropTypes } from 'react';
// import { Meteor } from 'meteor/meteor';

export default class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    let checkBoxAction;
    if (this.props.isOften) {
      checkBoxAction = 'set checked';
    } else {
      checkBoxAction = 'set unchecked';
    }
    $('.ui.checkbox').checkbox(checkBoxAction);
  }
  render() {
    // console.log('rendering');
    return (
      <div className="content-wrapper">
        <div className="row">
          <div className="column">
            <h2 className="ui header">
              <i className="book icon" />
              <div className="content">
                押韵字在线查询
              </div>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="section-wrapper">
              <div className="ui right icon input loading">
                <input
                  className="character"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={this.props.rhyme}
                  placeholder="请填写韵母"
                  onChange={(e) => this.props.setRhyme(e.target.value)}
                  type="text"
                />
                {this.props.isLoading ? <i className="search icon" /> : <i />}
              </div>
              {/*
                            <div className="eight wide field">
                            <button className="ui green button" type="submit" >搜索押韵字</button>
                            </div>
                            */}
            </div>
          </div>
        </div>
        {
          this.props.recentRhymes !== ''
              ? <RecentRhymes characters={this.props.recentRhymes} setRhyme={this.props.setRhyme} />
              : <div />
        }
        <div className="row">
          <div className="column">
            <div className="section-wrapper">
              <div
                className="ui toggle checkbox"
                onClick={() => this.props.toggleOften(!this.props.isOften)}
              >
                <input
                  id="is-often"
                  type="checkbox"
                  tabIndex="0"
                  value={this.props.isOften}
                />
                <label htmlFor="is-often">只显示常用汉字</label>
              </div>
              {
                this.props.characters.toString() !== ''
                  ? <p>共找到{this.props.characters.length}个韵脚为"{this.props.rhyme}"的汉字</p>
                  : this.props.rhyme !== ''
                    ? <p>正在查询...</p>
                    : <p />
              }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="section-wrapper">
              <div>
                {
                  this.props.characters.map((character) =>
                      (<span key={character._id}>{character.hz} </span>)
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const RecentRhymes = (props) => (
  <div className="row">
    <p>最近查找（显示最近6个）：</p>
    <div className="ui small basic buttons">
      {
        props.characters.map((recentRhyme, i) =>
          <button
            key={i}
            className="ui button"
            value={recentRhyme}
            onClick={(e) => props.setRhyme(e.target.value)}
          >
            {recentRhyme}
          </button>
        )
      }
    </div>
  </div>
);

Home.propTypes = {
  characters: PropTypes.array.isRequired,
  recentRhymes: PropTypes.array.isRequired,
  isOften: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  rhyme: PropTypes.string.isRequired,
  toggleOften: PropTypes.func.isRequired,
  setRhyme: PropTypes.func.isRequired,
};

RecentRhymes.propTypes = {
  characters: PropTypes.array.isRequired,
  setRhyme: PropTypes.func.isRequired,
};

