import { Meteor } from 'meteor/meteor';
import Hanzi from '../collections/hanzi.js';

Meteor.methods({
    searchRhyme(text, filter) {
        let isOften = false;
        if(filter == 'SHOW_OFTEN') {
            isOften = true;
        }
        let result = Hanzi.find({rhyme: text, isOften: isOften}, {fields: {hz: 1}}).fetch();
        if(result != '') {
            return {
                isValid: true,
                rhyme: text,
                characters: result
            }
        }else {
            return {
                isValid: false
            };
        }
    }
});