import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // Set an 'isOften' field for each frequently used characters
  //   Assets.getText('fchars.txt', (err, result)=>{
  //       var chars = result.replace(/(\r\n|\n|\r|\s)/gm,"");
  //       var charList = chars.split('');
  //       charList.forEach((char)=>{
  //           Hanzi.update({hz: char},{$set:{isOften:true}});
  //       });
  //   });
});
