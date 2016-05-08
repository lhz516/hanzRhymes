import { connect } from 'react-redux';
import { setRhyme, setCharacters, setVisibilityFilter } from '../actions';
import Home from '../components/home.jsx';
import { store } from '../app.jsx';

export const searchRhyme = (text, isOften) => {
  Meteor.call('searchRhyme', text, isOften, (err, data) => {
    const recentRhymes = JSON.parse(localStorage.getItem('hr_rhymes')) || [];
    const isRhymeContained = _.contains(recentRhymes, text);
    if (data.isValid) {
      let newRecentRhymes;
      if (isRhymeContained) {
        newRecentRhymes = recentRhymes;
      } else {
        while (recentRhymes.length >= 6) {
          recentRhymes.shift();
        }
        recentRhymes.push(data.rhyme);
        localStorage.setItem('hr_rhymes', JSON.stringify(recentRhymes));
        newRecentRhymes = JSON.parse(localStorage.getItem('hr_rhymes'));
      }
      store.dispatch(setCharacters(data.characters, newRecentRhymes));
    } else {
      store.dispatch(setCharacters([], recentRhymes));
    }
  });
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    isOften: state.visibilityFilter === 'SHOW_OFTEN',
    rhyme: state.rhyme,
    recentRhymes: state.recentRhymes,
    characters: state.characters,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRhyme: (text) => {
      dispatch(setRhyme(text));
      searchRhyme(text, store.getState().visibilityFilter);
    },
    toggleOften: (isOften) => {
      let filter = 'SHOW_OFTEN';
      if (isOften === false) {
        filter = 'SHOW_ALL';
      }
      dispatch(setVisibilityFilter(filter));
      setTimeout(() => {
        searchRhyme(store.getState().rhyme, filter);
      }, 200); // delay 200ms for toggle checkbox animation
    }
  };
};


// const HomeContainer = createContainer(() => {
//     let rhyme = store.getState().rhyme;
//     let filter = store.getState().visibilityFilter;
//     let rhymesHandle = Meteor.subscribe('characters', rhyme, filter);
//     let isLoading = !rhymesHandle.ready();
//     let characters =  Hanzi.find().fetch();
//     return {
//         isLoading,
//         characters
//     };
// }, Home);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
