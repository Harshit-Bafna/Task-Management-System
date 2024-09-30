const { Parser } = require('json2csv');

const generateCSVReport = (data) => {
    const fields = ['title', 'description', 'dueDate', 'status', 'priority', 'assignedBy', 'assignedTo'];
    const json2csvParser = new Parser({ fields });
    return json2csvParser.parse(data);
};

module.exports = {
    generateCSVReport,
};