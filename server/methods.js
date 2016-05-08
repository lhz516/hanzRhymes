import { Meteor } from 'meteor/meteor';
import Hanzi from '../collections/hanzi.js';

Meteor.methods({
  searchRhyme(text, filter) {
    check(text, String);
    check(filter, String);
    let isOften = false;
    if (filter === 'SHOW_OFTEN') {
      isOften = true;
    }
    const result = Hanzi.find({ rhyme: text, isOften }, { fields: { hz: 1 } }).fetch();
    if (result !== '') {
      return {
        isValid: true,
        rhyme: text,
        characters: result
      };
    }
    return {
      isValid: false
    };
  }
});
