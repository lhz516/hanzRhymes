import { JsonRoutes as Routes } from 'meteor/simple:json-routes';

Routes.add('GET', '/searchRhyme', (req, res, next) => {
  const rhyme = req.query.rhyme;
  const filter = req.query.filter;
  const result = Meteor.call('searchRhyme', rhyme, filter);
  Routes.sendResult(res, {
    code: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    data: result
  });
});
