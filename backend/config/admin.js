module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'cb705f4c639d3a480160901d6cdc5291'),
  },
});
