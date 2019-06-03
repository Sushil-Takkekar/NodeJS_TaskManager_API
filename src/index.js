const app = require('./express');   // contains express code without listen part
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Web-server started at port '+PORT);
});
